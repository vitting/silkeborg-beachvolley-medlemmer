import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UtilityService } from "./utility.service";
import { Contribution, ContributionIndex } from "src/models/contribution";
import { first, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { LogService } from "./log.service";

@Injectable({
  providedIn: "root",
})
export class ContributionService {
  private contributionsCollection = "contributions";
  private index: ContributionIndex = {};
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService,
    private logService: LogService
  ) {}

  get contributionsIndex() {
    return this.index;
  }

  set contributionsIndex(index: ContributionIndex) {
    this.index = index;
  }

  getContribution(year: number, teamId: string) {
    let contribution: Contribution = null;

    if (this.contributionsIndex) {
      contribution = this.contributionsIndex[`${year}_${teamId}`];
    }
    return contribution;
  }

  createContributionObject(
    year: number,
    amount: number,
    teamId: string
  ): Contribution {
    const id = this.utilityService.newId;
    return {
      id,
      amount,
      year,
      teamId,
    };
  }

  addUpdateContribution(contribution: Contribution) {
    return this.db
      .collection<Contribution>(this.contributionsCollection)
      .doc(contribution.id)
      .set(contribution);
  }

  deleteContribution(id: string) {
    return this.db
      .collection<Contribution>(this.contributionsCollection)
      .doc(id)
      .delete();
  }

  getAllContributions() {
    return this.db
      .collection<Contribution>(this.contributionsCollection)
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
}
