import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Member } from "src/models/member";
import { UtilityService } from "src/app/services/utility.service";

interface StatData {
  totalMembers: number;
  totalMembers18Plus: number;
  totalMembersUnder18: number;
  totalPaiedMembers18Plus: number;
  totalPaiedMembersUnder18: number;
  totalNewMembersLastYear: number;
  totalNewMembersCurrentYear: number;
  totalContributionLastYear: number;
  totalContributionCurrentYear: number;
}

@Component({
  templateUrl: "./member-statistics-dialog.component.html",
  styleUrls: ["./member-statistics-dialog.component.scss"],
})
export class MemberStatisticsDialogComponent implements OnInit {
  currentYear = 0;
  lastYear = 0;
  paymentLastYear = 0;
  paymentCurrentYear = 0;
  statData: StatData = {
    totalContributionCurrentYear: 0,
    totalContributionLastYear: 0,
    totalMembers: 0,
    totalNewMembersCurrentYear: 0,
    totalNewMembersLastYear: 0,
    totalMembers18Plus: 0,
    totalMembersUnder18: 0,
    totalPaiedMembers18Plus: 0,
    totalPaiedMembersUnder18: 0,
  };
  constructor(
    public dialogRef: MatDialogRef<MemberStatisticsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member[],
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.currentYear = this.utilityService.currentYear;
    this.lastYear = this.currentYear - 1;
    this.calculateData();
  }

  private calculateData() {
    const totalMembers = this.data.length;
    let totalNewMembersLastYear = 0;
    let totalNewMembersCurrentYear = 0;
    let totalContributionLastYear = 0;
    let totalContributionCurrentYear = 0;
    let totalMembers18Plus = 0;
    let totalMembersUnder18 = 0;
    let totalPaiedMembers18Plus = 0;
    let totalPaiedMembersUnder18 = 0;

    for (const member of this.data) {
      const age = this.utilityService.getAge(member.birthDate.toDate());
      const createdDate: Date = member.createdAt.toDate();

      if (age < 18) {
        ++totalMembersUnder18;
      } else {
        ++totalMembers18Plus;
      }

      if (createdDate.getFullYear() === this.lastYear) {
        ++totalNewMembersLastYear;
      }

      if (createdDate.getFullYear() === this.currentYear) {
        ++totalNewMembersCurrentYear;
      }

      if (
        member.payments[this.lastYear] &&
        member.payments[this.lastYear].paied
      ) {
        ++totalContributionLastYear;
      }

      if (
        member.payments[this.currentYear] &&
        member.payments[this.currentYear].paied
      ) {
        if (age < 18) {
          ++totalPaiedMembersUnder18;
        } else {
          ++totalPaiedMembers18Plus;
        }

        ++totalContributionCurrentYear;
      }
    }

    this.statData = {
      totalMembers,
      totalNewMembersLastYear,
      totalNewMembersCurrentYear,
      totalContributionLastYear,
      totalContributionCurrentYear,
      totalPaiedMembersUnder18,
      totalMembers18Plus,
      totalMembersUnder18,
      totalPaiedMembers18Plus,
    };
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
