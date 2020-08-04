import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { NgForm, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TeamService } from "src/app/services/team.service";
import { NameValueExists } from "./settings-team-dialog.validator";

export interface SettingsTeamDialogData {
  id: string;
  name: string;
  value: string;
  active: boolean;
}

export interface SettingsTeamDialogResult {
  id: string;
  name: string;
  value: string;
  active: boolean;
}

@Component({
  templateUrl: "./settings-team-dialog.component.html",
  styleUrls: ["./settings-team-dialog.component.scss"],
})
export class SettingsTeamDialogComponent implements OnInit {
  @ViewChild("teamLineForm") teamLineFormElement: NgForm;
  private teamValues: string[] = [];
  title = "Opret hold";
  buttonTitle = "Opret";
  teamForm = this.fb.group({
    name: ["", [Validators.required, NameValueExists(this.teamValues)]],
    active: [true],
  });
  constructor(
    private dialogRef: MatDialogRef<
      SettingsTeamDialogComponent,
      SettingsTeamDialogResult
    >,
    @Inject(MAT_DIALOG_DATA) public data: SettingsTeamDialogData,
    private fb: FormBuilder,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.title = "Rediger hold";
      this.buttonTitle = "Gem";
    }

    this.teamForm.setValue({
      name: this.data.name,
      active: this.data.active,
    });

    for (const key in this.teamService.teamsIndex) {
      if (this.teamService.teamsIndex.hasOwnProperty(key)) {
        const team = this.teamService.teamsIndex[key];
        this.teamValues.push(team.value);
      }
    }
  }

  private parseName(value: string) {
    return value
      .toLowerCase()
      .replace(/\s/g, "")
      .replace("æ", "ae")
      .replace("å", "aa")
      .replace("ø", "oe");
  }

  getError(control: AbstractControl) {
    let errorText = "";
    if (control.hasError("required")) {
      errorText = "Navn skal udfyldes";
    } else if (control.hasError("valueExists")) {
      errorText = "Der eksistere allerede et hold med det navn";
    }

    return errorText;
  }

  onSubmit() {
    if (this.teamForm.valid) {
      const id = this.data.id;
      const name: string = this.teamForm.get("name").value;
      const active: boolean = this.teamForm.get("active").value;
      const value = this.parseName(name);
      this.dialogRef.close({
        id,
        name,
        value,
        active,
      });
    }
  }

  submitForm() {
    this.teamLineFormElement.ngSubmit.emit();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
