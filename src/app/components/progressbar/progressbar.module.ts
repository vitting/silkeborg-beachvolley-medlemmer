import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarComponent } from "./progressbar.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [ProgressbarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [ProgressbarComponent],
})
export class ProgressbarModule {}
