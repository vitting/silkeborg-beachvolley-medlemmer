import { Component, OnInit, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TeamService } from "src/app/services/team.service";
import { MatDialog } from "@angular/material/dialog";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { Team } from "src/models/team";
import { LogService } from "src/app/services/log.service";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import {
  SettingsTeamDialogComponent,
  SettingsTeamDialogData,
  SettingsTeamDialogResult,
} from "../settings-team-dialog/settings-team-dialog.component";

@Component({
  selector: "app-settings-teams",
  templateUrl: "./settings-teams.component.html",
  styleUrls: ["./settings-teams.component.scss"],
})
export class SettingsTeamsComponent implements OnInit {
  @Input() teams: Team[] = [];
  constructor(
    private progressbarService: ProgressbarService,
    private teamService: TeamService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private logService: LogService
  ) {}

  ngOnInit(): void {}

  deleteTeam(team: Team, index: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: "Slet hold",
        text: "Er du sikker på du vil slette holdet?",
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.progressbarService.showProgressbar = true;

        try {
          await this.teamService.deleteTeam(team.id);
          this.teams.splice(index, 1);

          this.snackbar.open("Holdet er blevet slettet", null, {
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

  addEditTeam(item: Team, index: number = -1) {
    if (item === null) {
      item = {
        id: null,
        active: true,
        name: "",
        value: "",
        deleted: false,
      };
    }

    const dialogRef = this.dialog.open<
      SettingsTeamDialogComponent,
      SettingsTeamDialogData,
      SettingsTeamDialogResult
    >(SettingsTeamDialogComponent, {
      width: "400px",
      disableClose: true,
      data: {
        ...item,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let team: Team;
        if (result.id === null) {
          team = this.teamService.createTeamObject(
            result.name,
            result.value,
            result.active
          );
          this.teams.push(team);
          this.sortTeams();
        } else {
          team = result as Team;
          team.deleted = false;
          this.teams[index] = team;
        }

        this.saveTeam(team);
      }
    });
  }

  private sortTeams() {
    this.teams.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  async saveTeam(team: Team) {
    this.progressbarService.showProgressbar = true;

    try {
      await this.teamService.addUpdateTeam(team);
      this.teamService.teamsIndex[team.id] = team;
      this.snackbar.open("Holdet er blevet gemt", null, {
        duration: 1000,
      });
    } catch (error) {
      this.logService.addLog("error", error);
    } finally {
      this.progressbarService.showProgressbar = false;
    }
  }
}
