import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UtilityService } from "./utility.service";
import { AdminUser } from "src/models/admin-user";
import { first, catchError } from "rxjs/operators";
import { User } from "firebase";
import { of } from "rxjs";
import { AdminUserInfo, AdminUserInfoIndex } from "src/models/admin-user-info";

@Injectable({
  providedIn: "root",
})
export class AdminUserService {
  private currentAdminUser: AdminUser = null;
  private currentFirebaseUser: User = null;
  private adminUsersCollection = "admin_users";
  private adminUserInfoCollection = "admin_user_info";
  private index: AdminUserInfoIndex;
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService
  ) {}

  set adminUser(adminUser: AdminUser) {
    this.currentAdminUser = adminUser;
  }

  get adminUser() {
    return this.currentAdminUser;
  }

  set currentUser(user: User) {
    this.currentFirebaseUser = user;
  }

  get currentUser() {
    return this.currentFirebaseUser;
  }

  get adminUserInfosIndex() {
    return this.index;
  }

  set adminUserInfosIndex(index: AdminUserInfoIndex) {
    this.index = index;
  }

  createAdminUserObject(name: string, email: string, admin: boolean): AdminUser {
    const id = this.utilityService.newId;
    const createdAt = this.utilityService.timestamp;
    const lastVisit = this.utilityService.timestamp;
    return {
      id,
      createdAt,
      firstLoginAt: null,
      active: false,
      admin,
      email,
      name,
      gmailUid: null,
      lastVisit,
    };
  }

  createAdminUserInfoObject(adminUser: AdminUser): AdminUserInfo {
    return {
      deleted: false,
      name: adminUser.name,
      userId: adminUser.id,
    };
  }

  addUpdateAdminUser(adminUser: AdminUser) {
    return this.db
      .collection<AdminUser>(this.adminUsersCollection)
      .doc(adminUser.id)
      .set(adminUser);
  }

  deleteAdminUser(adminUserId: string) {
    return this.db
      .collection<AdminUser>(this.adminUsersCollection)
      .doc(adminUserId)
      .delete();
  }

  getAllAdminUsers() {
    return this.db
      .collection<AdminUser>(this.adminUsersCollection, (ref) => {
        return ref.orderBy("name");
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
        first()
      );
  }

  getAdminUserByEmail(email: string) {
    return this.db
      .collection<AdminUser>(this.adminUsersCollection, (ref) => {
        return ref.where("email", "==", email);
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
        first<AdminUser[]>()
      );
  }

  getAdminUserByGmailUid(gmailUid: string) {
    return this.db
      .collection<AdminUser>(this.adminUsersCollection, (ref) => {
        return ref.where("gmailUid", "==", gmailUid);
      })
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
        first<AdminUser[]>()
      );
  }

  updateUserOnFirstLogin(
    adminUserId: string,
    gmailName: string,
    gmailUid: string
  ) {
    const firstLoginAt = this.utilityService.timestamp;
    return this.db
      .collection<AdminUser>(this.adminUsersCollection)
      .doc(adminUserId)
      .update({ name: gmailName, gmailUid, firstLoginAt, active: true });
  }

  updateLastVisit(adminUserId: string) {
    const lastVisit = this.utilityService.timestamp;
    return this.db
      .collection<AdminUser>(this.adminUsersCollection)
      .doc(adminUserId)
      .update({ lastVisit });
  }

  addUpdateAdminUserInfo(adminUserInfo: AdminUserInfo) {
    return this.db
      .collection<AdminUserInfo>(this.adminUserInfoCollection)
      .doc(adminUserInfo.userId)
      .set(adminUserInfo);
  }

  deleteAdminUserInfo(adminUserInfoId: string) {
    return this.db
      .collection<AdminUserInfo>(this.adminUserInfoCollection)
      .doc(adminUserInfoId)
      .update({ deleted: true });
  }

  getAdminUserInfos() {
    return this.db
      .collection<AdminUserInfo>(this.adminUserInfoCollection)
      .valueChanges();
  }
}
