import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberMenuComponent } from "./member-menu.component";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [MemberMenuComponent],
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
})
export class MemberMenuModule {}
