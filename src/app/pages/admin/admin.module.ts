import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { AdminMembersModule } from "../admin-members/admin-members.module";
import { AdminUsersModule } from "../admin-users/admin-users.module";
import { AdminLoginModule } from "../admin-login/admin-login.module";
import { AdminTopbarModule } from "../../components/admin-topbar/admin-topbar.module";
import { AdminLogModule } from '../admin-log/admin-log.module';
import { AdminEmailLogModule } from '../admin-email-log/admin-email-log.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminMembersModule,
    AdminUsersModule,
    AdminLoginModule,
    AdminTopbarModule,
    AdminLogModule,
    AdminEmailLogModule
  ]
})
export class AdminModule {}
