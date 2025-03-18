import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Services et Models
import { OfferService } from '../../services/offer.service';
import { Offer, OfferSearchCriteria, OfferFilters, PaginatedOffers } from '../../models/offer.model';
import { OfferType, ExperienceLevel, EducationLevel } from '../../models/offer.model';

// Components
import { OfferSearchComponent } from '../offer-search/offer-search.component';
import { OfferFiltersComponent } from '../offer-filters/offer-filters.component';
import { OfferCardComponent } from '../offer-card/offer-card.component';
import { HeaderComponent } from "../../../../core/components/header/header.component";
import { FooterComponent } from "../../../../core/components/footer/footer.component";

interface SearchCriteria {
    query: string;
    country: string | null;
}

@Component({
    selector: 'app-offer-list',
    templateUrl: './offer-list.component.html',
    styleUrls: ['./offer-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        PaginatorModule,
        ProgressSpinnerModule,
        OfferSearchComponent,
        OfferFiltersComponent,
        OfferCardComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class OfferListComponent implements OnInit {
    loading: boolean = false;
    offers: any[] = [];
    totalOffers: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 12;

    private allOffers: any[] = [
        {
            id: '1',
            title: 'Développeur Frontend Angular',
            company: 'TechCorp',
            location: 'Paris, France',
            type: 'CDI',
            experience: '2-3 ans',
            education: 'Bac+3',
            description: 'Nous recherchons un développeur Frontend Angular passionné pour rejoindre notre équipe...',
            requirements: ['Angular', 'TypeScript', 'HTML/CSS', 'Git'],
            salary: {
                min: 45000,
                max: 55000,
                currency: 'EUR'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            title: 'Développeur Fullstack JavaScript',
            company: 'WebSolutions',
            location: 'Lyon, France',
            type: 'CDI',
            experience: '3-5 ans',
            education: 'Bac+5',
            description: 'Poste de développeur Fullstack JavaScript au sein d\'une équipe dynamique...',
            requirements: ['Node.js', 'React', 'MongoDB', 'AWS'],
            salary: {
                min: 50000,
                max: 60000,
                currency: 'EUR'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '3',
            title: 'Développeur Frontend React/Angular',
            company: 'WebStudio',
            location: 'Bordeaux, France',
            type: 'CDD',
            experience: '0-2 ans',
            education: 'Bac+3',
            description: 'Startup en pleine croissance recherche un développeur Frontend passionné par les frameworks modernes. Vous travaillerez sur des projets innovants dans un environnement dynamique.',
            requirements: ['React', 'Angular', 'JavaScript/TypeScript', 'HTML/CSS', 'Git', 'Tests unitaires'],
            salary: {
                min: 35000,
                max: 42000,
                currency: 'EUR'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '4',
            title: 'Architecte Solutions Cloud',
            company: 'Cloud Systems',
            location: 'Toulouse, France',
            type: 'Freelance',
            experience: '5+ ans',
            education: 'Bac+5',
            description: 'Nous recherchons un architecte cloud expérimenté pour concevoir et mettre en œuvre des solutions cloud innovantes pour nos clients. Expertise en AWS et Azure requise.',
            requirements: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'DevOps', 'Microservices'],
            salary: {
                min: 70000,
                max: 90000,
                currency: 'EUR'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    ngOnInit(): void {
        this.loadOffers();
    }

    onSearch(criteria: SearchCriteria): void {
        console.log('Recherche avec:', criteria);
        this.applyFilters();
    }

    onFiltersChange(filters: any): void {
        console.log('Filtres changés:', filters);
        this.applyFilters();
    }

    onPageChange(event: PaginatorState): void {
        this.currentPage = (event.first || 0) / (event.rows || this.itemsPerPage) + 1;
        this.applyFilters();
    }

    onOfferSaved(offerId: string): void {
        console.log('Offre sauvegardée:', offerId);
    }

    private loadOffers(): void {
        this.loading = true;
        setTimeout(() => {
            this.applyFilters();
            this.loading = false;
        }, 500);
    }

    private applyFilters(): void {
        // Pour l'instant, on affiche toutes les offres sans filtrage
        this.offers = this.allOffers;
        this.totalOffers = this.offers.length;
    }
} 