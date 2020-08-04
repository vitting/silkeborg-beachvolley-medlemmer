import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { first, catchError } from "rxjs/operators";
import { UtilityService } from "./utility.service";
import { Member, MemberPayment } from "src/models/member";
import { LogService } from "./log.service";
import { of } from "rxjs";
import { ZipCode } from "src/interfaces/zipcode";
import { Team } from "src/models/team";
import { AdminComment } from "src/models/admin-comment";

interface CreateUpdateMemberObject {
  name: string;
  address: string;
  zipcode: number;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  email: string;
  phone: number;
  comment: string;
  team: Team;
}

@Injectable({
  providedIn: "root",
})
export class MemberService {
  private members = "members";
  private admincomments = "admin_comments";
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService,
    private logService: LogService
  ) {}

  createMemberObject(
    values: CreateUpdateMemberObject,
    teamId: string,
    sendCreationEmail: boolean = false
  ): Member {
    const birthDate = new Date(
      values.birthYear,
      values.birthMonth,
      values.birthDay
    );

    const payment: MemberPayment = {};

    payment[this.utilityService.currentYear] = {
      amount: 0,
      paied: false,
      teamId,
      year: this.utilityService.currentYear,
    };
    payment[this.utilityService.currentYear - 1] = {
      amount: 0,
      paied: false,
      teamId,
      year: this.utilityService.currentYear - 1,
    };

    if (values.team) {
      teamId = values.team.id;
    }

    return {
      id: this.utilityService.newId,
      createdAt: this.utilityService.timestamp,
      birthDate: this.utilityService.timestampFromDate(birthDate),
      name: values.name,
      address: values.address,
      zipcode: values.zipcode,
      email: values.email.toLowerCase().trim(),
      phone: values.phone,
      comment: values.comment,
      payments: payment,
      adminCommentsCount: 0,
      teamId,
      sendCreationEmail,
    };
  }

  updateMemberObject(values: CreateUpdateMemberObject, member: Member): Member {
    const birthDate = new Date(
      values.birthYear,
      values.birthMonth,
      values.birthDay
    );

    return {
      id: member.id,
      createdAt: member.createdAt,
      birthDate: this.utilityService.timestampFromDate(birthDate),
      name: values.name,
      address: values.address,
      zipcode: values.zipcode,
      email: values.email,
      phone: values.phone,
      comment: values.comment,
      payments: member.payments,
      adminCommentsCount: member.adminCommentsCount,
      teamId: values.team.id,
      sendCreationEmail: member?.sendCreationEmail ?? false,
    };
  }

  createAdminComment(
    comment: string,
    memberId: string,
    adminUserId: string
  ): AdminComment {
    const timestamp = this.utilityService.timestamp;
    return {
      id: this.utilityService.newId,
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: adminUserId,
      comment,
      memberId,
    };
  }

  addUpdateMember(member: Member) {
    return this.db
      .collection<Member>(this.members)
      .doc<Member>(member.id)
      .set(member);
  }

  // Admin functions ***********************************************************

  getAllMembers() {
    return this.db
      .collection<Member>(this.members, (ref) => {
        return ref.orderBy("name");
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of([]);
        }),
        first()
      );
  }

  async deleteMember(memberId: string) {
    await this.deleteMemberAdminCommentsByMemberId(memberId);
    return this.db.collection<Member>(this.members).doc(memberId).delete();
  }

  updateMemberPayments(member: Member) {
    return this.db.collection<Member>(this.members).doc(member.id).update({
      payments: member.payments,
    });
  }

  getCityByZipcode(zipcode: number) {
    return this.db
      .collection<ZipCode>("zipcodes")
      .doc<ZipCode>(zipcode.toString())
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of(null);
        }),
        first()
      );
  }

  addUpdateMemberAdminComment(comment: AdminComment) {
    comment.updatedAt = this.utilityService.timestamp;
    return this.db
      .collection<AdminComment>(this.admincomments)
      .doc(comment.id)
      .set(comment);
  }

  getAllMemberAdminComments(memberId: string) {
    return this.db
      .collection<AdminComment>(this.admincomments, (ref) => {
        return ref.where("memberId", "==", memberId).orderBy("createdAt");
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of([]);
        })
      );
  }

  async deleteMemberAdminCommentsByMemberId(memberId: string) {
    const adminComments: AdminComment[] = await this.db
      .collection<AdminComment>(this.admincomments, (ref) => {
        return ref.where("memberId", "==", memberId);
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          this.logService
            .addLog("error", error)
            .catch((err) => console.error(err));
          return of([]);
        }),
        first()
      )
      .toPromise();

    const batch = this.db.firestore.batch();

    for (const comment of adminComments) {
      batch.delete(
        this.db.collection<AdminComment>(this.admincomments).doc(comment.id).ref
      );
    }

    return batch.commit();
  }

  deleteMemberAdminComment(commentId: string) {
    return this.db
      .collection<AdminComment>(this.admincomments)
      .doc(commentId)
      .delete();
  }

  upvoteMemberAdminCommentCounter(memberId: string) {
    const bulRef = this.db
      .collection<Member>(this.members)
      .doc<Member>(memberId).ref;

    return this.db.firestore.runTransaction(async (transaction) => {
      const doc = await transaction.get(bulRef);

      if (doc.exists) {
        let adminCommentsCount = doc.data().adminCommentsCount;
        adminCommentsCount++;
        transaction.update(bulRef, { adminCommentsCount });
      }
    });
  }

  downvoteMemberAdminCommentCounter(memberId: string) {
    const bulRef = this.db
      .collection<Member>(this.members)
      .doc<Member>(memberId).ref;

    return this.db.firestore.runTransaction(async (transaction) => {
      const doc = await transaction.get(bulRef);

      if (doc.exists) {
        let adminCommentsCount = doc.data().adminCommentsCount;
        adminCommentsCount--;
        transaction.update(bulRef, { adminCommentsCount });
      }
    });
  }
}
