import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/functions";
import { EnvironmentVars } from "src/interfaces/environment-vars";

@Injectable({
  providedIn: "root",
})
export class AdminFirebaseFunctionsService {
  constructor(private fns: AngularFireFunctions) {}

  getEnvironmentVars(): Promise<EnvironmentVars> {
    const ref = this.fns.httpsCallable<null, EnvironmentVars>(
      "getEnvironmentVars"
    );
    return ref(null).toPromise();
  }
}
