import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminTopbarComponent } from "./admin-topbar.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { ProgressbarModule } from "../progressbar/progressbar.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AdminTopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    ProgressbarModule
  ],
  exports: [AdminTopbarComponent]
})
export class AdminTopbarModule {}
