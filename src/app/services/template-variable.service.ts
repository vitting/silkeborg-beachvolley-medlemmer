import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UtilityService } from "./utility.service";
import { LogService } from "./log.service";
import {
  TemplateVariable,
  TemplateVariableIndex,
} from "src/models/template-variable";
import { catchError, first } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TemplateVariableService {
  private tempVarCol = "template_variables";
  private index: TemplateVariableIndex;
  private keysReserved = [
    "name",
    "payment",
    "currentyear"
  ];
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService,
    private logService: LogService
  ) {}

  isKeyReserved(key: string) {
    return this.keysReserved.indexOf(key) !== -1;
  }

  get emailTempVarIndex() {
    return this.index;
  }

  set emailTempVarIndex(index: TemplateVariableIndex) {
    this.index = index;
  }

  getTempVarFromIndex(key: string) {
    return this.emailTempVarIndex[key];
  }

  addUpdateTempVarToIndex(emailTempVar: TemplateVariable) {
    this.emailTempVarIndex[emailTempVar.key] = emailTempVar;
  }

  createNewTempVarObject(
    name: string,
    value: string,
    key: string
  ): TemplateVariable {
    const id = this.utilityService.newId;

    return {
      id,
      key,
      name,
      value,
    };
  }

  addUpdateTempVar(item: TemplateVariable) {
    return this.db
      .collection<TemplateVariable>(this.tempVarCol)
      .doc(item.id)
      .set(item);
  }

  deleteTempVar(tempVarId: string) {
    return this.db
      .collection<TemplateVariable>(this.tempVarCol)
      .doc(tempVarId)
      .delete();
  }

  getAllTempVars() {
    return this.db
      .collection<TemplateVariable>(this.tempVarCol)
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of([]);
        }),
        first<TemplateVariable[]>()
      );
  }
}
