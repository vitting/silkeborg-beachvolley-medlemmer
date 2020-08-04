import { Component, OnInit, Inject } from "@angular/core";
import { Log } from "src/models/log";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdminUserService } from "src/app/services/admin-user.service";

@Component({
  templateUrl: "./log-detail-dialog.component.html",
  styleUrls: ["./log-detail-dialog.component.scss"],
})
export class LogDetailDialogComponent implements OnInit {
  log: Log;
  constructor(
    public dialogRef: MatDialogRef<LogDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Log,
    private adminUserService: AdminUserService
  ) {}

  ngOnInit(): void {
    this.log = this.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getAdminUser(userId: string) {
    return this.adminUserService.adminUserInfosIndex[userId]?.name ?? "";
  }
}
