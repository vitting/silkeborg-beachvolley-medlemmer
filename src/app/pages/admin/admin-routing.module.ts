import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminMembersComponent } from "../admin-members/admin-members.component";
import { SettingsComponent } from "../settings/settings.component";
import { AdminUsersComponent } from "../admin-users/admin-users.component";
import { AdminLoginComponent } from "../admin-login/admin-login.component";
import { TeamResolverService } from "src/app/resolvers/team-resolver.service";
import { TeamAllsodeletedResolverService } from "src/app/resolvers/team-allsodeleted-resolver.service";
import { EmailTemplateVariableResolverService } from "src/app/resolvers/email-template-variable-resolver.service";
import { ContributionResolverService } from "src/app/resolvers/contribution-resolver.service";
import { AdminUserInfoResolverService } from "src/app/resolvers/admin-user-info-resolver.service";
import { AdminAuthGuard } from "./admin-auth-guard";
import { AdminLogComponent } from "../admin-log/admin-log.component";
import { AdminEmailLogComponent } from "../admin-email-log/admin-email-log.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "medlemmer" },
      {
        path: "medlemmer",
        component: AdminMembersComponent,
        canActivate: [AdminAuthGuard],
        data: { adminAuthGuardLogPageVisit: true, onlyAdmin: false },
        resolve: {
          teams: TeamAllsodeletedResolverService,
          contributions: ContributionResolverService,
          adminUserInfos: AdminUserInfoResolverService
        },
      },
      {
        path: "indstillinger",
        component: SettingsComponent,
        canActivate: [AdminAuthGuard],
        data: { onlyAdmin: false },
        resolve: {
          teams: TeamResolverService,
          contributions: ContributionResolverService,
          emailTempVars: EmailTemplateVariableResolverService,
        },
      },
      {
        path: "log",
        component: AdminLogComponent,
        canActivate: [AdminAuthGuard],
        data: { onlyAdmin: true },
        resolve: {
          adminUserInfos: AdminUserInfoResolverService
        },
      },
      {
        path: "emaillog",
        component: AdminEmailLogComponent,
        canActivate: [AdminAuthGuard],
        data: { onlyAdmin: true },
      },
      {
        path: "brugere",
        component: AdminUsersComponent,
        canActivate: [AdminAuthGuard],
        data: { onlyAdmin: true },
      },
      {
        path: "login",
        component: AdminLoginComponent,
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "login",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AdminAuthGuard],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
