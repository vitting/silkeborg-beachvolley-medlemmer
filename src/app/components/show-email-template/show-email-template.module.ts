import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShowEmailTemplateComponent } from "./show-email-template.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [ShowEmailTemplateComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class ShowEmailTemplateModule {}
