import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "indmeldelse"
  },
  {
    path: "konfigurer",
    loadChildren: "./pages/config-app/config-app.module#ConfigAppModule"
  },
  {
    path: "admin",
    loadChildren: "./pages/admin/admin.module#AdminModule"
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "indmeldelse"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
