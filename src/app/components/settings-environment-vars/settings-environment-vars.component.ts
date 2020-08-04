import { Component, OnInit } from "@angular/core";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { AdminFirebaseFunctionsService } from "src/app/services/admin-firebase-functions.service";
import { LogService } from "src/app/services/log.service";
import { EnvironmentVars } from "src/interfaces/environment-vars";

@Component({
  selector: "app-settings-environment-vars",
  templateUrl: "./settings-environment-vars.component.html",
  styleUrls: ["./settings-environment-vars.component.scss"],
})
export class SettingsEnvironmentVarsComponent implements OnInit {
  environmentVarsForFunctions: EnvironmentVars;
  constructor(
    private progressbarService: ProgressbarService,
    private adminFirebaseFunctionsService: AdminFirebaseFunctionsService,
    private logService: LogService
  ) {}

  ngOnInit(): void {}

  async getEnvironmentVarsForFunctions() {
    this.progressbarService.showProgressbar = true;
    try {
      this.environmentVarsForFunctions = await this.adminFirebaseFunctionsService.getEnvironmentVars();
    } catch (error) {
      this.logService.addLog("error", error);
    } finally {
      this.progressbarService.showProgressbar = false;
    }
  }
}
