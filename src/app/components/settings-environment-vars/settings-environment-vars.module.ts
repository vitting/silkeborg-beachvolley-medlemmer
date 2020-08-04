import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsEnvironmentVarsComponent } from "./settings-environment-vars.component";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [SettingsEnvironmentVarsComponent],
  imports: [CommonModule, MatIconModule, MatSlideToggleModule, MatButtonModule],
  exports: [SettingsEnvironmentVarsComponent],
})
export class SettingsEnvironmentVarsModule {}
