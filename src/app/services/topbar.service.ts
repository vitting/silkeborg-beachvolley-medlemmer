import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TopbarService {
  topbarTitle$ = new BehaviorSubject<string>("Silkeborg Beachvolley");
  constructor() {}

  set title(title: string) {
    this.topbarTitle$.next(title);
  }
}
