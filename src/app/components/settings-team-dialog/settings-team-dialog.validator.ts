import { ValidatorFn, AbstractControl } from "@angular/forms";

export function NameValueExists(teams: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let valueExists = false;
    const name: string = control.value;
    const value = name
    .toLowerCase()
    .replace(/\s/g, "")
    .replace("æ", "ae")
    .replace("å", "aa")
    .replace("ø", "oe");

    if (teams.indexOf(value) !== -1) {
      valueExists = true;
    }

    return valueExists ? {valueExists: true} : null;
  };
}
