import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

interface Country {
    name: string;
    code: string;
}

@Component({
    selector: 'app-offer-search',
    templateUrl: './offer-search.component.html',
    styleUrls: ['./offer-search.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        DropdownModule
    ]
})
export class OfferSearchComponent {
    @Output() search = new EventEmitter<{ query: string; country: string | null }>();

    searchQuery: string = '';
    selectedCountry: Country | null = null;

    countries: Country[] = [
        { name: 'France', code: 'FR' },
        { name: 'Belgique', code: 'BE' },
        { name: 'Suisse', code: 'CH' },
        { name: 'Canada', code: 'CA' },
        { name: 'Luxembourg', code: 'LU' },
        { name: 'Maroc', code: 'MA' },
        { name: 'Tunisie', code: 'TN' },
        { name: 'Sénégal', code: 'SN' }
    ];

    onSearch(): void {
        this.search.emit({
            query: this.searchQuery,
            country: this.selectedCountry?.code || null
        });
    }
} 