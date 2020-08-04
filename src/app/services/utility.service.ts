import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  private monthsDa = [
    "januar",
    "februar",
    "marts",
    "april",
    "maj",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "december",
  ];

  private monthsEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  days: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  constructor(private db: AngularFirestore) {}
  get timestamp() {
    return firebase.firestore.Timestamp.now();
  }

  timestampFromDate(date: Date) {
    return firebase.firestore.Timestamp.fromDate(date);
  }

  get newId(): string {
    return this.db.createId();
  }

  vibrate(time: number | number[] = 200) {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(time);
    }
  }

  get currentYear() {
    return new Date(Date.now()).getFullYear();
  }

  get daysInMonths() {
    return this.days;
  }

  getMonthNames(language: string = "da") {
    if (language === "en") {
      return this.monthsEn;
    }

    return this.monthsDa;
  }

  getMonthName(month: number) {
    return this.monthsDa[month];
  }

  getAge(date: Date): number {
    return moment().diff(date, "years", false);
  }

  get browserLanguage() {
    let languageCode = "en";

    if (window.navigator.language) {
      if (window.navigator.language.includes("da")) {
        languageCode = "da";
      }
    } else if (navigator.language) {
      if (navigator.language.includes("da")) {
        languageCode = "da";
      }
      return navigator.language;
    }

    return languageCode;
  }

  get angularEditorStandardConfig(): AngularEditorConfig {
    return {
      editable: true,
      showToolbar: true,
      toolbarPosition: "bottom",
      height: "auto",
      minHeight: "200px",
      maxHeight: "auto",
      width: "100%",
      minWidth: "100%",
      sanitize: true,
      outline: true,
      defaultFontName: "Arial",
      fonts: [{ class: "arial", name: "Arial" }],
      toolbarHiddenButtons: [
        ["strikeThrough", "subscript", "superscript"],
        [
          "fontSize",
          "textColor",
          "backgroundColor",
          "customClasses",
          "insertVideo",
          "toggleEditorMode",
        ],
      ],
    };
  }
}
