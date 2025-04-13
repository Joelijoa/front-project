import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

// Models
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';

@Component({
    selector: 'app-offer-card',
    templateUrl: './offer-card.component.html',
    styleUrls: ['./offer-card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        CardModule,
        ButtonModule,
        TooltipModule
    ]
})
export class OfferCardComponent {
    @Input() offer!: Offer;
    @Output() saved = new EventEmitter<string>();

    constructor(private offerService: OfferService) {}

    truncateDescription(description: string): string {
        return description.length > 200 
            ? `${description.substring(0, 200)}...` 
            : description;
    }

    truncateText(text: string, maxLength: number): string {
        return text.length > maxLength 
            ? `${text.substring(0, maxLength)}...` 
            : text;
    }

    formatSalary(salary: { min: number; max: number; currency: string }): string {
        return `${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} ${salary.currency}/an`;
    }

    getRemainingRequirements(): string[] {
        if (!this.offer.requirements) return [];
        return this.offer.requirements.slice(0, 3);
    }

    toggleSave(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.offerService.toggleFavorite(this.offer);
        this.saved.emit(this.offer.id);
    }
} 