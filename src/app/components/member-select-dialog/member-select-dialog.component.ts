import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { Member } from "src/models/member";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UtilityService } from "src/app/services/utility.service";
import { MatSelectionListChange } from "@angular/material/list";
import { MatSelectChange } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";

export enum MemberFilterSelectOptions {
  all,
  none,
  paymentLastSeason,
  paymentThisSeason,
}

export interface MemberSelectDialogResult {
  members: Member[];
  filter: MemberFilterSelectOptions;
}

interface SelectOption {
  name: string;
  value: MemberFilterSelectOptions;
}

interface ListSelectOption {
  selected: boolean;
  member: Member;
}

@Component({
  templateUrl: "./member-select-dialog.component.html",
  styleUrls: ["./member-select-dialog.component.scss"],
})
export class MemberSelectDialogComponent implements OnInit {
  selectedCount = 0;
  memberOptions: ListSelectOption[] = [];
  options: SelectOption[] = [];
  filterSelectValue: MemberFilterSelectOptions = MemberFilterSelectOptions.all;
  constructor(
    public dialogRef: MatDialogRef<
      MemberSelectDialogComponent,
      MemberSelectDialogResult
    >,
    @Inject(MAT_DIALOG_DATA) public data: Member[],
    private utilityService: UtilityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.options = [
      {
        name: "Alle medlemmer",
        value: MemberFilterSelectOptions.all,
      },
      {
        name: "Ingen medlemmer",
        value: MemberFilterSelectOptions.none,
      },
      {
        name: `Har betalt kontingent i sidste sæsonen`,
        value: MemberFilterSelectOptions.paymentLastSeason,
      },
      {
        name: "Har betalt kontingent i denne sæson",
        value: MemberFilterSelectOptions.paymentThisSeason,
      },
    ];

    for (const member of this.data) {
      this.memberOptions.push({
        member,
        selected: true,
      });
    }

    this.filterMembers(this.filterSelectValue);
  }

  private filterAll(selectUser: boolean = true) {
    for (const option of this.memberOptions) {
      option.selected = selectUser;
    }

    if (selectUser) {
      this.selectedCount = this.memberOptions.length;
    } else {
      this.selectedCount = 0;
    }
  }

  private filterPayment() {
    let count = 0;
    for (const option of this.memberOptions) {
      if (option.member.payments[this.utilityService.currentYear - 1].paied) {
        option.selected = true;
        ++count;
      } else {
        option.selected = false;
      }
    }

    this.selectedCount = count;
  }

  private filterPaymentThisSeason() {
    let count = 0;
    for (const option of this.memberOptions) {
      if (option.member.payments[this.utilityService.currentYear].paied) {
        option.selected = true;
        ++count;
      } else {
        option.selected = false;
      }
    }

    this.selectedCount = count;
  }

  changeMemberSelection(item: MatSelectionListChange) {
    const value: ListSelectOption = item.option.value;
    value.selected = item.option.selected;

    if (item.option.selected) {
      this.selectedCount++;
    } else {
      this.selectedCount--;
    }
  }

  filterChange(event: MatSelectChange) {
    this.filterSelectValue = event.value;
    this.filterMembers(event.value);
  }

  private filterMembers(value: MemberFilterSelectOptions) {
    switch (value) {
      case MemberFilterSelectOptions.all:
        this.filterAll(true);
        break;
      case MemberFilterSelectOptions.none:
        this.filterAll(false);
        break;
      case MemberFilterSelectOptions.paymentLastSeason:
        this.filterPayment();
        break;
      case MemberFilterSelectOptions.paymentThisSeason:
        this.filterPaymentThisSeason();
        break;
    }
  }

  private getSelectedMembers() {
    const selectedMembers: Member[] = [];

    for (const option of this.memberOptions) {
      if (option.selected) {
        selectedMembers.push(option.member);
      }
    }

    return selectedMembers;
  }

  saveSelected() {
    const selectedMembers = this.getSelectedMembers();

    this.dialogRef.close({
      members: selectedMembers,
      filter: this.filterSelectValue,
    });
  }

  copiedToClipboard(copied: boolean) {
    if (copied) {
      this.snackBar.open("E-mail adresser kopieret til udklipsholder", null, {
        duration: 1000,
      });
    }
  }

  getSelectedMembersAsString() {
    const selectedMembers = this.getSelectedMembers();
    const emails: string [] = [];
    for (const member of selectedMembers) {
      emails.push(member.email);
    }

    return emails.join(";");
  }
}
