import { Component, OnInit, Input } from "@angular/core";
import { LogService } from "src/app/services/log.service";
import { ContributionService } from "src/app/services/contribution.service";
import { Contribution } from "src/models/contribution";
import {
  SettingsPaymentYearDialogComponent,
  SettingsPaymentYearDialogData,
  SettingsPaymentYearDialogResult,
} from "../settings-payment-year-dialog/settings-payment-year-dialog.component";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Team } from "src/models/team";
import { TeamService } from "src/app/services/team.service";
import { UtilityService } from "src/app/services/utility.service";

@Component({
  selector: "app-settings-payments",
  templateUrl: "./settings-payments.component.html",
  styleUrls: ["./settings-payments.component.scss"],
})
export class SettingsPaymentsComponent implements OnInit {
  @Input() paymentLines: Contribution[] = [];
  @Input() teams: Team[] = [];
  constructor(
    private logService: LogService,
    private contributionService: ContributionService,
    private dialog: MatDialog,
    private progressbarService: ProgressbarService,
    private snackbar: MatSnackBar,
    private teamService: TeamService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {}

  addEditPayment(item: Contribution, index: number = -1) {
    if (item === null) {
      item = {
        amount: 0,
        teamId: this.teamService.defaultTeam?.id,
        year: this.utilityService.currentYear,
        id: null,
      };
    }

    const dialogRef = this.dialog.open<
      SettingsPaymentYearDialogComponent,
      SettingsPaymentYearDialogData,
      SettingsPaymentYearDialogResult
    >(SettingsPaymentYearDialogComponent, {
      width: "400px",
      disableClose: true,
      data: {
        ...item,
        teams: this.teams,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let contribution: Contribution;
        if (result.id === null) {
          if (!this.checkIfContributionExists(result)) {
            contribution = this.contributionService.createContributionObject(
              result.year,
              result.amount,
              result.teamId
            );
            this.paymentLines.push(contribution);
            this.sortContributionLines();
            this.saveContribution(contribution);
          } else {
            this.snackbar.open(
              "Kontingent kunne ikke oprettes da der findes et eksisterende kontigent med kombinationen af hold og år",
              null,
              { duration: 6000 }
            );
          }
        } else {
          contribution = result as Contribution;
          this.paymentLines[index] = contribution;
          this.saveContribution(contribution);
        }
      }
    });
  }

  deletePayment(contribution: Contribution, index: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: "Slet kontingent",
        text: "Er du sikker på du vil slette kontingent?",
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.progressbarService.showProgressbar = true;

        try {
          await this.contributionService.deleteContribution(contribution.id);

          this.paymentLines.splice(index, 1);

          this.snackbar.open("Kontingent er blevet slettet", null, {
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

  getTeamName(teamId: string) {
    return this.teamService.teamsIndex[teamId]?.name;
  }

  getIsDefaultTeam(contribution: Contribution) {
    if (
      this.teamService.teamsIndex[contribution.teamId]?.value === "default" &&
      contribution.year === this.utilityService.currentYear
    ) {
      return true;
    }

    return false;
  }

  async saveContribution(contribution: Contribution) {
    this.progressbarService.showProgressbar = true;

    try {
      await this.contributionService.addUpdateContribution(contribution);

      this.snackbar.open("Kontingentet er blevet gemt", null, {
        duration: 1000,
      });
    } catch (error) {
      this.logService.addLog("error", error);
    } finally {
      this.progressbarService.showProgressbar = false;
    }
  }

  private sortContributionLines() {
    this.paymentLines.sort((a, b) => {
      if (a.year > b.year) {
        return 1;
      }

      if (a.year < b.year) {
        return -1;
      }
      return 0;
    });
  }

  private checkIfContributionExists(data: Contribution): boolean {
    let returnValue = false;
    for (const item of this.paymentLines) {
      if (item.teamId === data.teamId && item.year === data.year) {
        returnValue = true;
        break;
      }
    }

    return returnValue;
  }
}
