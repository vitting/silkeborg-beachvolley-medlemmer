import { Injectable } from "@angular/core";
import { ZipCodeService } from "./zip-code.service";
import { TeamService } from "./team.service";
import { EmailTemplateService } from "./email-template.service";
import { Team } from "src/models/team";
import { ContributionService } from "./contribution.service";
import { UtilityService } from "./utility.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { ConfigSettings } from "src/models/config-settings";
import { first } from "rxjs/operators";
import { TemplateVariableService } from "./template-variable.service";
import { BehaviorSubject } from "rxjs";
import { AdminUserService } from "./admin-user.service";
import { CounterService } from "./counter.service";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root",
})
export class ConfigSettingsService {
  defaultMessages$ = new BehaviorSubject<number>(0);
  defaultCounters$ = new BehaviorSubject<number>(0);
  defaultEmailTemplates$ = new BehaviorSubject<number>(0);
  defaultTemplateVariables$ = new BehaviorSubject<number>(0);
  defaultTeam$ = new BehaviorSubject<number>(0);
  defaultContribution$ = new BehaviorSubject<number>(0);
  zipCodes$ = new BehaviorSubject<number>(0);
  private configSettings = "config_settings";
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService,
    private zipcodeService: ZipCodeService,
    private teamService: TeamService,
    private emailTemplateService: EmailTemplateService,
    private contributionService: ContributionService,
    private tempVarService: TemplateVariableService,
    private adminUserService: AdminUserService,
    private counterService: CounterService,
    private messageService: MessageService
  ) {}

  async createDefaultMessages() {
    // tslint:disable-next-line: quotemark
    const newMemberCompletionDaText = '<font face="Arial">Tak for din indmeldelse i Silkeborg Beachvolley &#128077;</font><div><font face="Arial"><br></font></div><div><font face="Arial">Du modtager inden l&#230;nge en e-mail med&#160;</font><span><font face="Arial">bekr&#230;ftelse p&#229; din indmeldelse.&#160;</font></span></div><div><span><font face="Arial"><br></font></span></div><div><span><font face="Arial">Vi gl&#230;der os til at se dig p&#229; banerne &#128526;</font></span></div>';
    // tslint:disable-next-line: quotemark
    const newMemberCompletionEnText = '<font face="Arial">Thank you for your registration &#128077;</font><div><font face="Arial"><br></font></div><div><font face="Arial">You will soon receive an email confirming your registration.<br></font></div><div><font face="Arial"><br></font></div><div><font face="Arial">We are looking forward to seeing you in the sand &#128526;<br></font></div>';
    const messageDa = this.messageService.createMessageObject("newmembercompletion", "da", newMemberCompletionDaText);
    const messageEn = this.messageService.createMessageObject("newmembercompletion", "en", newMemberCompletionEnText);
    await this.messageService.addUpdateMessage(messageDa);
    this.defaultMessages$.next(50);
    await this.messageService.addUpdateMessage(messageEn);
    this.defaultMessages$.next(100);
    this.defaultMessages$.complete();
  }

  async createDefaultCounters() {
    await this.counterService.addNewCounter("log_counter");
    this.defaultCounters$.next(33);
    await this.counterService.addNewCounter("email_log_counter");
    this.defaultCounters$.next(66);
    await this.counterService.addNewCounter("member_counter");
    this.defaultCounters$.next(100);
    this.defaultCounters$.complete();
  }

  async createDefaultContribution(teamId: string) {
    const currentYearDefault = this.contributionService.createContributionObject(
      this.utilityService.currentYear,
      0,
      teamId
    );
    const lastYearDefault = this.contributionService.createContributionObject(
      this.utilityService.currentYear - 1,
      0,
      teamId
    );

    await this.contributionService.addUpdateContribution(currentYearDefault);
    this.defaultContribution$.next(50);
    await this.contributionService.addUpdateContribution(lastYearDefault);
    this.defaultContribution$.next(100);
    this.defaultContribution$.complete();
  }

  async createDefaultTeam() {
    const team: Team = this.teamService.createTeamObject(
      "Standard",
      "default",
      true
    );
    await this.teamService.addUpdateTeam(team);
    this.defaultTeam$.next(100);
    this.defaultTeam$.complete();
    return team.id;
  }

  async createDefaultTemplateVariables() {
    const mobilePay = this.tempVarService.createNewTempVarObject(
      "MobilePay nummer",
      "18185",
      "mobilepay"
    );
    const contactEmail = this.tempVarService.createNewTempVarObject(
      "Foreningens e-mail adresse",
      "silkeborgbeachvolley@gmail.com",
      "contact_email"
    );

    await this.tempVarService.addUpdateTempVar(mobilePay);
    this.defaultTemplateVariables$.next(50);
    await this.tempVarService.addUpdateTempVar(contactEmail);
    this.defaultTemplateVariables$.next(100);
    this.defaultTemplateVariables$.complete();
  }

  async createDefaultEmailTemplates() {
    const singlePayment = this.emailTemplateService.createNewEmailTemplateOject(
      "Opkrævning af kontingent fra et medlem",
      "E-mail der sendes til medlem der skal huske at betale kontingent",
      "",
      "",
      "custom",
      "member"
    );
    const multiplePayment = this.emailTemplateService.createNewEmailTemplateOject(
      "Opkrævning af kontingent for nuværrende sæson",
      "E-mail der sendes til aktive medlemmer",
      "",
      "",
      "custom",
      "member"
    );
    const memberCreate = this.emailTemplateService.createNewEmailTemplateOject(
      "Oprettelse af nyt medlem",
      "Velkomst e-mail der sendes til nyt medlem ved oprettelse",
      "",
      "",
      "membercreate",
      "member"
    );
    const userCreate = this.emailTemplateService.createNewEmailTemplateOject(
      "Oprettelse af ny administrator",
      "Velkomst e-mail der sendes til ny administrator når vi har oprettet han/hende i medlems systemet",
      "",
      "",
      "adminusercreate",
      "adminuser"
    );

    await this.emailTemplateService.addUpdateEmailTemplate(singlePayment);
    this.defaultEmailTemplates$.next(25);
    await this.emailTemplateService.addUpdateEmailTemplate(multiplePayment);
    this.defaultEmailTemplates$.next(50);
    await this.emailTemplateService.addUpdateEmailTemplate(memberCreate);
    this.defaultEmailTemplates$.next(75);
    await this.emailTemplateService.addUpdateEmailTemplate(userCreate);
    this.defaultEmailTemplates$.next(100);
    this.defaultEmailTemplates$.complete();
  }

  async createZipCodes() {
    this.zipcodeService.zipCodesUploadProgress$.subscribe((progress) => {
      if (progress.total > 0) {
        this.zipCodes$.next((progress.count * 100) / progress.total);

        if (progress.total === progress.count) {
          this.zipCodes$.complete();
        }
      }
    });

    await this.zipcodeService.uploadZipCodes();
  }

  async createAdminUser(name: string, email: string) {
    const adminUser = this.adminUserService.createAdminUserObject(
      name,
      email,
      true
    );
    return this.adminUserService.addUpdateAdminUser(adminUser);
  }

  async getConfigFirstRun() {
    let returnValue = false;
    const value = await this.db
      .collection<ConfigSettings>(this.configSettings)
      .doc("config_first")
      .valueChanges()
      .pipe(first<ConfigSettings>())
      .toPromise();

    if (value && value?.runAt) {
      returnValue = true;
    }

    return returnValue;
  }

  setConfigFirstRun() {
    const config: ConfigSettings = {
      runAt: this.utilityService.timestamp,
      settingsVisitedAt: null,
    };

    return this.db
      .collection<ConfigSettings>(this.configSettings)
      .doc("config_first")
      .set(config);
  }

  async getSettingsVisited() {
    let returnValue = false;
    const value = await this.db
      .collection<ConfigSettings>(this.configSettings)
      .doc("config_first")
      .valueChanges()
      .pipe(first<ConfigSettings>())
      .toPromise();

    if (value && value?.settingsVisitedAt) {
      returnValue = true;
    }

    return returnValue;
  }

  setSettingsVisited() {
    return this.db
      .collection<ConfigSettings>(this.configSettings)
      .doc("config_first")
      .update({ settingsVisitedAt: this.utilityService.timestamp });
  }
}
