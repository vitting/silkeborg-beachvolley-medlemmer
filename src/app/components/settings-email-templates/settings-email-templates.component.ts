import { Component, OnInit } from "@angular/core";
import { LogService } from "src/app/services/log.service";
import { TemplateEmail } from "src/models/template-email";
import { ShowEmailTemplateComponent } from "../show-email-template/show-email-template.component";
import {
  SendEmailDialogComponent,
  SendEmailDialogConfig,
  SendEmailDialogResult,
} from "../send-email-dialog/send-email-dialog.component";
import { EmailTemplateService } from "src/app/services/email-template.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { SettingsEmailTemplatesDialogComponent } from "../settings-email-templates-dialog/settings-email-templates-dialog.component";
import {
  DeleteDialogComponent,
  DeleteDialogConfig,
} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: "app-settings-email-templates",
  templateUrl: "./settings-email-templates.component.html",
  styleUrls: ["./settings-email-templates.component.scss"],
})
export class SettingsEmailTemplatesComponent implements OnInit {
  emailTemplates: TemplateEmail[] = [];
  constructor(
    private logService: LogService,
    private emailTemplateService: EmailTemplateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private progressbarService: ProgressbarService
  ) {}

  ngOnInit(): void {
    this.loadEmailTemplates();
  }

  private loadEmailTemplates() {
    this.emailTemplateService
      .getAllEmailTemplates()
      .subscribe((emailTemplates) => {
        this.emailTemplates = emailTemplates;
      });
  }

  showEmailTemaplteAddEditDialog(emailTemplate: TemplateEmail) {
    try {
      const dialogRef = this.dialog.open(
        SettingsEmailTemplatesDialogComponent,
        {
          width: "400px",
          disableClose: false,
          data: emailTemplate,
        }
      );
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          let snackbarText = "Skabelon er opdateret";
          await this.emailTemplateService.addUpdateEmailTemplate(result);

          if (!emailTemplate) {
            snackbarText = "Skabelon er oprettet";
            this.emailTemplates.push(result);
          }

          this.snackbar.open(snackbarText, null, {
            duration: 1000,
          });
        }
      });
    } catch (error) {
      this.logService.addLog("error", error);
    }
  }

  async deleteTemplate(emailTemplate: TemplateEmail, index: number) {
    try {
      const dialogRef = this.dialog.open<
        DeleteDialogComponent,
        DeleteDialogConfig,
        boolean
      >(DeleteDialogComponent, {
        data: {
          text: "Vil du slette skabelonen?",
          title: "Slet skabelon",
        },
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          await this.emailTemplateService.deleteEmailTemplate(emailTemplate.id);
          this.emailTemplates.splice(index, 1);
          this.snackbar.open("Skabelonen er blevet slettet", null, {
            duration: 1000,
          });
        }
      });
    } catch (error) {
      this.logService.addLog("error", error);
    }
  }

  async showEmailText(emailTemplate: TemplateEmail) {
    try {
      this.dialog.open(ShowEmailTemplateComponent, {
        width: "500px",
        disableClose: false,
        data: this.emailTemplateService.parseEmailTemplateText(emailTemplate),
      });
    } catch (error) {
      this.logService.addLog("error", error);
    }
  }

  async editEmailText(emailTemplate: TemplateEmail) {
    try {
      this.showEditEmailTextDialog(emailTemplate);
    } catch (error) {
      this.logService.addLog("error", error);
    }
  }

  private showEditEmailTextDialog(emailTemplate: TemplateEmail) {
    const dialogRef = this.dialog.open<
      SendEmailDialogComponent,
      SendEmailDialogConfig,
      SendEmailDialogResult
    >(SendEmailDialogComponent, {
      width: "500px",
      disableClose: true,
      data: {
        type: "template",
        emailTemplate
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        if (result.emailTemplate) {
          this.progressbarService.showProgressbar = true;

          try {
            await this.emailTemplateService.addUpdateEmailTemplate(
              result.emailTemplate
            );

            this.snackbar.open(
              "Skabelon er gemt og instillinger er opdateret",
              null,
              {
                duration: 1000,
              }
            );
          } catch (error) {
            this.logService.addLog("error", error);
          } finally {
            this.progressbarService.showProgressbar = false;
          }
        }
      }
    });
  }
}
