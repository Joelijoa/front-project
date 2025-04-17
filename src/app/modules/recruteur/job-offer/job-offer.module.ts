import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Modules
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

// Components
import { AllOfferComponent } from './components/all-offer/all-offer.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { DraftOffersComponent } from './components/draft-offers/draft-offers.component';

// Routing
import { JobOfferRoutingModule } from './job-offer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    EditorModule,
    CalendarModule,
    MultiSelectModule,
    TableModule,
    TagModule,
    BadgeModule,
    ChipModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    JobOfferRoutingModule,
    AllOfferComponent,
    OfferFormComponent,
    OfferDetailsComponent,
    DraftOffersComponent
  ]
})
export class JobOfferModule { }
