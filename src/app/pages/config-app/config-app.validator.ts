import { ValidatorFn, AbstractControl } from "@angular/forms";

export function ValidGmailAddress(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email: string = control.value;
    let validGmailAddress = false;

    if (email.indexOf("@gmail.com") === -1) {
      validGmailAddress = true;
    }

    return validGmailAddress ? { validGmailAddress: true } : null;
  };
}
