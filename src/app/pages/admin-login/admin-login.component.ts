import { Component, OnInit } from "@angular/core";
import { TopbarService } from "src/app/services/topbar.service";
import { AdminUserService } from "src/app/services/admin-user.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { adminLoginAnim } from "./admin-login.animation";
import { LogService } from "src/app/services/log.service";

@Component({
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
  animations: adminLoginAnim,
})
export class AdminLoginComponent implements OnInit {
  loginErrorState = "hide";
  loginSuccessState = "hide";
  loginButtonState = "hide";
  private userNotAuth = false;
  constructor(
    private topbarService: TopbarService,
    private adminUserService: AdminUserService,
    private progressbarService: ProgressbarService,
    private logService: LogService,
    public fireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.topbarService.title = "";

    this.fireAuth.user.subscribe(async (user) => {
      if (user) {
        const adminUsers = await this.adminUserService
          .getAdminUserByEmail(user.email)
          .toPromise();
        if (adminUsers.length !== 0) {
          this.setLoggedIn();
        } else {
          this.setLoginError();
        }
      } else {
        if (this.userNotAuth) {
          this.setLoginError();
        } else {
          this.setLogin();
        }
      }
    });
  }

  async login() {
    try {
      const user = await this.fireAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );

      this.progressbarService.showProgressbar = true;

      const userLocal = await this.adminUserService
        .getAdminUserByEmail(user.user.email)
        .toPromise();

      if (userLocal.length !== 0) {
        this.userNotAuth = false;
        this.adminUserService.adminUser = userLocal[0];

        if (userLocal[0].gmailUid === null) {
          await this.adminUserService.updateUserOnFirstLogin(
            userLocal[0].id,
            user.user.displayName,
            user.user.uid
          );
          await this.logService.addLog(
            "admin",
            "login authorized (first login)"
          );
        } else {
          await this.logService.addLog("admin", "login authorized");
        }
      } else {
        this.userNotAuth = true;
        await this.logService.addLog(
          "admin",
          `login unauthorized - ${user.user.displayName} / ${user.user.email}`
        );
        await user.user.delete();
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.progressbarService.showProgressbar = false;
    }
  }

  private setLogin() {
    this.loginSuccessState = "hide";
    this.loginErrorState = "hide";
    this.loginButtonState = "show";
  }

  private setLoginError() {
    this.loginSuccessState = "hide";
    this.loginErrorState = "show";
    this.loginButtonState = "show";
  }

  private setLoggedIn() {
    this.loginErrorState = "hide";
    this.loginSuccessState = "show";
    this.loginButtonState = "hide";
  }
}
