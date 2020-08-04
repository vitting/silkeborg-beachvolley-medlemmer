import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MembershipComponent } from "./membership.component";
import { TeamActiveResolverService } from "src/app/resolvers/team-active-resolver.service";
import { ContributionResolverService } from "src/app/resolvers/contribution-resolver.service";

const routes: Routes = [
  {
    path: "indmeldelse",
    component: MembershipComponent,
    resolve: {
      teams: TeamActiveResolverService,
      contributions: ContributionResolverService
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipRoutingModule {}
