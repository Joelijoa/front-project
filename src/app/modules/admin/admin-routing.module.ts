import { ReportsComponent } from './components/reports/reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/adminLayout/adminLayout.component';
import { OffersComponent } from './layout/offers/offers.component';
import { RequestsComponent } from './components/requests/requests.component';
import { SocietyComponent } from './components/society/society.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'offers', pathMatch: 'full' },
      { path: "offers", component: OffersComponent },
      { path: "requests", component: RequestsComponent },
      { path: "reports", component: ReportsComponent },
      { path: "society", component: SocietyComponent },
      { path: "users", component: UsersComponent },
    ]

  },
  // { path: '', redirectTo: 'offers' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
