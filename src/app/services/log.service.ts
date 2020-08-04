import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UtilityService } from "./utility.service";
import { Log, LogType } from "src/models/log";
import { AdminUserService } from "./admin-user.service";
import { catchError, first } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { EmailLog } from "src/models/email-log";

export enum LogPaginationAction {
  initial,
  nextPage,
  prevPage,
}

@Injectable({
  providedIn: "root",
})
export class LogService {
  logs = "logs";
  emaillogs = "email_logs";
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService,
    private adminUserService: AdminUserService
  ) {}

  addLog(type: LogType, message: string, memberId: string = null) {
    const id = this.utilityService.newId;
    return this.db
      .collection<Log>(this.logs)
      .doc<Log>(id)
      .set({
        id,
        date: this.utilityService.timestamp,
        type,
        message,
        userId: this.adminUserService.currentUser?.uid ?? null,
        memberId,
      });
  }

  getLogs(): Observable<Log[]> {
    return this.db
      .collection<Log>(this.logs, (ref) => {
        return ref.orderBy("date", "desc");
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
        first()
      );
  }

  getLogsPagination(
    limit: number,
    date: firebase.firestore.Timestamp,
    action: LogPaginationAction
  ): Observable<Log[]> {
    return this.db
      .collection<Log>(this.logs, (ref) => {
        switch (action) {
          case LogPaginationAction.initial:
            return ref.orderBy("date", "desc").limit(limit);
          case LogPaginationAction.nextPage:
            return ref.orderBy("date", "desc").startAfter(date).limit(limit);
          case LogPaginationAction.prevPage:
            return ref
              .orderBy("date", "desc")
              .endBefore(date)
              .limitToLast(limit);
        }
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
        first()
      );
  }

  getEmailLogs(): Observable<EmailLog[]> {
    return this.db
      .collection<EmailLog>(this.emaillogs, (ref) => {
        return ref.orderBy("sendtAt", "desc");
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
        first()
      );
  }

  getEmailLogsPagination(
    limit: number,
    date: firebase.firestore.Timestamp,
    action: LogPaginationAction
  ): Observable<EmailLog[]> {
    return this.db
      .collection<EmailLog>(this.emaillogs, (ref) => {
        switch (action) {
          case LogPaginationAction.initial:
            return ref.orderBy("sendtAt", "desc").limit(limit);
          case LogPaginationAction.nextPage:
            return ref.orderBy("sendtAt", "desc").startAfter(date).limit(limit);
          case LogPaginationAction.prevPage:
            return ref
              .orderBy("sendtAt", "desc")
              .endBefore(date)
              .limitToLast(limit);
        }
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
        first()
      );
  }
}
