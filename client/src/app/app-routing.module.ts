import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { SampleComponent } from './sample/sample.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomecComponent } from './homec/homec.component';
import { NewProComponent } from './new-pro/new-pro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamComponent } from './team/team.component';

import { AuthGuard } from "./auth.guard";


const routes: Routes = [
  { path: "logins", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", component: SampleComponent },
  { path: "emp", component: EmployeeComponent },
  { path: "newpro", component: NewProComponent },
  { path: "team", component: TeamComponent },

  { path: "dash", component: DashboardComponent },
  { path: "profile", component: SampleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
