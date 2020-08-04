import { Component, OnInit } from "@angular/core";
import { TopbarService } from "src/app/services/topbar.service";
import { MatDialog } from "@angular/material/dialog";
import { AdminUserEditDialogComponent } from "src/app/components/admin-user-edit-dialog/admin-user-edit-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminUser } from "src/models/admin-user";
import { AdminUserService } from "src/app/services/admin-user.service";
import { DeleteDialogComponent } from "src/app/components/delete-dialog/delete-dialog.component";
import { LogService } from "src/app/services/log.service";
import { ProgressbarService } from "src/app/services/progressbar.service";

@Component({
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.scss"],
})
export class AdminUsersComponent implements OnInit {
  adminUsers: AdminUser[] = [];
  constructor(
    private topbarService: TopbarService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminUserService: AdminUserService,
    private logService: LogService,
    private progressbarService: ProgressbarService
  ) {}

  ngOnInit(): void {
    this.topbarService.title = "Brugere";
    this.loadAdminUsers();
  }

  private loadAdminUsers() {
    this.adminUserService.getAllAdminUsers().subscribe((adminusers) => {
      this.adminUsers = adminusers;
    });
  }

  async deleteUser(adminUser: AdminUser, index: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "400px",
      data: {
        title: "Slet bruger",
        text: `Er du sikker på at du vil slette ${adminUser.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          this.progressbarService.showProgressbar = true;
          await this.adminUserService.deleteAdminUser(adminUser.id);
          await this.adminUserService.deleteAdminUserInfo(adminUser.id);

          this.logService.addLog(
            "admin",
            `admin user deleted - ${adminUser.name} / ${adminUser.email}`
          );
          this.adminUsers.splice(index, 1);
          this.snackBar.open("Bruger er slettet", null, {
            duration: 1000,
          });
        } catch (error) {
          this.logService.addLog("error", error);
        } finally {
          this.progressbarService.showProgressbar = false;
        }
      }
    });
  }

  editUser(adminUser: AdminUser) {
    const dialogRef = this.dialog.open(AdminUserEditDialogComponent, {
      width: "400px",
      disableClose: true,
      data: {
        adminUser,
        adminUsers: this.adminUsers,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.snackBar.open("Bruger er gemt", null, {
          duration: 1000,
        });
      }
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(AdminUserEditDialogComponent, {
      width: "400px",
      disableClose: true,
      data: {
        adminUser: null,
        adminUsers: this.adminUsers,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.snackBar.open("Bruger er oprettet", null, {
          duration: 1000,
        });

        this.adminUsers.push(result);
        this.adminUsers.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }

          if (a.name < b.name) {
            return -1;
          }

          return 0;
        });
      }
    });
  }
}
