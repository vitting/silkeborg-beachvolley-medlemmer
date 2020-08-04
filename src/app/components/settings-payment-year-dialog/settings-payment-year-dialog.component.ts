import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { NgForm, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Team } from "src/models/team";

export interface SettingsPaymentYearDialogData {
  id: string;
  year: number;
  amount: number;
  teamId: string;
  teams: Team[];
}

export interface SettingsPaymentYearDialogResult {
  id: string;
  year: number;
  amount: number;
  teamId: string;
}

@Component({
  templateUrl: "./settings-payment-year-dialog.component.html",
  styleUrls: ["./settings-payment-year-dialog.component.scss"],
})
export class SettingsPaymentYearDialogComponent implements OnInit {
  @ViewChild("paymentLineForm") paymentLineFormElement: NgForm;
  title = "Opret kontingent";
  buttonTitle = "Opret";
  showTeamSelect = true;
  paymentForm = this.fb.group({
    team: ["", [Validators.required]],
    year: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    amount: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
  });
  teams: Team[] = [];
  constructor(
    private dialogRef: MatDialogRef<
      SettingsPaymentYearDialogComponent,
      SettingsPaymentYearDialogResult
    >,
    @Inject(MAT_DIALOG_DATA) public data: SettingsPaymentYearDialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.title = "Rediger kontingent";
      this.buttonTitle = "Gem";
    }

    this.paymentForm.setValue({
      team: this.data.teamId,
      year: this.data.year,
      amount: this.data.amount,
    });

    this.teams = this.data.teams;

    if (this.teams.length === 1) {
      this.paymentForm.get("team").disable();
    }
  }

  getError(controlName: string, name: string) {
    if (this.paymentForm.get(controlName).hasError("required")) {
      return `${name} skal udfyldes`;
    }

    if (this.paymentForm.get(controlName).hasError("pattern")) {
      return `${name} er ikke et gyldgt tal`;
    }
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const id = this.data.id;
      const teamId: string = this.paymentForm.get("team").value;
      const year: number = this.paymentForm.get("year").value;
      const amount: number = this.paymentForm.get("amount").value;

      this.dialogRef.close({
        id,
        teamId,
        year,
        amount,
      });
    }
  }

  submitForm() {
    this.paymentLineFormElement.ngSubmit.emit();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
