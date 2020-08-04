import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { EmailLog } from "../../../models/email-log";
import { LogService, LogPaginationAction } from "src/app/services/log.service";
import { MatDialog } from "@angular/material/dialog";
import { EmaillogDetailDialogComponent } from "src/app/components/emaillog-detail-dialog/emaillog-detail-dialog.component";
import { Subscription } from "rxjs";
import { MatSort } from "@angular/material/sort";
import {
  MatPaginatorIntl,
  PageEvent,
  MatPaginator,
} from "@angular/material/paginator";
import { CounterService } from "src/app/services/counter.service";
import { Counter } from "src/models/counter";
@Component({
  templateUrl: "./admin-email-log.component.html",
  styleUrls: ["./admin-email-log.component.scss"],
})
export class AdminEmailLogComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  logSub: Subscription;
  logs: MatTableDataSource<EmailLog> = new MatTableDataSource();
  displayedColumns: string[] = ["sendtAt", "type", "status", "emails"];
  pageSize = 50;
  docTotal = 0;
  pageIndex = 0;
  firstElement: EmailLog;
  lastElement: EmailLog;
  showPaginationSpinner = false;
  constructor(
    private dialog: MatDialog,
    private logService: LogService,
    private paginatorService: MatPaginatorIntl,
    private counterService: CounterService
  ) {}

  ngOnInit(): void {
    this.paginatorService.itemsPerPageLabel = "Antal pr. side";
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
      .getEmailLogCounter()
      .toPromise();
    this.docTotal = counter?.value ?? 0;

    const logs = await this.logService
      .getEmailLogsPagination(limit, date, action)
      .toPromise();
    if (logs.length !== 0) {
      this.firstElement = logs[0];
      this.lastElement = logs[logs.length - 1];
    }

    this.logs.data = logs;
    this.logs.sort = this.sort;
  }

  rowClick(log: EmailLog) {
    this.dialog.open(EmaillogDetailDialogComponent, {
      width: "400px",
      disableClose: false,
      data: log,
    });
  }

  getRecipient(log: EmailLog) {}

  async paginationChange(page: PageEvent) {
    this.showPaginationSpinner = true;
    this.pageSize = page.pageSize;

    if (page.pageIndex === 0) {
      await this.loadLogs(this.pageSize, null, LogPaginationAction.initial);
    } else if (page.pageIndex > page.previousPageIndex) {
      const lastDate = this.lastElement?.sendtAt;
      await this.loadLogs(
        this.pageSize,
        lastDate,
        LogPaginationAction.nextPage
      );
    } else if (page.pageIndex < page.previousPageIndex) {
      const firstDate = this.firstElement?.sendtAt;
      await this.loadLogs(
        this.pageSize,
        firstDate,
        LogPaginationAction.prevPage
      );
    }

    this.showPaginationSpinner = false;
  }
}
