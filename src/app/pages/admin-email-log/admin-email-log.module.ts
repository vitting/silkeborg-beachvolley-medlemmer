import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminEmailLogComponent } from "./admin-email-log.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MomentModule } from "ngx-moment";
import { EmaillogDetailDialogModule } from "../../components/emaillog-detail-dialog/emaillog-detail-dialog.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [AdminEmailLogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MomentModule,
    EmaillogDetailDialogModule,
  ],
})
export class AdminEmailLogModule {}
