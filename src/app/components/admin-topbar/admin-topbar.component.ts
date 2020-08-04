import { Component, OnInit } from "@angular/core";
import { User } from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { TopbarService } from "src/app/services/topbar.service";
import { AdminUserService } from "src/app/services/admin-user.service";
import { LogService } from "src/app/services/log.service";
import { AngularFireAnalytics } from "@angular/fire/analytics";

@Component({
  selector: "app-admin-topbar",
  templateUrl: "./admin-topbar.component.html",
  styleUrls: ["./admin-topbar.component.scss"],
})
export class AdminTopbarComponent implements OnInit {
  user: User = null;
  title = "";
  imageSrc = "";
  isAdmin = false;
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private topbarService: TopbarService,
    private adminUserService: AdminUserService,
    private logService: LogService,
    private analytics: AngularFireAnalytics
  ) {}

  ngOnInit(): void {
    this.topbarService.topbarTitle$.subscribe((title) => {
      this.title = title;
    });

    this.fireAuth.user.subscribe(async (user) => {
      this.user = user;
      this.adminUserService.currentUser = user;
      this.imageSrc = user?.photoURL;
    });

    if (this.adminUserService.adminUser) {
      this.isAdmin = this.adminUserService.adminUser.admin;
    }
  }

  async logout() {
    this.topbarService.title = "";
    try {
      await this.logService.addLog("admin", "logout");
      await this.fireAuth.signOut();
      this.adminUserService.adminUser = null;
      this.router.navigateByUrl("/admin/login");
    } catch (error) {
      this.logService.addLog("error", error);
    }
  }

  imageError() {
    this.imageSrc = "assets/images/no-pic.png";
  }
}
