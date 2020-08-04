import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule, SETTINGS } from "@angular/fire/firestore";
import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
import { environment } from "src/environments/environment";
import { MembershipModule } from "./pages/membership/membership.module";
import { AdminModule } from "./pages/admin/admin.module";
import { ProgressbarModule } from "./components/progressbar/progressbar.module";
import "moment/locale/da";
import { SettingsModule } from "./pages/settings/settings.module";
import { HttpClientModule } from "@angular/common/http";
import { ConfigAppModule } from "./pages/config-app/config-app.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    MembershipModule,
    AdminModule,
    ProgressbarModule,
    SettingsModule,
    ConfigAppModule,
  ],
  providers: [
    // Connect to local firestore emulator in development
    {
      provide: SETTINGS,
      useValue: environment.production
        ? undefined
        : {
            host: "localhost:8083",
            ssl: false,
          },
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
