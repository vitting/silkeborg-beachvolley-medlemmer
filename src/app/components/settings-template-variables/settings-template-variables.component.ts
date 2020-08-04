import { Component, OnInit, Input } from "@angular/core";
import { TemplateVariable } from "src/models/template-variable";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { TemplateVariableService } from "src/app/services/template-variable.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { LogService } from "src/app/services/log.service";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { SettingsTemplateVariableDialogComponent } from "../settings-template-variable-dialog/settings-template-variable-dialog.component";

@Component({
  selector: "app-settings-email-template-variables",
  templateUrl: "./settings-template-variables.component.html",
  styleUrls: ["./settings-template-variables.component.scss"],
})
export class SettingsTemplateVariablesComponent implements OnInit {
  @Input() tempVars: TemplateVariable[] = [];
  constructor(
    private progressbarService: ProgressbarService,
    private emailTemplateVarService: TemplateVariableService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private logService: LogService
  ) {}

  ngOnInit(): void {}

  deleteTempVar(tempVar: TemplateVariable, index: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: "Slet skabelon variabel",
        text: "Er du sikker på du vil slette skabelon variablen?",
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.progressbarService.showProgressbar = true;

        try {
          await this.emailTemplateVarService.deleteTempVar(tempVar.id);
          this.tempVars.splice(index, 1);

          this.snackbar.open("Variablen er blevet slettet", null, {
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

  addEditTempVar(item: TemplateVariable, index: number = -1) {
    if (item === null) {
      item = {
        id: null,
        name: "",
        value: "",
        key: "",
      };
    }

    const dialogRef = this.dialog.open<
      SettingsTemplateVariableDialogComponent,
      TemplateVariable,
      TemplateVariable
    >(SettingsTemplateVariableDialogComponent, {
      width: "400px",
      disableClose: true,
      data: item,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let tempVar: TemplateVariable;
        if (result.id === null) {
          tempVar = this.emailTemplateVarService.createNewTempVarObject(
            result.name,
            result.value,
            result.key
          );
          this.tempVars.push(tempVar);
        } else {
          tempVar = result;
          this.tempVars[index] = tempVar;
        }

        this.saveTempVar(tempVar);
      }
    });
  }

  async saveTempVar(item: TemplateVariable) {
    try {
      this.progressbarService.showProgressbar = true;
      await this.emailTemplateVarService.addUpdateTempVar(item);
      this.emailTemplateVarService.addUpdateTempVarToIndex(item);
      this.snackbar.open("Variablen er blevet gemt", null, {
        duration: 1000,
      });
    } catch (error) {
      this.logService.addLog("error", error);
    } finally {
      this.progressbarService.showProgressbar = false;
    }
  }
}
