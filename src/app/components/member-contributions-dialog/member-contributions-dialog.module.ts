import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberContributionsDialogComponent } from "./member-contributions-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [MemberContributionsDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule
  ],
})
export class MemberContributionsDialogModule {}
