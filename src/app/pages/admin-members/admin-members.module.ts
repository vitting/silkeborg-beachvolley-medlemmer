import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminMembersComponent } from "./admin-members.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MemberDetailDialogModule } from "src/app/components/member-detail-dialog/member-detail-dialog.module";
import { MomentModule } from "ngx-moment";
import { MemberMenuModule } from "../../components/member-menu/member-menu.module";
import { MemberEditDialogModule } from "../../components/member-edit-dialog/member-edit-dialog.module";
import { MemberContributionsDialogModule } from "../../components/member-contributions-dialog/member-contributions-dialog.module";
import { MemberStatisticsDialogModule } from "../../components/member-statistics-dialog/member-statistics-dialog.module";
import { MemberAdminCommentDialogModule } from "../../components/member-admin-comment-dialog/member-admin-comment-dialog.module";
import { SendEmailDialogModule } from "../../components/send-email-dialog/send-email-dialog.module";
import {
  ORIGIN,
  REGION,
  AngularFireFunctionsModule,
} from "@angular/fire/functions";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MemberSelectDialogModule } from "../../components/member-select-dialog/member-select-dialog.module";

@NgModule({
  declarations: [AdminMembersComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatTooltipModule,
    MatMenuModule,
    MatRadioModule,
    MatToolbarModule,
    MomentModule,
    AngularFireFunctionsModule,
    MemberDetailDialogModule,
    MemberMenuModule,
    MemberEditDialogModule,
    MemberContributionsDialogModule,
    MemberStatisticsDialogModule,
    MemberAdminCommentDialogModule,
    SendEmailDialogModule,
    MemberSelectDialogModule
  ],
  providers: [
    { provide: ORIGIN, useValue: "http://localhost:5001" },
    // providers: [{ provide: REGION, useValue: "europe-west" }]
  ],
})
export class AdminMembersModule {}
