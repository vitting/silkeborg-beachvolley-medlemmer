import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { TemplateVariableService } from "src/app/services/template-variable.service";

@Injectable()
export class SettingsTemplateVariableDialogValidatorService {
  constructor(private emailTempVarService: TemplateVariableService) {}

  keyExists(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const key: string = control.value;

      if (this.emailTempVarService.getTempVarFromIndex(key)) {
        return { keyExists: true };
      }

      return null;
    };
  }

  keyReserved(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const key: string = control.value;

      if (this.emailTempVarService.isKeyReserved(key)) {
        return { keyReserved: true };
      }

      return null;
    };
  }
}
