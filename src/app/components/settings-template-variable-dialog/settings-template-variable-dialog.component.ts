import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import {
  Validators,
  NgForm,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SettingsTemplateVariableDialogValidatorService } from "./settings-template-variable-dialog.validator.service";
import { TemplateVariable } from "src/models/template-variable";

@Component({
  templateUrl: "./settings-template-variable-dialog.component.html",
  styleUrls: ["./settings-template-variable-dialog.component.scss"],
})
export class SettingsTemplateVariableDialogComponent implements OnInit {
  @ViewChild("tempVarLineForm") tempVarLineFormElement: NgForm;
  title = "Opret Variable";
  buttonTitle = "Opret";
  keyHint = "Skal bestå af små bogstaver a-z eller _";
  private tempVar: TemplateVariable;
  tempVarForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(4)]],
    value: ["", [Validators.required]],
    key: [
      "",
      [
        Validators.required,
        Validators.minLength(4),
        this.tempVarValService.keyExists(),
        this.tempVarValService.keyReserved(),
      ],
    ],
  });
  constructor(
    private dialogRef: MatDialogRef<
      SettingsTemplateVariableDialogComponent,
      TemplateVariable
    >,
    @Inject(MAT_DIALOG_DATA) public data: TemplateVariable,
    private fb: FormBuilder,
    private tempVarValService: SettingsTemplateVariableDialogValidatorService
  ) {}

  ngOnInit(): void {
    this.tempVar = this.data;

    if (this.data.id) {
      this.title = "Rediger variable";
      this.buttonTitle = "Gem";
      this.tempVarForm.get("key").disable();
      this.keyHint = "Nøglen kan ikke ændres";
    }

    this.tempVarForm.setValue({
      name: this.data.name,
      value: this.data.value,
      key: this.data.key,
    });
  }

  validateKeyPress(event) {
    // Only allow chars a to z and _
    const exp = /[a-z_]/;
    return exp.test(event.key);
  }

  getError(control: AbstractControl) {
    let errorText = "";
    if (control.hasError("required")) {
      errorText = "Feltet skal udfyldes";
    } else if (control.hasError("keyExists")) {
      errorText = "Der eksistere allerede en nøgle med det navn";
    } else if (control.hasError("minlength")) {
      errorText = "Skal være på mindst 4 karakter";
    } else if (control.hasError("keyReserved")) {
      errorText = "Reseveret nøgle navn";
    }

    return errorText;
  }

  onSubmit() {
    if (this.tempVarForm.valid) {
      const name: string = this.tempVarForm.get("name").value;
      const value: string = this.tempVarForm.get("value").value;
      const key: string = this.tempVarForm.get("key").value;
      // const value = this.parseName(name);
      this.tempVar.name = name;
      this.tempVar.value = value;
      this.tempVar.key = key;
      this.dialogRef.close(this.tempVar);
    }
  }

  submitForm() {
    this.tempVarLineFormElement.ngSubmit.emit();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
