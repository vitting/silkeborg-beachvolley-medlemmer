import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LogService } from "./log.service";
import { UtilityService } from "./utility.service";
import {
  Message,
  MessageType,
  MessageLanguageType,
} from "../../models/message";
import { first, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  messageCollection = "messages";
  constructor(
    private db: AngularFirestore,
    private logService: LogService,
    private utilityService: UtilityService
  ) {}

  createMessageObject(
    type: MessageType,
    language: MessageLanguageType,
    text: string
  ): Message {
    const id = this.utilityService.newId;
    return {
      id,
      type,
      language,
      text,
    };
  }

  addUpdateMessage(message: Message) {
    return this.db
      .collection<Message>(this.messageCollection)
      .doc(message.id)
      .set(message);
  }

  getMessageByTypeAndLanguage(
    type: MessageType,
    language: MessageLanguageType
  ): Observable<Message[]> {
    return this.db
      .collection<Message>(this.messageCollection, (ref) => {
        return ref.where("type", "==", type).where("language", "==", language);
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of([]);
        }),
        first()
      );
  }
}
