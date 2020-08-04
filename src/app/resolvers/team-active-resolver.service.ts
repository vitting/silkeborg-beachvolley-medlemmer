import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Team } from "src/models/team";
import { TeamService } from "../services/team.service";

@Injectable({
  providedIn: "root",
})
export class TeamActiveResolverService implements Resolve<Team[]> {
  constructor(private teamService: TeamService) {}
  resolve(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ): Team[] | import("rxjs").Observable<Team[]> | Promise<Team[]> {
    return new Promise((resolve, reject) => {
      this.teamService.getAllActiveTeams().subscribe(
        (teams) => {
          const teamsIndex: { [key: string]: Team } = {};
          for (const team of teams) {
            if (team.value === "default") {
              this.teamService.defaultTeam = team;
            }
            teamsIndex[team.id] = team;
          }

          this.teamService.teamsIndex = teamsIndex;

          return resolve(teams);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
