import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeleteDialogComponent } from "./delete-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class DeleteDialogModule {}
