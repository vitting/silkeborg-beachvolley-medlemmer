import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { AdminUserService } from "src/app/services/admin-user.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from "rxjs/operators";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private adminUserService: AdminUserService,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      if (this.adminUserService.adminUser) {
        this.updateLastVisit(this.adminUserService.adminUser.id, route);
        resolve(true);
      }

      this.fireAuth.user.subscribe((user) => {
        this.adminUserService.currentUser = user;
        if (user) {
          this.adminUserService
            .getAdminUserByEmail(user.email)
            .subscribe((adminUsers) => {
              if (adminUsers.length !== 0) {
                this.adminUserService.adminUser = adminUsers[0];
                this.updateLastVisit(this.adminUserService.adminUser.id, route);
                if (route.data?.onlyAdmin) {
                  if (adminUsers[0].admin) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                }

                resolve(true);
              } else {
                this.fireAuth.signOut();
                this.adminUserService.adminUser = null;
                resolve(false);
              }
            });
        } else {
          this.router.navigateByUrl("/admin/login");
          resolve(false);
        }
      });
    });
  }

  private updateLastVisit(adminUserId: string, route: ActivatedRouteSnapshot) {
    if (route.data && route.data.adminAuthGuardLogPageVisit) {
      this.adminUserService.updateLastVisit(adminUserId);
    }
  }
}
