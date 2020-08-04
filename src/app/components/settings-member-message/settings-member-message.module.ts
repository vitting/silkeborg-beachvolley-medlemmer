import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsMemberMessageComponent } from "src/app/components/settings-member-message/settings-member-message.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DeleteDialogModule } from "../delete-dialog/delete-dialog.module";
import { SettingsMemberMessageDialogModule } from '../settings-member-message-dialog/settings-member-message-dialog.module';

@NgModule({
  declarations: [SettingsMemberMessageComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    DeleteDialogModule,
    SettingsMemberMessageDialogModule,
  ],
  exports: [SettingsMemberMessageComponent],
})
export class SettingsMemberMessageModule {}
