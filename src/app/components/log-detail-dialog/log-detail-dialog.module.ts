import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LogDetailDialogComponent } from "./log-detail-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MomentModule } from "ngx-moment";

@NgModule({
  declarations: [LogDetailDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MomentModule,
  ],
})
export class LogDetailDialogModule {}
