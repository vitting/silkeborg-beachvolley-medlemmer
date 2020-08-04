import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import {
  TemplateVariable,
  TemplateVariableIndex,
} from "src/models/template-variable";
import { TemplateVariableService } from "../services/template-variable.service";

@Injectable({
  providedIn: "root",
})
export class EmailTemplateVariableResolverService
  implements Resolve<TemplateVariable[]> {
  constructor(private emailTempVarService: TemplateVariableService) {}
  resolve(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):
    | TemplateVariable[]
    | import("rxjs").Observable<TemplateVariable[]>
    | Promise<TemplateVariable[]> {
    return new Promise((resolve, reject) => {
      this.emailTempVarService.getAllTempVars().subscribe(
        (tempVars) => {
          const tempVarsIndex: TemplateVariableIndex = {};
          for (const tempVar of tempVars) {
            tempVarsIndex[tempVar.key] = tempVar;
          }

          this.emailTempVarService.emailTempVarIndex = tempVarsIndex;

          return resolve(tempVars);
        },
        (error) => {
          resolve(error);
        }
      );
    });
  }
}
