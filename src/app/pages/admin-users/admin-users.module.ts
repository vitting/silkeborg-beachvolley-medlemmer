import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminUsersComponent } from "./admin-users.component";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AdminUserEditDialogModule } from "../../components/admin-user-edit-dialog/admin-user-edit-dialog.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MomentModule } from "ngx-moment";

@NgModule({
  declarations: [AdminUsersComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    AdminUserEditDialogModule,
    MomentModule
  ],
})
export class AdminUsersModule {}
