import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UtilityService } from "./utility.service";
import { Team, TeamIndex } from "src/models/team";
import { first, catchError } from "rxjs/operators";
import { LogService } from "./log.service";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  private teamscollection = "teams";
  private index: TeamIndex;
  private defaultTeamItem: Team;
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService,
    private logService: LogService
  ) {}

  get defaultTeam() {
    return this.defaultTeamItem;
  }

  set defaultTeam(team: Team) {
    this.defaultTeamItem = team;
  }

  get teamsIndex() {
    return this.index;
  }

  set teamsIndex(index: TeamIndex) {
    this.index = index;
  }

  createTeamObject(name: string, value: string, active: boolean): Team {
    const id = this.utilityService.newId;
    return {
      id,
      active,
      name,
      value,
      deleted: false,
    };
  }

  addUpdateTeam(team: Team) {
    return this.db
      .collection<Team>(this.teamscollection)
      .doc(team.id)
      .set(team);
  }

  getAllTeamsAlsoDeleted() {
    return this.db
      .collection<Team>(this.teamscollection, (ref) => {
        return ref.orderBy("name");
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of([]);
        }),
        first()
      );
  }

  getAllTeams() {
    return this.db
      .collection<Team>(this.teamscollection, (ref) => {
        return ref.where("deleted", "==", false).orderBy("name");
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of([]);
        }),
        first<Team[]>()
      );
  }

  getAllActiveTeams() {
    return this.db
      .collection<Team>(this.teamscollection, (ref) => {
        return ref.where("active", "==", true).orderBy("name");
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of([]);
        }),
        first()
      );
  }

  deleteTeam(id: string) {
    return this.db
      .collection<Team>(this.teamscollection)
      .doc(id)
      .update({ deleted: true, active: false });
  }
}
