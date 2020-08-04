import { Injectable } from "@angular/core";
import { UtilityService } from "./utility.service";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  TemplateEmail,
  TemplateEmailRecipientType,
  TemplateEmailType,
} from "src/models/template-email";
import { first, catchError } from "rxjs/operators";
import { LogService } from "./log.service";
import { of } from "rxjs";
import { TemplateVariableService } from "./template-variable.service";
import { ContributionService } from "./contribution.service";
import { TeamService } from "./team.service";

@Injectable({
  providedIn: "root",
})
export class EmailTemplateService {
  private emailtemplates = "templates_email";
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService,
    private logService: LogService,
    private emailTempVarService: TemplateVariableService,
    private contributionService: ContributionService,
    private teamService: TeamService
  ) {}

  createEmptyNewEmailTemplateObject(): TemplateEmail {
    return {
      id: null,
      body: null,
      subject: null,
      type: null,
      name: null,
      description: null,
      recipientType: null,
    };
  }

  createNewEmailTemplateOject(
    name: string,
    description: string,
    subject: string,
    body: string,
    type: TemplateEmailType,
    recipientType: TemplateEmailRecipientType
  ): TemplateEmail {
    return {
      id: this.utilityService.newId,
      subject,
      body,
      type,
      name,
      description,
      recipientType,
    };
  }

  addUpdateEmailTemplate(emailTemplate: TemplateEmail) {
    return this.db
      .collection<TemplateEmail>(this.emailtemplates)
      .doc(emailTemplate.id)
      .set(emailTemplate);
  }

  deleteEmailTemplate(templateId: string) {
    return this.db
      .collection<TemplateEmail>(this.emailtemplates)
      .doc(templateId)
      .delete();
  }

  getAllEmailTemplates() {
    return this.db
      .collection<TemplateEmail>(this.emailtemplates)
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of(null);
        }),
        first<TemplateEmail[]>()
      );
  }

  getEmailTemplate(emailTemplateId: string) {
    return this.db
      .collection<TemplateEmail>(this.emailtemplates)
      .doc<TemplateEmail>(emailTemplateId)
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of(null);
        }),
        first()
      );
  }

  private getEmailTempVarValues(text: string) {
    const regEx = /##[a-z_]+##/g;
    const result = text.match(regEx);
    let tempVars: string[] = [];
    if (result) {
      tempVars = result.map((value) => {
        return value.replace(/##/g, "");
      });
    }

    return tempVars;
  }

  private getCurrentPayment() {
    const contribution = this.contributionService.contributionsIndex[
      `${this.utilityService.currentYear}_${this.teamService.defaultTeam.id}`
    ];

    return contribution?.amount ?? 0;
  }

  private getEmailTempVarReservedValue(key: string) {
    let returnValue: string;
    switch (key) {
      case "name":
        returnValue = "MEDLEMMETS_NAVN";
        break;
      case "payment": {
        returnValue = this.getCurrentPayment().toString();
        break;
      }
      case "currentyear":
        returnValue = this.utilityService.currentYear.toString();
        break;
    }

    return returnValue;
  }

  private parseVar(key: string) {
    let tempVarValue = "";
    if (this.emailTempVarService.isKeyReserved(key)) {
      tempVarValue =
        this.getEmailTempVarReservedValue(key) ??
        `"**FANDT_IKKE_RESEVERET_VARIABEL (${key})**`;
    } else {
      tempVarValue =
        this.emailTempVarService.getTempVarFromIndex(key)?.value ??
        `"**FANDT_IKKE_VARIABEL (${key})**`;
    }

    return tempVarValue;
  }

  parseEmailTemplateText(emailTemplate: TemplateEmail) {
    const tempVarsSubject = this.getEmailTempVarValues(emailTemplate.subject);
    const tempVarsBody = this.getEmailTempVarValues(emailTemplate.body);

    for (const key of tempVarsSubject) {
      const value = this.parseVar(key);
      const re = new RegExp(`##${key}##`, "g");
      emailTemplate.subject = emailTemplate.subject.replace(re, value);
    }

    for (const key of tempVarsBody) {
      const value = this.parseVar(key);
      const re = new RegExp(`##${key}##`, "g");
      emailTemplate.body = emailTemplate.body.replace(re, value);
    }

    return emailTemplate;
  }
}
