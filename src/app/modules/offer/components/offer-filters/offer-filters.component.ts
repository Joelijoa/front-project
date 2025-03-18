import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

// Models
import { 
    OfferFilters, 
    OfferType,
    ExperienceLevel,
    EducationLevel
} from '../../models/offer.model';

@Component({
    selector: 'app-offer-filters',
    templateUrl: './offer-filters.component.html',
    styleUrls: ['./offer-filters.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        RadioButtonModule,
        ButtonModule
    ]
})
export class OfferFiltersComponent {
    @Output() filtersChange = new EventEmitter<OfferFilters>();

    filters: OfferFilters = {};

    offerTypes = [
        { label: 'Tout', value: null },
        { label: 'Appel à candidature', value: 'APPEL' },
        { label: 'Annonce', value: 'ANNONCE' }
    ];

    educationLevels = [
        { label: 'Tout', value: null },
        { label: 'Bac +5 et plus', value: EducationLevel.BAC5 },
        { label: 'Bac +3 à Bac +4', value: EducationLevel.BAC3 },
        { label: 'Bac à Bac +2', value: EducationLevel.BAC }
    ];

    experienceLevels = [
        { label: 'Tout', value: null },
        { label: '5 ans à 10 ans +', value: ExperienceLevel.SENIOR },
        { label: '2 ans à 5 ans', value: ExperienceLevel.INTERMEDIAIRE },
        { label: 'Débutant à 2 ans', value: ExperienceLevel.JUNIOR }
    ];

    dateOptions = [
        { label: 'Tout', value: null },
        { label: 'Moins de 72H', value: '72h' },
        { label: 'Moins de 7 jrs', value: '7d' },
        { label: 'Moins de 15 jrs', value: '15d' }
    ];

    onFiltersChange(): void {
        this.filtersChange.emit(this.filters);
    }

    resetFilters(): void {
        this.filters = {};
        this.filtersChange.emit(this.filters);
    }
} 