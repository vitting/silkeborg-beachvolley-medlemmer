import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberDetailDialogComponent } from "./member-detail-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { MomentModule } from "ngx-moment";

@NgModule({
  declarations: [MemberDetailDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MomentModule,
    MatIconModule,
    MatSnackBarModule,
    ClipboardModule,
    MatCheckboxModule,
  ],
})
export class MemberDetailDialogModule {}
