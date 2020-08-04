import { Component, OnInit, ViewChild } from "@angular/core";
import { Log } from "src/models/log";
import { MatTableDataSource } from "@angular/material/table";
import { LogService, LogPaginationAction } from "src/app/services/log.service";
import { AdminUserService } from "src/app/services/admin-user.service";
import { CounterService } from "src/app/services/counter.service";
import { LogDetailDialogComponent } from "src/app/components/log-detail-dialog/log-detail-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import {
  MatPaginatorIntl,
  PageEvent,
  MatPaginator,
} from "@angular/material/paginator";
import { Counter } from "src/models/counter";

@Component({
  templateUrl: "./admin-log.component.html",
  styleUrls: ["./admin-log.component.scss"],
})
export class AdminLogComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  logs: MatTableDataSource<Log> = new MatTableDataSource();
  displayedColumns: string[] = ["date", "type", "message", "userId"];
  pageSize = 50;
  docTotal = 0;
  pageIndex = 0;
  firstElement: Log;
  lastElement: Log;
  showPaginationSpinner = false;
  constructor(
    private logService: LogService,
    private adminUserService: AdminUserService,
    private dialog: MatDialog,
    private paginatorService: MatPaginatorIntl,
    private counterService: CounterService
  ) {}

  ngOnInit(): void {
    this.paginatorService.itemsPerPageLabel = "Vis pr. side";
    this.paginator.initialized.subscribe(async () => {
      await this.loadLogs(this.pageSize, null, LogPaginationAction.initial);
    });
  }

  private async loadLogs(
    limit: number,
    date: firebase.firestore.Timestamp,
    action: LogPaginationAction
  ) {
    const counter: Counter = await this.counterService
      .getLogCounter()
      .toPromise();
    this.docTotal = counter?.value ?? 0;

    const logs = await this.logService
      .getLogsPagination(limit, date, action)
      .toPromise();
    if (logs.length !== 0) {
      this.firstElement = logs[0];
      this.lastElement = logs[logs.length - 1];
    }

    this.logs.data = logs;
    this.logs.sort = this.sort;
  }

  rowClick(log: Log) {
    this.dialog.open(LogDetailDialogComponent, {
      width: "400px",
      disableClose: false,
      data: log,
    });
  }

  getAdminUser(log: Log) {
    return this.adminUserService.adminUserInfosIndex[log.userId]?.name ?? "";
  }

  async paginationChange(page: PageEvent) {
    this.showPaginationSpinner = true;
    this.pageSize = page.pageSize;

    if (page.pageIndex === 0) {
      await this.loadLogs(this.pageSize, null, LogPaginationAction.initial);
    } else if (page.pageIndex > page.previousPageIndex) {
      const lastDate = this.lastElement?.date;
      await this.loadLogs(
        this.pageSize,
        lastDate,
        LogPaginationAction.nextPage
      );
    } else if (page.pageIndex < page.previousPageIndex) {
      const firstDate = this.firstElement?.date;
      await this.loadLogs(
        this.pageSize,
        firstDate,
        LogPaginationAction.prevPage
      );
    }

    this.showPaginationSpinner = false;
  }
}
