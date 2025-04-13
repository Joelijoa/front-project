import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Offer, OfferSearchCriteria, PaginatedOffers } from '../models/offer.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class OfferService {
    private apiUrl = `${environment.apiUrl}/offers`;
    private favoriteOffersSubject = new BehaviorSubject<Offer[]>([]);
    private isBrowser: boolean;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.loadFavorites();
    }

    private loadFavorites(): void {
        if (this.isBrowser) {
            const favorites = localStorage.getItem('favoriteOffers');
            if (favorites) {
                this.favoriteOffersSubject.next(JSON.parse(favorites));
            }
        }
    }

    private saveFavorites(): void {
        if (this.isBrowser) {
            localStorage.setItem('favoriteOffers', JSON.stringify(this.favoriteOffersSubject.value));
        }
    }

    // Récupère la liste des offres avec pagination et filtres
    getOffers(criteria: OfferSearchCriteria): Observable<PaginatedOffers> {
        let params = new HttpParams()
            .set('page', criteria.page.toString())
            .set('limit', criteria.limit.toString());

        if (criteria.query) {
            params = params.set('query', criteria.query);
        }

        if (criteria.filters) {
            const { type, experience, education, location, salary, datePosted } = criteria.filters;
            
            if (type) params = params.set('type', type);
            if (experience) params = params.set('experience', experience);
            if (education) params = params.set('education', education);
            if (location) params = params.set('location', location);
            if (datePosted) params = params.set('datePosted', datePosted);
            
            if (salary?.min) params = params.set('salaryMin', salary.min.toString());
            if (salary?.max) params = params.set('salaryMax', salary.max.toString());
        }

        return this.http.get<PaginatedOffers>(this.apiUrl, { params }).pipe(
            map(response => ({
                ...response,
                items: response.items.map(offer => ({
                    ...offer,
                    isFavorite: this.isOfferInFavorites(offer.id)
                }))
            }))
        );
    }

    // Récupère une offre par son ID
    getOfferById(id: string): Observable<Offer> {
        return this.http.get<Offer>(`${this.apiUrl}/${id}`).pipe(
            map(offer => ({
                ...offer,
                isFavorite: this.isOfferInFavorites(offer.id)
            }))
        );
    }

    // Vérifie si une offre est dans les favoris
    private isOfferInFavorites(offerId: string): boolean {
        return this.favoriteOffersSubject.value.some(offer => offer.id === offerId);
    }

    // Récupère la liste des offres en favoris
    getFavoriteOffers(): Offer[] {
        return this.favoriteOffersSubject.value;
    }

    // Observable pour suivre les changements dans les favoris
    getFavoriteOffersObservable(): Observable<Offer[]> {
        return this.favoriteOffersSubject.asObservable();
    }

    // Ajoute ou retire une offre des favoris
    toggleFavorite(offer: Offer): void {
        const currentFavorites = this.favoriteOffersSubject.value;
        const index = currentFavorites.findIndex(o => o.id === offer.id);

        if (index === -1) {
            // Ajouter aux favoris
            const updatedOffer = { ...offer, isFavorite: true };
            this.favoriteOffersSubject.next([...currentFavorites, updatedOffer]);
        } else {
            // Retirer des favoris
            this.favoriteOffersSubject.next(
                currentFavorites.filter(o => o.id !== offer.id)
            );
        }

        this.saveFavorites();
    }
} 