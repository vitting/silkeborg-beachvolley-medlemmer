import { Component, OnInit, ViewChild, Renderer2 } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Member, MemberPaymentData } from "src/models/member";
import { MatSort, Sort } from "@angular/material/sort";
import { MemberService } from "src/app/services/member.service";
import { MatDialog } from "@angular/material/dialog";
import { MemberDetailDialogComponent } from "src/app/components/member-detail-dialog/member-detail-dialog.component";
import { UtilityService } from "src/app/services/utility.service";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MemberMenuComponent } from "src/app/components/member-menu/member-menu.component";
import { TopbarService } from "src/app/services/topbar.service";
import {
  MemberEditDialogComponent,
  MemberEditDialogState,
  MemberEditDialogCloseState,
  MemberEditDialogData,
} from "src/app/components/member-edit-dialog/member-edit-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MemberContributionsDialogComponent
} from "src/app/components/member-contributions-dialog/member-contributions-dialog.component";
import { MemberStatisticsDialogComponent } from "src/app/components/member-statistics-dialog/member-statistics-dialog.component";
import { MemberAdminCommentDialogComponent } from "src/app/components/member-admin-comment-dialog/member-admin-comment-dialog.component";
import { DeleteDialogComponent } from "src/app/components/delete-dialog/delete-dialog.component";
import { LogService } from "src/app/services/log.service";
import {
  SendEmailDialogComponent,
  SendEmailDialogType,
  SendEmailDialogConfig,
  SendEmailDialogResult,
} from "src/app/components/send-email-dialog/send-email-dialog.component";
import { ProgressbarService } from "src/app/services/progressbar.service";
import { ActivatedRoute } from "@angular/router";
import { Team } from "src/models/team";
import { Contribution } from "src/models/contribution";
import { MatRadioChange } from "@angular/material/radio";
import {
  MemberSelectDialogComponent,
  MemberSelectDialogResult,
} from "src/app/components/member-select-dialog/member-select-dialog.component";
import { EmailToSendService } from "src/app/services/email-to-send.service";
import { ContributionService } from "src/app/services/contribution.service";
import { TeamService } from "src/app/services/team.service";
import { MemberFilterType } from "./admin-members-filter.type";
import { AdminUserService } from "src/app/services/admin-user.service";
import * as json2csv from "json2csv";
import * as moment from "moment";

interface ResolvedData {
  teams: Team[];
  contributions: Contribution[];
}

@Component({
  templateUrl: "./admin-members.component.html",
  styleUrls: ["./admin-members.component.scss"],
})
export class AdminMembersComponent implements OnInit {
  members: MatTableDataSource<Member> = new MatTableDataSource();
  loadedMembers: Member[] = [];
  displayedColumns: string[] = [
    "createdAt",
    "name",
    "birthdate",
    "contactinfo",
    "team",
    "paidlastyear",
    "paid",
    "menu",
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  currentYear = 2020;
  lastYear = 0;
  currentSort: Sort;
  membersCount = 0;
  filterValue = "";
  selectedFilterValue = "all";
  private teams: Team[] = [];
  lastVisit: Date;
  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private utilityService: UtilityService,
    private topbarService: TopbarService,
    private snackBar: MatSnackBar,
    private logService: LogService,
    private progressbarService: ProgressbarService,
    private activatedRoute: ActivatedRoute,
    private emailToSendService: EmailToSendService,
    private contributionService: ContributionService,
    private teamService: TeamService,
    private adminUserService: AdminUserService,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.topbarService.title = "Medlemmer";
    this.currentYear = this.utilityService.currentYear;
    this.lastYear = this.currentYear - 1;

    this.activatedRoute.data.subscribe((data: ResolvedData) => {
      this.teams = data.teams;
    });

    this.lastVisit = this.adminUserService.adminUser.lastVisit.toDate();

    this.loadMembers();
  }

