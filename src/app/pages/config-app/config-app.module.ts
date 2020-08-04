import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfigAppComponent } from "./config-app.component";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { ConfigAppRoutingModule } from "./config-app-routing.module";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ConfigAppComponent],
  imports: [
    CommonModule,
    RouterModule,
    ConfigAppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
  ],
})
export class ConfigAppModule {}
