import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfigAppComponent } from "./config-app.component";

const routes: Routes = [
  {
    path: "",
    component: ConfigAppComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigAppRoutingModule {}
