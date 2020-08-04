import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberAdminCommentDialogComponent } from "./member-admin-comment-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MomentModule } from "ngx-moment";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [MemberAdminCommentDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatTooltipModule,
    MomentModule,
  ],
})
export class MemberAdminCommentDialogModule {}
