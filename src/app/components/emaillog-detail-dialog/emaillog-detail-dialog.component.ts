import { Component, OnInit, Inject } from "@angular/core";
import { EmailLog } from "src/models/email-log";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: "./emaillog-detail-dialog.component.html",
  styleUrls: ["./emaillog-detail-dialog.component.scss"],
})
export class EmaillogDetailDialogComponent implements OnInit {
  emailLog: EmailLog;
  constructor(
    public dialogRef: MatDialogRef<EmaillogDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailLog,
  ) {}

  ngOnInit(): void {
    this.emailLog = this.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getEmails(emails: string) {
    return emails.split(";");
  }
}
