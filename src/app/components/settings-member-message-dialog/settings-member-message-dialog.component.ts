import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { Message } from "src/models/message";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, NgForm } from "@angular/forms";
import { UtilityService } from "src/app/services/utility.service";

@Component({
  templateUrl: "./settings-member-message-dialog.component.html",
  styleUrls: ["./settings-member-message-dialog.component.scss"],
})
export class SettingsMemberMessageDialogComponent implements OnInit {
  @ViewChild("messageLineForm") messageLineFormElement: NgForm;
  editorConfig = this.utilityService.angularEditorStandardConfig;
  messageForm = this.fb.group({
    message: [""],
  });
  constructor(
    private dialogRef: MatDialogRef<
      SettingsMemberMessageDialogComponent,
      Message
    >,
    @Inject(MAT_DIALOG_DATA) public data: Message,
    private fb: FormBuilder,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.messageForm.setValue({ message: this.data.text });
    }
  }

  onSubmit() {
    const text = this.messageForm.get("message").value;
    const message = this.data;
    message.text = text;
    this.dialogRef.close(message);
  }

  submitForm() {
    this.messageLineFormElement.ngSubmit.emit();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
