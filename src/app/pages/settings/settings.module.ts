import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SettingsComponent } from "./settings.component";
import { FormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";

import { SettingsPaymentsModule } from "../../components/settings-payments/settings-payments.module";
import { SettingsTeamsModule } from "../../components/settings-teams/settings-teams.module";
import { SettingsEmailTemplatesModule } from "../../components/settings-email-templates/settings-email-templates.module";
import { SettingsEnvironmentVarsModule } from "../../components/settings-environment-vars/settings-environment-vars.module";
// tslint:disable-next-line: max-line-length
import { SettingsEmailTemplatesDialogModule } from "../../components/settings-email-templates-dialog/settings-email-templates-dialog.module";
// tslint:disable-next-line: max-line-length
import { SettingsTemplateVariablesModule } from "../../components/settings-template-variables/settings-template-variables.module";
import { MatCardModule } from "@angular/material/card";
import { SettingsMemberMessageModule } from "src/app/components/settings-member-message/settings-member-message.module";

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCardModule,
    SettingsPaymentsModule,
    SettingsTeamsModule,
    SettingsEmailTemplatesModule,
    SettingsEnvironmentVarsModule,
    SettingsEmailTemplatesDialogModule,
    SettingsTemplateVariablesModule,
    SettingsMemberMessageModule,
  ],
})
export class SettingsModule {}
