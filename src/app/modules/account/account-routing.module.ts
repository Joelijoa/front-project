import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register/components/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/register/components/register-company/register-company.component';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'register-user',
    component : RegisterUserComponent
  },
  {
    path : 'register-company',
    component : RegisterCompanyComponent
  },
  {
    path: 'profile',
    redirectTo: '/profil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
