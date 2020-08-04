import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsPaymentsComponent } from "./settings-payments.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SettingsPaymentYearDialogModule } from "../settings-payment-year-dialog/settings-payment-year-dialog.module";
import { DeleteDialogModule } from "../delete-dialog/delete-dialog.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [SettingsPaymentsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    SettingsPaymentYearDialogModule,
    DeleteDialogModule,
  ],
  exports: [SettingsPaymentsComponent]
})
export class SettingsPaymentsModule {}
