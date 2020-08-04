import { Component, OnInit, Inject } from "@angular/core";
import { Member, MemberPaymentData } from "src/models/member";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MemberService } from "src/app/services/member.service";
import * as moment from "moment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TeamService } from "src/app/services/team.service";

@Component({
  templateUrl: "./member-detail-dialog.component.html",
  styleUrls: ["./member-detail-dialog.component.scss"],
})
export class MemberDetailDialogComponent implements OnInit {
  zipcodeCity = "";
  age = 0;
  payments: MemberPaymentData[] = [];
  teamName = "";
  constructor(
    public dialogRef: MatDialogRef<MemberDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member,
    private memberService: MemberService,
    private snackBar: MatSnackBar,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.memberService
      .getCityByZipcode(this.data.zipcode)
      .subscribe((result) => {
        if (result) {
          this.zipcodeCity = `${result.zipcode} ${result.city}`;
        }
      });

    this.age = moment().diff(this.data.birthDate.toDate(), "years", false);
    this.teamName = this.teamService.teamsIndex[this.data.teamId]?.name;

    if (this.data.payments) {
      for (const key in this.data.payments) {
        if (this.data.payments.hasOwnProperty(key)) {
          this.payments.push(this.data.payments[key]);
        }
      }

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
  }

  closeDialog() {
    this.dialogRef.close();
  }

  copiedToClipboard(copied: boolean, label: string) {
    if (copied) {
      this.snackBar.open(`${label} kopieret til udklipsholder`, null, {
        duration: 1000,
      });
    }
  }
}
