import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProgressbarService {
  showProgressbar$ = new BehaviorSubject<boolean>(false);
  constructor() {}

  set showProgressbar(show: boolean) {
    this.showProgressbar$.next(show);
  }
}
