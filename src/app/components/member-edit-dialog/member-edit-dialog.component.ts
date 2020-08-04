import { Component, OnInit, Inject } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { UtilityService } from "src/app/services/utility.service";
import { MemberService } from "src/app/services/member.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Member } from "src/models/member";
import { LogService } from "src/app/services/log.service";
import { Team } from "src/models/team";
import { TeamService } from "src/app/services/team.service";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { EmailToSendService } from "src/app/services/email-to-send.service";

export enum MemberEditDialogState {
  new,
  edit,
}

export enum MemberEditDialogCloseState {
  created,
  updated,
  cancel,
}

export interface MemberEditDialogData {
  data: Member;
  state: MemberEditDialogState;
  teams: Team[];
}

@Component({
  templateUrl: "./member-edit-dialog.component.html",
  styleUrls: ["./member-edit-dialog.component.scss"],
})
export class MemberEditDialogComponent implements OnInit {
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
  birthMonths: string[] = this.utilityService.getMonthNames();
  birthYears: number[] = [];
  currentYear = 2020;
  formButtonText = "";
  formTitleText = "";
  member: Member;
  teams: Team[] = [];
  sendCreationEmail = true;
  showEmailCreatonControl = false;
  private defaultTeam: Team;
  constructor(
    private fb: FormBuilder,
    private logService: LogService,
    private utilityService: UtilityService,
    private memberService: MemberService,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<
      MemberEditDialogComponent,
      MemberEditDialogCloseState
    >,
    @Inject(MAT_DIALOG_DATA) public data: MemberEditDialogData,
    private emailToSendService: EmailToSendService
  ) {}

  ngOnInit(): void {
    this.teams = this.data.teams;
    this.defaultTeam = this.getDefaultTeam();
    if (this.data.state === MemberEditDialogState.edit) {
      this.showEmailCreatonControl = false;
      this.formButtonText = "Gem";
      this.formTitleText = "Rediger medlem";
      this.member = this.data.data;
      this.membershipForm.setValue({
        name: this.data.data.name,
        address: this.data.data.address,
        zipcode: this.data.data.zipcode,
        email: this.data.data.email,
        phone: this.data.data.phone,
        comment: this.data.data.comment,
        birthDay: this.data.data.birthDate.toDate().getDate(),
        birthMonth: this.data.data.birthDate.toDate().getMonth(),
        birthYear: this.data.data.birthDate.toDate().getFullYear(),
        team: this.teamService.teamsIndex[this.data.data.teamId],
      });
    } else {
      this.showEmailCreatonControl = true;
      this.membershipForm.get("team").setValue(this.defaultTeam);
      this.formButtonText = "Opret";
      this.formTitleText = "Opret medlem";
    }

    this.currentYear = this.utilityService.currentYear;
    for (let index = 0; index < 80; index++) {
      this.birthYears.push(this.currentYear - index);
    }
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
      errorMessage = "Skal udfyldes";
    } else if (control.hasError("max") || control.hasError("min")) {
      if (controlName === "zipcode") {
        errorMessage = "Ikke gyldigt postnummer";
      }

      if (controlName === "phone") {
        errorMessage = "Ikke gyldigt mobilnummer";
      }
    } else if (control.hasError("email")) {
      errorMessage = "Ikke gyldig e-mail adresse";
    }

    return errorMessage;
  }

  async onSubmit() {
    if (this.membershipForm.valid) {
      let member: Member;
      if (this.data.state === MemberEditDialogState.edit) {
        member = this.memberService.updateMemberObject(
          this.membershipForm.value,
          this.data.data
        );

        this.logService.addLog("admin", "member edited", member.id);
      } else {
        member = this.memberService.createMemberObject(
          this.membershipForm.value,
          this.defaultTeam.id,
          this.sendCreationEmail
        );

        this.logService.addLog("admin", "member created", member.id);
      }

      try {
        await this.memberService.addUpdateMember(member);
        this.membershipForm.reset();
        if (this.data.state === MemberEditDialogState.edit) {
          this.closeDialog(MemberEditDialogCloseState.updated);
        } else {
          if (this.sendCreationEmail) {
            this.emailToSendService.sendMailToNewMember(member);
          }
          this.closeDialog(MemberEditDialogCloseState.created);
        }
      } catch (error) {
        this.logService.addLog("error", error);
      }
    }
  }

  closeDialog(action: string | MemberEditDialogCloseState) {
    let result = MemberEditDialogCloseState.cancel;

    if (typeof action !== "string") {
      result = action;
    }

    this.dialogRef.close(result);
  }

  sendCreationEmailChange(event: MatCheckboxChange) {
    this.sendCreationEmail = event.checked;
  }
}
