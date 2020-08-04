import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  templateUrl: "./member-menu.component.html",
  styleUrls: ["./member-menu.component.scss"],
})
export class MemberMenuComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<MemberMenuComponent, string>
  ) {}

  ngOnInit(): void {}

  onMenuItemClick(action: string) {
    this.bottomSheetRef.dismiss(action);
  }
}
