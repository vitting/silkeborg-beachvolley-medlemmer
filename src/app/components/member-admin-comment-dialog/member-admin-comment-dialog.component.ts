import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Member } from "src/models/member";
import { MemberService } from "src/app/services/member.service";
import { Subscription } from "rxjs";
import { memberAdminCommentDialogAnimation } from "./member-admin-comment-dialog.animation";
import { LogService } from "src/app/services/log.service";
import { AdminUserService } from "src/app/services/admin-user.service";
import { AdminUser } from "src/models/admin-user";
import { AdminComment } from "src/models/admin-comment";

interface AnimState {
  editDelete: boolean;
  delete: boolean;
}

@Component({
  templateUrl: "./member-admin-comment-dialog.component.html",
  styleUrls: ["./member-admin-comment-dialog.component.scss"],
  animations: memberAdminCommentDialogAnimation,
})
export class MemberAdminCommentDialogComponent implements OnInit, OnDestroy {
  getAllMemberAdminCommentsSub: Subscription;
  adminComments: AdminComment[] = [];
  editComment: AdminComment = null;
  commentText = null;
  showClearComment = false;
  animStates: AnimState[] = [];
  currentAdminUser: AdminUser;
  constructor(
    public dialogRef: MatDialogRef<MemberAdminCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member,
    private memberService: MemberService,
    private logService: LogService,
    private adminUserService: AdminUserService
  ) {}

  ngOnInit(): void {
    this.getAllMemberAdminCommentsSub = this.memberService
      .getAllMemberAdminComments(this.data.id)
      .subscribe((comments) => {
        this.animStates = [];
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < comments.length; index++) {
          this.animStates.push({ editDelete: false, delete: false });
        }

        this.adminComments = comments;
      });
  }

  ngOnDestroy(): void {
    if (this.getAllMemberAdminCommentsSub) {
      this.getAllMemberAdminCommentsSub.unsubscribe();
    }
  }

  getAdminUserName(userId: string) {
    return (
      this.adminUserService.adminUserInfosIndex[userId]?.name ?? "Ukendt navn"
    );
  }

  clearComment() {
    this.commentText = null;
    this.editComment = null;
    this.showClearComment = false;
  }

  async addComment() {
    try {
      if (this.commentText && this.commentText !== "") {
        let comment: AdminComment;
        if (this.editComment) {
          comment = this.editComment;
          comment.comment = this.commentText;
        } else {
          comment = this.memberService.createAdminComment(
            this.commentText,
            this.data.id,
            this.adminUserService.adminUser.id
          );
          await this.memberService.upvoteMemberAdminCommentCounter(
            this.data.id
          );
          this.data.adminCommentsCount++;
        }
        await this.memberService.addUpdateMemberAdminComment(comment);
      }

      this.clearComment();
    } catch (error) {
      this.logService.addLog("error", error);
    }
  }

  editCommentSet(comment: AdminComment, index: number) {
    this.animStates[index].editDelete = false;
    this.showClearComment = true;
    this.editComment = comment;
    this.commentText = comment.comment;
  }

  deleteCommentConfirm(index: number) {
    this.animStates[index].editDelete = false;
    this.animStates[index].delete = true;
  }

  async deleteComment(comment: AdminComment, index: number) {
    try {
      if (comment) {
        await this.memberService.deleteMemberAdminComment(comment.id);
        await this.memberService.downvoteMemberAdminCommentCounter(
          this.data.id
        );
        this.data.adminCommentsCount--;
      } else {
        this.animStates[index].delete = false;
      }
    } catch (error) {
      this.logService.addLog("error", error);
    }
  }

  showEditDeleteMenu(index: number) {
    this.animStates[index].editDelete = !this.animStates[index].editDelete;
  }
}
