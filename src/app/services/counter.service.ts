import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LogService } from "./log.service";
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
import { Counter } from "src/models/counter";

@Injectable({
  providedIn: "root",
})
export class CounterService {
  countersCollection = "counters";
  constructor(private db: AngularFirestore, private logService: LogService) {}

  addNewCounter(counterName: string) {
    const counter: Counter = {
      id: counterName,
      value: 0,
    };
    return this.db
      .collection<Counter>(this.countersCollection)
      .doc<Counter>(counterName)
      .set(counter);
  }

  getCounter(counterId: string): Observable<Counter> {
    return this.db
      .collection<Counter>(this.countersCollection)
      .doc<Counter>(counterId)
      .valueChanges()
      .pipe(first());
  }

  getLogCounter(): Observable<Counter> {
    return this.db
      .collection<Counter>(this.countersCollection)
      .doc<Counter>("log_counter")
      .valueChanges()
      .pipe(first());
  }

  getEmailLogCounter(): Observable<Counter> {
    return this.db
      .collection<Counter>(this.countersCollection)
      .doc<Counter>("email_log_counter")
      .valueChanges()
      .pipe(first());
  }

  getMemberLogCounter(): Observable<Counter> {
    return this.db
      .collection<Counter>(this.countersCollection)
      .doc<Counter>("member_counter")
      .valueChanges()
      .pipe(first());
  }
}
