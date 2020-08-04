import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Contribution, ContributionIndex } from "src/models/contribution";
import { ContributionService } from "../services/contribution.service";

@Injectable({
  providedIn: "root",
})
export class ContributionResolverService implements Resolve<Contribution[]> {
  constructor(private contributionService: ContributionService) {}
  resolve(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):
    | Contribution[]
    | import("rxjs").Observable<Contribution[]>
    | Promise<Contribution[]> {
    return new Promise((resolve, reject) => {
      this.contributionService.getAllContributions().subscribe((contributions) => {
        const contributionsIndex: ContributionIndex = {};
        for (const contribution of contributions) {
          contributionsIndex[
            `${contribution.year}_${contribution.teamId}`
          ] = contribution;
        }

        this.contributionService.contributionsIndex = contributionsIndex;

        return resolve(contributions);
      }, (error) => {
        reject(error);
      });
    });
  }
}
