import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-progressbar",
  templateUrl: "./progressbar.component.html",
  styleUrls: ["./progressbar.component.scss"],
})
export class ProgressbarComponent implements OnInit, OnDestroy {
  showProgressbar = false;
  showProgressbar$: Subscription;
  constructor(private progressbarService: ProgressbarService) {}

  ngOnInit(): void {
    this.showProgressbar$ = this.progressbarService.showProgressbar$.subscribe(
      (show) => {
        this.showProgressbar = show;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.showProgressbar$) {
      this.showProgressbar$.unsubscribe();
    }
  }
}
