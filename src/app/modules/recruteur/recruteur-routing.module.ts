import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOfferComponent } from './job-offer/components/all-offer/all-offer.component';
import { DraftOffersComponent } from './job-offer/components/draft-offers/draft-offers.component';
import { AllApplicationsComponent } from './application/components/all-applications/all-applications.component';
import { CvListComponent } from './application/components/cv-list/cv-list.component';
import { CompanyProfileComponent } from './profil-company/components/company-profile/company-profile.component';

const routes: Routes = [
  {
    path: 'recruteur',
    children: [
      {
        path: 'offers',
        children: [
          { path: '', component: AllOfferComponent },
          { path: 'drafts', component: DraftOffersComponent }
        ]
      },
      {
        path: 'applications',
        children: [
          { path: '', component: AllApplicationsComponent },
          { path: 'cv', component: CvListComponent }
        ]
      },
      {
        path: 'profile',
        component: CompanyProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruteurRoutingModule { } 