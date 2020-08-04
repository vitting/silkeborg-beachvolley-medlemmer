import { Component, OnInit } from "@angular/core";
import { TopbarService } from "src/app/services/topbar.service";
import { Contribution } from "src/models/contribution";
import { Team } from "src/models/team";
import { ActivatedRoute } from "@angular/router";
import { TemplateVariable } from "src/models/template-variable";
import { AdminUserService } from "src/app/services/admin-user.service";

interface ResolvedData {
  emailTempVars: TemplateVariable[];
  teams: Team[];
  contributions: Contribution[];
}

@Component({
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  paymentLines: Contribution[] = [];
  teams: Team[] = [];
  tempVars: TemplateVariable[] = [];
  isAdmin = false;
  constructor(
    private topbarService: TopbarService,
    private activatedRoute: ActivatedRoute,
    private adminUserService: AdminUserService
  ) {}

  ngOnInit(): void {
    this.topbarService.title = "Indstillinger";
    this.isAdmin = this.adminUserService.adminUser.admin;
    this.activatedRoute.data.subscribe((data: ResolvedData) => {
      this.teams = data.teams;
      this.paymentLines = data.contributions;
      this.tempVars = data.emailTempVars;
    });
  }
}
