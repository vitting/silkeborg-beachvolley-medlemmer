import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { HttpClient } from "@angular/common/http";
import { map, first } from "rxjs/operators";
import { ZipCode } from "src/interfaces/zipcode";
import { BehaviorSubject } from "rxjs";

interface ZipCodes {
  zipcodes: ZipCode[];
}

interface ZipCodesProgress {
  total: number;
  count: number;
}

@Injectable({
  providedIn: "root",
})
export class ZipCodeService {
  zipCodesUploadProgress$ = new BehaviorSubject<ZipCodesProgress>({
    count: 0,
    total: 0,
  });
  constructor(private db: AngularFirestore, private http: HttpClient) {}

  async getZipcodes() {
    return this.http
      .get("assets/files/zipcodes.json")
      .pipe(
        first(),
        map<ZipCodes, ZipCode[]>((data) => data.zipcodes)
      )
      .toPromise();
  }

  async downloadZipCodes() {
    const codes = await this.getZipcodes();
    let text = "[";
    for (const code of codes) {
      text += "{";
      text += "zipcode: ";
      text += code.zipcode + ",";
      text += "city: ";
      text += '"' + code.city + '"';
      text += "},";
    }

    text += "]";

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", "zipcodes.txt");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  async uploadZipCodes() {
    const zipcodesInDb = await this.getAllZipCodesFromDb();

    if (zipcodesInDb.length === 0) {
      const codes = await this.getZipcodes();
      const total = codes.length;
      let count = 0;

      for (const code of codes) {
        ++count;
        await this.db
          .collection<ZipCode>("zipcodes")
          .doc(code.zipcode.toString())
          .set(code);

        this.zipCodesUploadProgress$.next({
          total,
          count,
        });
      }
    } else {
      this.zipCodesUploadProgress$.next({
        total: 100,
        count: 100,
      });
    }

    this.zipCodesUploadProgress$.complete();

    return Promise.resolve(true);
  }

  getAllZipCodesFromDb() {
    return this.db
      .collection<ZipCode>("zipcodes")
      .valueChanges()
      .pipe(first())
      .toPromise();
  }
}
