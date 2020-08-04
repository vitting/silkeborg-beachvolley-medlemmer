import { Component, OnInit } from "@angular/core";
import { ConfigSettingsService } from "src/app/services/config-settings.service";
import { AnimationEvent } from "@angular/animations";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { fadeInAnim } from "./config-app.animation";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { ValidGmailAddress } from "./config-app.validator";
import { AdminUserService } from "src/app/services/admin-user.service";

@Component({
  templateUrl: "./config-app.component.html",
  styleUrls: ["./config-app.component.scss"],
  animations: fadeInAnim,
})
export class ConfigAppComponent implements OnInit {
  adminUserForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email, ValidGmailAddress()]],
  });
  emailTemplateValue = -1;
  messageValue = -1;
  counterValue = -1;
  tempVarValue = -1;
  teamValue = -1;
  zipcodeValue = -1;
  contributionValue = -1;
  configIsComplete = true;
  showCreateAdminUser = false;
  showElements = false;
  showConsole = false;
  showLogin = false;
  showStartButton = true;
  consoleText = "Ikke startet";
  user: firebase.User;
  configRunning = false;
  constructor(
    private configAppFirstRunService: ConfigSettingsService,
    private fireAuth: AngularFireAuth,
    private fb: FormBuilder,
    private adminUserService: AdminUserService
  ) {}

  ngOnInit(): void {
    this.fireAuth.user.subscribe((user) => {
      this.user = user;
    });

    this.configAppFirstRunService.getConfigFirstRun().then((value) => {
      this.configIsComplete = value;
    });
  }

  startConfig() {
    if (this.configIsComplete) {
      return;
    }

    this.showStartButton = false;
    this.showCreateAdminUser = true;
  }

  async startInit() {
    if (this.configIsComplete || !this.user) {
      return;
    }

    let teamId: string = null;
    this.showElements = true;
    this.configRunning = true;

    try {
      this.configAppFirstRunService.defaultMessages$.subscribe((progress) => {
        this.messageValue = progress;
      });
      this.consoleText = "Opretter standard beskeder";
      await this.configAppFirstRunService.createDefaultMessages();
    } catch (error) {
      console.error(error);
    }

    try {
      this.configAppFirstRunService.defaultCounters$.subscribe((progress) => {
        this.counterValue = progress;
      });
      this.consoleText = "Opretter tællere";
      await this.configAppFirstRunService.createDefaultCounters();
    } catch (error) {
      console.error(error);
    }

    try {
      this.configAppFirstRunService.defaultEmailTemplates$.subscribe(
        (progress) => {
          this.emailTemplateValue = progress;
        }
      );
      this.consoleText = "Opretter e-mail skabeloner";
      await this.configAppFirstRunService.createDefaultEmailTemplates();
    } catch (error) {
      console.error(error);
    }

    try {
      this.configAppFirstRunService.defaultTemplateVariables$.subscribe(
        (progress) => {
          this.tempVarValue = progress;
        }
      );
      this.consoleText = "Opretter skabelon variabler";
      await this.configAppFirstRunService.createDefaultTemplateVariables();
    } catch (error) {
      console.error(error);
    }

    try {
      this.configAppFirstRunService.defaultTeam$.subscribe((progress) => {
        this.teamValue = progress;
      });
      this.consoleText = "Opretter standard hold";
      teamId = await this.configAppFirstRunService.createDefaultTeam();
    } catch (error) {
      console.error(error);
    }

    try {
      this.configAppFirstRunService.defaultContribution$.subscribe(
        (progress) => {
          this.contributionValue = progress;
        }
      );
      this.consoleText = "Opretter standard betaling";
      await this.configAppFirstRunService.createDefaultContribution(teamId);
    } catch (error) {
      console.error(error);
    }

    try {
      this.configAppFirstRunService.zipCodes$.subscribe((progress) => {
        this.zipcodeValue = progress;
      });
      this.consoleText =
        "Opretter postnummere og byer. Dette kan tage nogen minutter";
      await this.configAppFirstRunService.createZipCodes();
    } catch (error) {
      console.error(error);
    }

    this.consoleText = "Konfiguration fuldført";
    this.configIsComplete = true;
    await this.configAppFirstRunService.setConfigFirstRun();
    if (this.user) {
      await this.fireAuth.signOut();
    }
  }

  elementsShown(event: AnimationEvent) {
    if (event.toState) {
      this.showConsole = true;
    }
  }

  async login() {
    if (!this.configIsComplete) {
      try {
        if (this.user) {
          await this.fireAuth.signOut();
        }

        const user = await this.fireAuth.signInWithPopup(
          new auth.GoogleAuthProvider()
        );

        if (user) {
          const adminUsers = await this.adminUserService
            .getAdminUserByEmail(user.user.email)
            .toPromise();

          if (adminUsers.length !== 0) {
            const adminUser = adminUsers[0];
            await this.adminUserService.updateUserOnFirstLogin(
              adminUser.id,
              user.user.displayName,
              user.user.uid
            );
            this.continueConfig();
          } else {
            console.error("Admin user don't exists");
          }
        }
      } catch (error) {
        if (error?.code === "auth/popup-closed-by-user") {
          console.log("Login vinduet er blevet lukket af bruger");
        } else {
          console.error(error);
        }
      }
    }
  }

  continueConfig() {
    this.showLogin = false;
    this.showElements = true;
  }

  async onSubmit() {
    if (this.adminUserForm.valid) {
      if (this.configIsComplete) {
        return;
      }

      const name: string = this.adminUserForm.get("name").value;
      const email: string = this.adminUserForm.get("email").value;
      try {
        await this.configAppFirstRunService.createAdminUser(name, email);
        this.showCreateAdminUser = false;
        this.showLogin = true;
      } catch (error) {
        console.error(error);
      }
    }
  }

  getEmailFormError(control: AbstractControl) {
    if (control.errors) {
      if (control.hasError("required")) {
        return "Feltet skal udfyldes";
      } else if (control.hasError("email")) {
        return "Ikke en gyldig e-mail adresse";
      } else if (control.hasError("validGmailAddress")) {
        return "Ikke en gyldig Gmail adresse";
      }
    }
  }
}
