import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsEmailTemplatesDialogComponent } from "./settings-email-templates-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [SettingsEmailTemplatesDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class SettingsEmailTemplatesDialogModule {}
