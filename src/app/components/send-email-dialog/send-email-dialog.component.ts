import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Member } from "src/models/member";
import { FormBuilder, Validators, NgForm } from "@angular/forms";
import { UtilityService } from "src/app/services/utility.service";
import { EmailTemplateService } from "src/app/services/email-template.service";
import { TemplateEmail } from "src/models/template-email";
import { MatSelectChange } from "@angular/material/select";
import { TemplateVariableService } from "src/app/services/template-variable.service";
import { TemplateVariable } from "src/models/template-variable";
import { sendEmailDialogAnim } from "./send-email-dialog.animation";

export interface SendEmailDialogConfig {
  member?: Member;
  subject?: string;
  body?: string;
  type: SendEmailDialogType;
  emailTemplate?: TemplateEmail;
}

export type SendEmailDialogType = "single" | "multiple" | "template";

export interface SendEmailDialogResult {
  emailTemplate?: TemplateEmail;
  subject: string;
  body: string;
}

@Component({
  templateUrl: "./send-email-dialog.component.html",
  styleUrls: ["./send-email-dialog.component.scss"],
  animations: sendEmailDialogAnim
})
export class SendEmailDialogComponent implements OnInit {
  @ViewChild("sendEmailForm") emailFormElement: NgForm;
  title = "Send e-mail til medlem";
  buttonTitle = "Send";
  name: string = null;
  email: string = null;
  emailForm = this.fb.group({
    subject: ["", [Validators.required]],
    body: ["", [Validators.required]],
  });
  editorConfig = this.utilityService.angularEditorStandardConfig;
  showVariablesMembers = true;
  templateVars: TemplateVariable[] = [];
  currentYear = 0;
  emailTemplates: TemplateEmail[] = [];
  showEmailTemplates = false;
  showTemplatesVarsState = "hide";
  showTemplatesVarsButtonState = "hide";
  constructor(
    private dialogRef: MatDialogRef<
      SendEmailDialogComponent,
      SendEmailDialogResult
    >,
    @Inject(MAT_DIALOG_DATA) public data: SendEmailDialogConfig,
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private emailTemplateService: EmailTemplateService,
    private templateVarsService: TemplateVariableService
  ) {}

  ngOnInit(): void {
    if (!this.data.emailTemplate) {
      this.emailTemplateService
        .getAllEmailTemplates()
        .subscribe((emailTemplates) => {
          this.emailTemplates = emailTemplates;
          if (this.emailTemplates.length !== 0) {
            this.showEmailTemplates = true;
          }
        });
    }

    if (this.data.type === "single") {
      this.name = this.data.member.name;
      this.email = this.data.member.email;
    }

    if (
      this.data.type === "template" &&
      this.data.emailTemplate.recipientType === "adminuser"
    ) {
      this.showVariablesMembers = false;
    }

    if (this.data.type === "template") {
      for (const key in this.templateVarsService.emailTempVarIndex) {
        if (this.templateVarsService.emailTempVarIndex.hasOwnProperty(key)) {
          const element = this.templateVarsService.emailTempVarIndex[key];
          this.templateVars.push(element);
        }
      }

      this.showTemplatesVarsButtonState = "show";
      this.currentYear = this.utilityService.currentYear;
      this.title = "Rediger skabelon";
      this.buttonTitle = "Gem";
      this.setFormValues(
        this.data.emailTemplate.subject,
        this.data.emailTemplate.body
      );
    } else {
      this.setFormValues(this.data.subject, this.data.body);
    }
  }

  private setFormValues(subject: string, body: string) {
    this.emailForm.setValue({
      subject,
      body,
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const subject: string = this.emailForm.get("subject").value;
      const body: string = this.emailForm.get("body").value;
      const result: SendEmailDialogResult = {
        body,
        subject,
      };
      if (this.data.emailTemplate) {
        this.data.emailTemplate.subject = subject;
        this.data.emailTemplate.body = body;
        result.emailTemplate = this.data.emailTemplate;
      }

      this.dialogRef.close(result);
    }
  }

  submitForm() {
    this.emailFormElement.ngSubmit.emit();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  emailTemplateChange(item: MatSelectChange) {
    if (item?.value) {
      const emailTemplate: TemplateEmail = item.value;
      this.setFormValues(emailTemplate.subject, emailTemplate.body);
    } else {
      this.setFormValues("", "");
    }
  }

  showVariables(action: string) {
    this.showTemplatesVarsState = action;

    if (action === "show") {
      this.showTemplatesVarsButtonState = "hide";
    } else {
      this.showTemplatesVarsButtonState = "show";
    }
  }
}
