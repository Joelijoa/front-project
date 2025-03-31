import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';

// Routing
import { OfferRoutingModule } from './offer-routing.module';

// Components
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferSearchComponent } from './components/offer-search/offer-search.component';
import { OfferFiltersComponent } from './components/offer-filters/offer-filters.component';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { OfferDetailsComponent } from '../offer-details/offer-details.component';

// Services
import { OfferService } from './services/offer.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        OfferRoutingModule,
        
        // PrimeNG
        ButtonModule,
        CardModule,
        InputTextModule,
        SelectModule,
        TooltipModule,
        ProgressSpinnerModule,
        PaginatorModule,

        // Standalone Components
        OfferListComponent,
        OfferSearchComponent,
        OfferFiltersComponent,
        OfferCardComponent,
        OfferDetailsComponent
    ],
    providers: [
        OfferService
    ]
})
export class OfferModule { }
