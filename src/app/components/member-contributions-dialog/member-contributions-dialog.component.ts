import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Member, MemberPaymentData } from "src/models/member";
import { MemberService } from "src/app/services/member.service";
import { UtilityService } from "src/app/services/utility.service";
import { LogService } from "src/app/services/log.service";
import { MatSelectionListChange } from "@angular/material/list";
import { ContributionService } from "src/app/services/contribution.service";

@Component({
  templateUrl: "./member-contributions-dialog.component.html",
  styleUrls: ["./member-contributions-dialog.component.scss"],
})
export class MemberContributionsDialogComponent implements OnInit {
  payments: MemberPaymentData[] = [];
  member: Member;
  nextYearExists = false;
  nextYear = 0;
  currentYear = 0;
  constructor(
    public dialogRef: MatDialogRef<MemberContributionsDialogComponent, Member>,
    @Inject(MAT_DIALOG_DATA) private data: Member,
    private memberService: MemberService,
    private utilityService: UtilityService,
    private logService: LogService,
    private contributionService: ContributionService
  ) {}

  ngOnInit(): void {
    this.currentYear = this.utilityService.currentYear;
    this.nextYear = this.currentYear + 1;

    this.member = this.data;
    if (this.member.payments) {
      for (const key in this.member.payments) {
        if (this.member.payments.hasOwnProperty(key)) {
          const element = this.member.payments[key];
          this.payments.push(element);
        }
      }

      if (!this.currentYearPaymentExists()) {
        this.payments.push({
          amount: 0,
          paied: false,
          teamId: null,
          year: this.currentYear,
        });
      }

      this.sortPayments();
      this.nextYearExists = this.nextYearPaymentExists();
    }
  }

  private sortPayments() {
    this.payments.sort((a, b) => {
      if (a.year > b.year) {
        return -1;
      }

      if (a.year < b.year) {
        return 1;
      }

      return 0;
    });
  }

  private nextYearPaymentExists() {
    const result = this.payments.find((payment) => {
      return payment.year === this.nextYear;
    });

    return result !== undefined;
  }

  private currentYearPaymentExists() {
    const result = this.payments.find((payment) => {
      return payment.year === this.currentYear;
    });

    return result !== undefined;
  }

  addNextPayment() {
    if (!this.nextYearPaymentExists()) {
      this.payments.push({
        amount: 0,
        paied: false,
        teamId: this.member.teamId,
        year: this.nextYear,
      });

      this.sortPayments();
    }

    this.nextYearExists = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async changePayment(item: MatSelectionListChange) {
    const payment = item.option.value;

    try {
      payment.paied = item.option.selected;
      payment.teamId = this.member.teamId;
      payment.amount =
        this.contributionService.getContribution(payment.year, payment.teamId)
          ?.amount ?? 0;
      this.member.payments[payment.year.toString()] = payment;

      await this.memberService.updateMemberPayments(this.member);
    } catch (error) {
      this.logService.addLog("error", error);
    }
  }

  getPayment(year: number) {
    const contribution = this.contributionService.getContribution(
      year,
      this.member.teamId
    );
    return contribution?.amount ?? 0;
  }

  getPaymentExitsts(year: number) {
    const contribution = this.contributionService.getContribution(
      year,
      this.member.teamId
    );
    return contribution?.amount !== undefined;
  }
}
