import { Injectable } from "@angular/core";
import { AdminUserInfo, AdminUserInfoIndex } from "src/models/admin-user-info";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AdminUserService } from "../services/admin-user.service";

@Injectable({
  providedIn: "root",
})
export class AdminUserInfoResolverService implements Resolve<AdminUserInfo[]> {
  constructor(private adminUserService: AdminUserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | AdminUserInfo[]
    | import("rxjs").Observable<AdminUserInfo[]>
    | Promise<AdminUserInfo[]> {
    return new Promise((resolve, reject) => {
      this.adminUserService.getAdminUserInfos().subscribe(
        (adminUserInfos) => {
          const adminUserInfosIndex: AdminUserInfoIndex = {};
          for (const adminUserInfo of adminUserInfos) {
            adminUserInfosIndex[adminUserInfo.userId] = adminUserInfo;
          }

          this.adminUserService.adminUserInfosIndex = adminUserInfosIndex;

          return resolve(adminUserInfos);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
