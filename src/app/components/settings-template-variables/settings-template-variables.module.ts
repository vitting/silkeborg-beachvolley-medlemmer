import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsTemplateVariablesComponent } from "./settings-template-variables.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DeleteDialogModule } from "../delete-dialog/delete-dialog.module";
import { SettingsTemplateVariableDialogModule } from "../settings-template-variable-dialog/settings-template-variable-dialog.module";

@NgModule({
  declarations: [SettingsTemplateVariablesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    DeleteDialogModule,
    SettingsTemplateVariableDialogModule,
  ],
  exports: [SettingsTemplateVariablesComponent],
})
export class SettingsTemplateVariablesModule {}
