import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberSelectDialogComponent } from "./member-select-dialog.component";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [MemberSelectDialogComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    ClipboardModule
  ],
  providers: [],
})
export class MemberSelectDialogModule {}
