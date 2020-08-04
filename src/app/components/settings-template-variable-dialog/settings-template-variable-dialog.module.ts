import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsTemplateVariableDialogComponent } from "./settings-template-variable-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { SettingsTemplateVariableDialogValidatorService } from "./settings-template-variable-dialog.validator.service";

@NgModule({
  declarations: [SettingsTemplateVariableDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [SettingsTemplateVariableDialogValidatorService]
})
export class SettingsTemplateVariableDialogModule {}
