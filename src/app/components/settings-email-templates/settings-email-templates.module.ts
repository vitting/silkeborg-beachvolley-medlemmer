import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsEmailTemplatesComponent } from "./settings-email-templates.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ShowEmailTemplateModule } from "../show-email-template/show-email-template.module";
import { SendEmailDialogModule } from "../send-email-dialog/send-email-dialog.module";
import { SettingsEmailTemplatesItemComponent } from "./settings-email-templates-item/settings-email-templates-item.component";
import { DeleteDialogModule } from "../delete-dialog/delete-dialog.module";

@NgModule({
  declarations: [
    SettingsEmailTemplatesComponent,
    SettingsEmailTemplatesItemComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    ShowEmailTemplateModule,
    SendEmailDialogModule,
    DeleteDialogModule,
  ],
  exports: [SettingsEmailTemplatesComponent],
})
export class SettingsEmailTemplatesModule {}
