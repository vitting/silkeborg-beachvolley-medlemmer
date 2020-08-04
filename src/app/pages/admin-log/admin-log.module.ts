import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminLogComponent } from "./admin-log.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MomentModule } from "ngx-moment";
import { LogDetailDialogModule } from "../../components/log-detail-dialog/log-detail-dialog.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [AdminLogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MomentModule,
    LogDetailDialogModule,
  ],
})
export class AdminLogModule {}
