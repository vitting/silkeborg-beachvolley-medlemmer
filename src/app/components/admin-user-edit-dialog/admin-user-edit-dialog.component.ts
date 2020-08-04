import { Component, OnInit, Inject } from "@angular/core";
import { AdminUser } from "src/models/admin-user";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdminUserService } from "src/app/services/admin-user.service";
import { FormBuilder, Validators } from "@angular/forms";
import { LogService } from "src/app/services/log.service";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { EmailToSendService } from "src/app/services/email-to-send.service";

export interface AdminUserEditDialogData {
  adminUser: AdminUser;
  adminUsers: AdminUser[];
}

@Component({
  templateUrl: "./admin-user-edit-dialog.component.html",
  styleUrls: ["./admin-user-edit-dialog.component.scss"],
})
export class AdminUserEditDialogComponent implements OnInit {
  title = "Opret bruger";
  buttonTitle = "Opret";
  adminUserForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    admin: [false]
  });
  showSendEmail = true;
  sendEmailToNewUser = false;
  constructor(
    public dialogRef: MatDialogRef<AdminUserEditDialogComponent, AdminUser>,
    @Inject(MAT_DIALOG_DATA) public data: AdminUserEditDialogData,
    private adminUserService: AdminUserService,
    private fb: FormBuilder,
    private logService: LogService,
    private emailToSendService: EmailToSendService
  ) {}

  ngOnInit(): void {
    if (this.data.adminUser) {
      this.title = "Rediger bruger";
      this.buttonTitle = "Gem";
      this.adminUserForm.setValue({
        name: this.data.adminUser.name,
        email: this.data.adminUser.email,
        admin: this.data.adminUser.admin
      });
      this.showSendEmail = false;
      this.adminUserForm.get("email").disable();
    } else {
      this.title = "Opret bruger";
      this.buttonTitle = "Opret";
    }
  }

  async onSubmit() {
    if (this.adminUserForm.valid) {
      const name: string = this.adminUserForm.get("name").value;
      const admin: boolean = this.adminUserForm.get("admin").value;
      let adminUser: AdminUser;

      if (this.data.adminUser) {
        adminUser = this.data.adminUser;
        adminUser.name = name;
        adminUser.admin = admin;
        this.logService.addLog("admin", `admin user updated - ${adminUser.id}`);
      } else {
        const emailValue: string = this.adminUserForm.get("email").value;
        const email = emailValue.toLowerCase().trim();
        adminUser = this.adminUserService.createAdminUserObject(name, email, admin);
        this.logService.addLog("admin", `admin user created - ${adminUser.id}`);
      }

      try {
        await this.adminUserService.addUpdateAdminUser(adminUser);
        const adminUserInfo = this.adminUserService.createAdminUserInfoObject(
          adminUser
        );
        await this.adminUserService.addUpdateAdminUserInfo(adminUserInfo);

        if (this.sendEmailToNewUser) {
          await this.emailToSendService.sendMailToNewAdminUser(adminUser);
        }
      } catch (error) {
        this.logService.addLog("error", error);
      } finally {
        this.dialogRef.close(adminUser);
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isEmailAlreadyInUse() {
    const email = (this.adminUserForm.get("email").value as string)
      .toLowerCase()
      .trim();

    for (const adminUser of this.data.adminUsers) {
      if (email === adminUser.email) {
        this.adminUserForm.get("email").setErrors({ emailExists: true });
        break;
      }
    }
  }

  getError() {
    if (this.adminUserForm.get("email").invalid) {
      if (this.adminUserForm.get("email").errors.required) {
        return "E-mail skal udfyldes";
      }

      if (this.adminUserForm.get("email").errors.email) {
        return "Ikke en gyldig e-mail adresse";
      }

      if (this.adminUserForm.get("email").errors.emailExists) {
        return "E-mail adresse er allerede i brug";
      }
    }
  }

  sendEmailStatus(event: MatCheckboxChange) {
    this.sendEmailToNewUser = event.checked;
  }
}
