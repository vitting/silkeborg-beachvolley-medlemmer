import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UtilityService } from "src/app/services/utility.service";
import { MemberService } from "src/app/services/member.service";
import { membershipAnimation } from "./membership.animation";
import { LogService } from "src/app/services/log.service";
import { ActivatedRoute } from "@angular/router";
import { Team } from "src/models/team";
import { TranslateService } from "@ngx-translate/core";
import { Member } from "src/models/member";
import { EmailToSendService } from "src/app/services/email-to-send.service";
import { Contribution } from "src/models/contribution";
import { MessageService } from "src/app/services/message.service";

interface ResolvedData {
  teams: Team[];
  contributions: Contribution[];
}

interface FormErrorMessages {
  required: string;
  zipcode: string;
  mobile: string;
  email: string;
}
@Component({
  templateUrl: "./membership.component.html",
  styleUrls: ["./membership.component.scss"],
  animations: membershipAnimation,
})
export class MembershipComponent implements OnInit {
  stateMembership = "show";
  stateReceipt = "hide";
  membershipForm = this.fb.group({
    team: [null, Validators.required],
    name: ["", Validators.required],
    address: ["", Validators.required],
    zipcode: [
      "",
      [Validators.required, Validators.min(1301), Validators.max(9990)],
    ],
    birthDay: ["", Validators.required],
    birthMonth: ["", Validators.required],
    birthYear: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: [
      "",
      [Validators.required, Validators.min(20000000), Validators.max(99000000)],
    ],
    comment: [""],
  });

  birthDays: number[] = this.utilityService.daysInMonths;
  birthMonths: string[] = [];
  birthYears: number[] = [];
  memberName = "";
  currentYear = 2020;
  teams: Team[] = [];
  showInEnglishButton = true;
  completionText = "";
  private errorMessages: FormErrorMessages;
  private defaultTeam: Team;

  constructor(
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private memberService: MemberService,
    private logService: LogService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private emailToSendService: EmailToSendService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.currentYear = this.utilityService.currentYear;
    this.changeLanguage(this.utilityService.browserLanguage);

    for (let index = 0; index < 80; index++) {
      this.birthYears.push(this.currentYear - index);
    }

    this.activatedRoute.data.subscribe((data: ResolvedData) => {
      this.teams = data.teams;
      this.defaultTeam = this.getDefaultTeam();
      this.membershipForm.get("team").setValue(this.defaultTeam);
    });
  }

  private getDefaultTeam() {
    let teamValue: Team = null;
    for (const team of this.teams) {
      if (team.value === "default") {
        teamValue = team;
        break;
      }
    }

    return teamValue;
  }

  getError(controlName: string): string {
    const control = this.membershipForm.get(controlName);
    let errorMessage = "";
    if (control.hasError("required")) {
      errorMessage = this.errorMessages?.required;
    } else if (control.hasError("max") || control.hasError("min")) {
      if (controlName === "zipcode") {
        errorMessage = this.errorMessages?.zipcode;
      }

      if (controlName === "phone") {
        errorMessage = this.errorMessages?.mobile;
      }
    } else if (control.hasError("email")) {
      errorMessage = this.errorMessages?.email;
    }

    return errorMessage;
  }

  async onSubmit() {
    if (this.membershipForm.valid) {
      this.stateMembership = "hide";
      this.stateReceipt = "show";
      const member = this.memberService.createMemberObject(
        this.membershipForm.value,
        this.defaultTeam.id,
        true
      );

      this.memberName = member.name;
      try {
        await this.memberService.addUpdateMember(member);
        this.logService.addLog("member", "member added", member.id);
        this.membershipForm.reset();
        await this.emailToSendService.sendMailToNewMember(member);
      } catch (error) {
        this.logService.addLog("error", error);
      }
    }
  }

  async changeLanguage(languageCode: string) {
    if (languageCode === "da") {
      const messages = await this.messageService
        .getMessageByTypeAndLanguage("newmembercompletion", "da")
        .toPromise();
      if (messages.length !== 0) {
        this.completionText = messages[0].text;
      }

      this.showInEnglishButton = true;
    } else if (languageCode === "en") {
      const messages = await this.messageService
        .getMessageByTypeAndLanguage("newmembercompletion", "en")
        .toPromise();
      if (messages.length !== 0) {
        this.completionText = messages[0].text;
      }

      this.showInEnglishButton = false;
      this.translate.use("en");
    }

    await this.setErrorMessages();
    this.birthMonths = this.utilityService.getMonthNames(languageCode);
  }

  private async setErrorMessages() {
    const resultErrors = await this.translate
      .get([
        "MEMBERSHIP_ERRORS.REQUIRED_ERROR",
        "MEMBERSHIP_ERRORS.ZIPCODE_ERROR",
        "MEMBERSHIP_ERRORS.MOBILE_ERROR",
        "MEMBERSHIP_ERRORS.EMAIL_ERROR",
      ])
      .toPromise();

    this.errorMessages = {
      email: resultErrors["MEMBERSHIP_ERRORS.EMAIL_ERROR"],
      mobile: resultErrors["MEMBERSHIP_ERRORS.MOBILE_ERROR"],
      zipcode: resultErrors["MEMBERSHIP_ERRORS.ZIPCODE_ERROR"],
      required: resultErrors["MEMBERSHIP_ERRORS.REQUIRED_ERROR"],
    };
  }
}
