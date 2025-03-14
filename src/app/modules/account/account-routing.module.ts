import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path : 'register-user',
    component : RegisterUserComponent
  },
  {
    path : 'register-company',
    component : RegisterCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
