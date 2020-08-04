import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DeleteDialogConfig {
  title: string;
  text: string;
}

@Component({
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.scss"],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogConfig
  ) {}

  ngOnInit(): void {}
}
