import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SettingsMemberMessageDialogComponent } from "../settings-member-message-dialog/settings-member-message-dialog.component";
import { Message, MessageLanguageType } from "src/models/message";
import { MessageService } from "src/app/services/message.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { LogService } from "src/app/services/log.service";

@Component({
  selector: "app-settings-member-message",
  templateUrl: "./settings-member-message.component.html",
  styleUrls: ["./settings-member-message.component.scss"],
})
export class SettingsMemberMessageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private progressbarService: ProgressbarService,
    private logService: LogService
  ) {}

  ngOnInit(): void {}

  async editMessage(language: MessageLanguageType) {
    const messages = await this.messageService
      .getMessageByTypeAndLanguage("newmembercompletion", language)
      .toPromise();
    let message: Message;
    if (messages.length !== 0) {
      message = messages[0];
    } else {
      message = this.messageService.createMessageObject("newmembercompletion", language, "");
    }

    const dialogRef = this.dialog.open<
      SettingsMemberMessageDialogComponent,
      Message,
      Message
    >(SettingsMemberMessageDialogComponent, {
      width: "400px",
      disableClose: true,
      data: message,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.progressbarService.showProgressbar = true;
        try {
          await this.messageService.addUpdateMessage(result);
          this.snackBar.open("Besked er blevet opdateret ", null, {
            duration: 1000,
          });
        } catch (error) {
          this.logService.addLog("error", error);
        } finally {
          this.progressbarService.showProgressbar = false;
        }
      }
    });
  }
}
