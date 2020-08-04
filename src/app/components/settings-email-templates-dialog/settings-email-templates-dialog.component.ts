import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators, NgForm } from "@angular/forms";
import {
  TemplateEmail,
} from "src/models/template-email";
import { EmailTemplateService } from "src/app/services/email-template.service";

@Component({
  templateUrl: "./settings-email-templates-dialog.component.html",
  styleUrls: ["./settings-email-templates-dialog.component.scss"],
})
export class SettingsEmailTemplatesDialogComponent implements OnInit {
  @ViewChild("emailTemplateLineForm") emailTemplateFormElement: NgForm;
  emailTemplateForm = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required]
  });
  title = "Opret E-mail skabelon";
  buttonTitle = "Opret";
  constructor(
    private dialogRef: MatDialogRef<
      SettingsEmailTemplatesDialogComponent,
      TemplateEmail
    >,
    @Inject(MAT_DIALOG_DATA) public data: TemplateEmail,
    private fb: FormBuilder,
    private emailTemplateService: EmailTemplateService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.title = "Rediger E-mail skabelon";
      this.buttonTitle = "Gem";
      this.emailTemplateForm.setValue({
        name: this.data.name,
        description: this.data.description
      });
    }
  }

  onSubmit() {
    if (this.emailTemplateForm.valid) {
      let emailTemplate: TemplateEmail;
      const name: string = this.emailTemplateForm.get("name").value;
      const description: string = this.emailTemplateForm.get("description")
        .value;
      if (!this.data) {
        emailTemplate = this.emailTemplateService.createNewEmailTemplateOject(
          name,
          description,
          "",
          "",
          "custom",
          "member"
        );
      } else {
        emailTemplate = this.data;
        emailTemplate.name = name;
        emailTemplate.description = description;
      }

      this.dialogRef.close(emailTemplate);
    }
  }

  submitForm() {
    this.emailTemplateFormElement.ngSubmit.emit();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
