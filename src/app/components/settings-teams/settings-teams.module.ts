import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsTeamsComponent } from "./settings-teams.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DeleteDialogModule } from "../delete-dialog/delete-dialog.module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SettingsTeamDialogModule } from "../settings-team-dialog/settings-team-dialog.module";

@NgModule({
  declarations: [SettingsTeamsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    DeleteDialogModule,
    SettingsTeamDialogModule
  ],
  exports: [SettingsTeamsComponent]
})
export class SettingsTeamsModule {}
