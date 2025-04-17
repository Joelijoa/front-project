import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruteurRoutingModule } from './recruteur-routing.module';
import { AllOfferComponent } from './job-offer/components/all-offer/all-offer.component';
import { DraftOffersComponent } from './job-offer/components/draft-offers/draft-offers.component';
import { AllApplicationsComponent } from './application/components/all-applications/all-applications.component';
import { CvListComponent } from './application/components/cv-list/cv-list.component';
import { CompanyProfileComponent } from './profil-company/components/company-profile/company-profile.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecruteurRoutingModule,
    AllOfferComponent,
    DraftOffersComponent,
    AllApplicationsComponent,
    CvListComponent,
    CompanyProfileComponent
  ]
})
export class RecruteurModule { } 