  private loadMembers() {
    this.progressbarService.showProgressbar = true;
    this.memberService.getAllMembers().subscribe((members) => {
      this.loadedMembers = members;
      this.members.data = members;
      this.members.sort = this.sort;
      this.membersCount = this.members.filteredData.length;
      if (this.currentSort) {
        this.sort.sortChange.emit(this.currentSort);
      }

      this.progressbarService.showProgressbar = false;
    });
  }

  rowClick(member: Member) {
    this.dialog.open(MemberDetailDialogComponent, {
      width: "400px",
      data: member,
    });
  }

  getMemberAge(member: Member): number {
    return this.utilityService.getAge(member.birthDate.toDate());
  }

  getTeamName(member: Member) {
    return this.teamService.teamsIndex[member.teamId]?.name ?? "";
  }

  getPayment(member: Member) {
    return (
      this.contributionService.getContribution(this.currentYear, member.teamId)
        ?.amount ?? 0
    );
  }

  getIsTeamActive(member: Member) {
    return this.teamService.teamsIndex[member.teamId]?.active ?? true;
  }

  getIsPayment(member: Member) {
    return (
      this.contributionService.getContribution(this.currentYear, member.teamId)
        ?.amount !== undefined
    );
  }

  getPaidValue(member: Member, year: number): boolean {
    let returnValue = false;
    if (member.payments && member.payments[year]) {
      returnValue = member.payments[year].paied;
    } else {
      member.payments[year] = {
        amount: 0,
        paied: false,
        teamId: member.teamId,
        year,
      };
    }

    return returnValue;
  }

  async changePaid(value: MatCheckboxChange, member: Member) {
    member.payments[this.currentYear].paied = value.checked;
    member.payments[this.currentYear].amount = 0;

    if (value.checked) {
      member.payments[this.currentYear].amount =
        this.contributionService.contributionsIndex[
          `${this.currentYear}_${member.teamId}`
        ]?.amount ?? 0;
    }

    await this.memberService.updateMemberPayments(member);
  }

  menuClick(member: Member) {
    const bottomSheetRef = this.bottomSheet.open(MemberMenuComponent);
    bottomSheetRef.afterDismissed().subscribe((action: string) => {
      switch (action) {
        case "edit":
          this.showEditDialog(member);
          break;
        case "edit_contribution":
          this.showContributionDialog(member);
          break;
        case "delete":
          this.showDeleteDialog(member);
          break;
        case "email":
          this.showSendEmailDialog("single", [member]);
          break;
      }
    });
  }

  showDeleteDialog(member: Member) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "400px",
      disableClose: true,
      data: {
        title: "Slet medlem",
        text: `Vil du slettet ${member.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.progressbarService.showProgressbar = true;
        try {
          await this.memberService.deleteMember(member.id);
          this.logService.addLog(
            "admin",
            `member deleted - ${member.name} / ${member.email}`
          );
          this.loadMembers();
          this.snackBar.open("Medlemmet er slettet", null, {
            duration: 1000,
          });
        } catch (error) {
          this.logService.addLog("error", error);
        } finally {
          this.progressbarService.showProgressbar = false;
        }
      }
    });
  }

  showContributionDialog(member: Member) {
    this.dialog.open<
      MemberContributionsDialogComponent,
      Member
    >(MemberContributionsDialogComponent, {
      width: "400px",
      data: member,
    });
  }

  showEditDialog(member: Member) {
    const dialogRef = this.dialog.open<
      MemberEditDialogComponent,
      MemberEditDialogData,
      MemberEditDialogCloseState
    >(MemberEditDialogComponent, {
      width: "400px",
      disableClose: true,
      data: {
        data: member,
        state: MemberEditDialogState.edit,
        teams: this.teams,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === MemberEditDialogCloseState.updated) {
        this.snackBar.open("Medlemmet er blevet opdateret ", null, {
          duration: 1000,
        });

        this.loadMembers();
      }
    });
  }

  showAddNewMemberDialog() {
    const dialogRef = this.dialog.open<
      MemberEditDialogComponent,
      MemberEditDialogData,
      MemberEditDialogCloseState
    >(MemberEditDialogComponent, {
      width: "400px",
      disableClose: true,
      data: {
        data: null,
        state: MemberEditDialogState.new,
        teams: this.teams,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === MemberEditDialogCloseState.created) {
        this.snackBar.open("Medlemmet er blevet oprettet ", null, {
          duration: 1000,
        });

        this.loadMembers();
      }
    });
  }

  showAdminCommentDialog(member: Member) {
    this.dialog.open(MemberAdminCommentDialogComponent, {
      width: "400px",
      disableClose: true,
      data: member,
    });
  }

  showInfoDialog() {
    this.dialog.open(MemberStatisticsDialogComponent, {
      width: "500px",
      data: this.members.data,
    });
  }

  private async showSendEmailDialog(
    type: SendEmailDialogType,
    members: Member[] = []
  ) {
    if (members.length > 0) {
      const dialogRefSend = this.dialog.open<
        SendEmailDialogComponent,
        SendEmailDialogConfig,
        SendEmailDialogResult
      >(SendEmailDialogComponent, {
        width: "500px",
        disableClose: true,
        data: {
          type,
          member: type === "single" ? members[0] : null,
          body: "",
          subject: "",
        },
      });

      dialogRefSend.afterClosed().subscribe(async (result) => {
        if (result) {
          this.progressbarService.showProgressbar = true;

          const emailSendRecipients = this.emailToSendService.createEmailRecipientsForMembers(
            members
          );
          const emailToSendData = this.emailToSendService.createEmailToSend(
            emailSendRecipients,
            "email",
            result.subject,
            result.body
          );

          try {
            await this.emailToSendService.addEmailToSend(emailToSendData);

            this.snackBar.open("E-mail er afsendt", null, {
              duration: 1000,
            });
          } catch (error) {
            this.logService.addLog("error", error);

            this.snackBar.open(
              "Der skete en fejl under afsendelse af e-mail",
              null,
              {
                duration: 1000,
              }
            );
          } finally {
            this.progressbarService.showProgressbar = false;
          }
        }
      });
    }
  }

  private showSelectMembersDialog() {
    const dialogRefSelection = this.dialog.open<
      MemberSelectDialogComponent,
      Member[],
      MemberSelectDialogResult
    >(MemberSelectDialogComponent, {
      width: "500px",
      disableClose: true,
      data: this.members.data,
    });

    return dialogRefSelection.afterClosed().toPromise();
  }

  tableSort(sort: Sort) {
    this.currentSort = sort;

    if (sort.active === "paid") {
      this.loadedMembers.sort((a, b) => {
        if (
          a.payments[this.currentYear] !== undefined &&
          b.payments[this.currentYear] !== undefined
        ) {
          if (
            a.payments[this.currentYear].paied >
            b.payments[this.currentYear].paied
          ) {
            return sort.direction === "asc" ? 1 : -1;
          }

          if (
            a.payments[this.currentYear].paied <
            b.payments[this.currentYear].paied
          ) {
            return sort.direction === "asc" ? -1 : 1;
          }
        }
        return 0;
      });
    }

    if (sort.active === "paidlastyear") {
      this.loadedMembers.sort((a, b) => {
        if (
          a.payments[this.lastYear] !== undefined &&
          b.payments[this.lastYear] !== undefined
        ) {
          if (
            a.payments[this.lastYear].paied > b.payments[this.lastYear].paied
          ) {
            return sort.direction === "asc" ? 1 : -1;
          }

          if (
            a.payments[this.lastYear].paied < b.payments[this.lastYear].paied
          ) {
            return sort.direction === "asc" ? -1 : 1;
          }
        }

        return 0;
      });
    }

    if (sort.active === "teamname") {
      this.loadedMembers.sort((a, b) => {
        if (
          this.teamService.teamsIndex[a.teamId].name >
          this.teamService.teamsIndex[b.teamId].name
        ) {
          return sort.direction === "asc" ? 1 : -1;
        }

        if (
          this.teamService.teamsIndex[a.teamId].name <
          this.teamService.teamsIndex[b.teamId].name
        ) {
          return sort.direction === "asc" ? -1 : 1;
        }

        return 0;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.members.filterPredicate = (member: Member, filter: string) => {
      return (
        member.name.toLowerCase().includes(filter) ||
        member.phone.toString().includes(filter) ||
        member.email.toLowerCase().includes(filter)
      );
    };
    this.members.filter = filterValue.trim().toLowerCase();
    this.membersCount = this.members.filteredData.length;
  }

  clearFilter() {
    this.selectedFilterValue = "all";
    this.filterValue = null;
    this.members.filter = null;
    this.membersCount = this.members.filteredData.length;
  }

  private customTablefilter() {
    return (member: Member, filter: string) => {
      const type: MemberFilterType = filter as MemberFilterType;
      switch (type) {
        case "ageUnder18":
          return this.utilityService.getAge(member.birthDate.toDate()) < 18;
        case "ageOver18":
          return this.utilityService.getAge(member.birthDate.toDate()) >= 18;
        case "newMembersCurrentYear":
          return (
            member.createdAt.toDate().getFullYear() ===
            this.utilityService.currentYear
          );
        case "memberPaiedCurrentYear":
          return member.payments[this.utilityService.currentYear].paied;
        case "memberPaiedLastYear":
          return member.payments[this.utilityService.currentYear - 1].paied;
        case "memberNotPaiedCurrentYear":
          return !member.payments[this.utilityService.currentYear].paied;
        case "memberNotPaiedLastYear":
          return !member.payments[this.utilityService.currentYear - 1].paied;
      }
    };
  }

  filterChange(change: MatRadioChange) {
    this.clearFilter();
    this.selectedFilterValue = change.value;
    if (this.selectedFilterValue !== "all") {
      this.members.filterPredicate = this.customTablefilter();
      this.members.filter = this.selectedFilterValue;
      this.membersCount = this.members.filteredData.length;
    }
  }

  async sendEmailAll() {
    const result = await this.showSelectMembersDialog();
    this.showSendEmailDialog("multiple", result.members);
  }

  newSinceLastVisit(member: Member) {
    return member.createdAt.toDate() > this.lastVisit;
  }

  async exportMembers() {
    this.progressbarService.showProgressbar = true;
    try {
      const members = this.loadedMembers;
      const preParsedData = this.exportParseMembers(members);

      const parsedData = await json2csv.parseAsync(preParsedData, {
        defaultValue: "nej",
        delimiter: ";",
      });

      this.exportDownloadFile(parsedData);
      this.snackBar.open("Eksport fil oprettet. Vil automatisk blive hentet.", null, {
        duration: 3000,
      });
    } catch (error) {
      this.snackBar.open("Eksport fejlede. Prøv igen.", null, {
        duration: 3000,
      });
    }

    this.progressbarService.showProgressbar = false;
  }

  private exportParseMembers(members: Member[]) {
    const dataToParse: any[] = [];

    for (const member of members) {
      const obj: any = {};
      obj.id = member.id;
      obj.oprettet = moment(member.createdAt.toDate()).format(
        "DD-MM-YYYY HH:mm"
      );
      obj.navn = member.name;
      obj.postnr = member.zipcode;
      obj.adresse = member.address;
      obj.foedselsdato = moment(member.birthDate.toDate()).format("DD-MM-YYYY");
      obj.alder = this.getMemberAge(member);
      obj.email = member.email;
      obj.mobil = member.phone;
      obj.hold = `${this.getTeamName(member)} (${this.getPayment(member)} kr.)`;

      for (const key in member.payments) {
        if (member.payments.hasOwnProperty(key)) {
          const payment: MemberPaymentData = member.payments[key];
          obj[`betalt_${payment.year}`] = payment.paied ? "ja" : "nej";
        }
      }
      dataToParse.push(obj);
    }

    return dataToParse;
  }

  private exportDownloadFile(data: string) {
    const blob = new Blob(["\ufeff" + data], {
      type: "text/csv;charset=utf-8;",
    });
    const downloadLink = this.render.createElement("a");
    const url = URL.createObjectURL(blob);
    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute(
      "download",
      `export_${moment().format("DD-MM-YYYY_HH:mm:ss")}` + ".csv"
    );
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
