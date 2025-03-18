import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Offer, OfferSearchCriteria, PaginatedOffers } from '../models/offer.model';

@Injectable({
    providedIn: 'root'
})
export class OfferService {
    private apiUrl = `${environment.apiUrl}/offers`;
    private savedOffersSubject = new BehaviorSubject<Set<string>>(new Set());

    constructor(private http: HttpClient) {
        this.loadSavedOffers();
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
                    isSaved: this.savedOffersSubject.value.has(offer.id)
                }))
            }))
        );
    }

    // Récupère une offre par son ID
    getOfferById(id: string): Observable<Offer> {
        return this.http.get<Offer>(`${this.apiUrl}/${id}`).pipe(
            map(offer => ({
                ...offer,
                isSaved: this.savedOffersSubject.value.has(offer.id)
            }))
        );
    }

    // Sauvegarde/retire une offre des favoris
    toggleSaveOffer(offerId: string): void {
        const savedOffers = this.savedOffersSubject.value;
        if (savedOffers.has(offerId)) {
            savedOffers.delete(offerId);
        } else {
            savedOffers.add(offerId);
        }
        this.savedOffersSubject.next(new Set(savedOffers));
        this.saveSavedOffers();
    }

    // Récupère la liste des offres sauvegardées
    getSavedOffers(): Observable<Set<string>> {
        return this.savedOffersSubject.asObservable();
    }

    // Charge les offres sauvegardées depuis le localStorage
    private loadSavedOffers(): void {
        const saved = localStorage.getItem('savedOffers');
        if (saved) {
            this.savedOffersSubject.next(new Set(JSON.parse(saved)));
        }
    }

    // Sauvegarde les offres dans le localStorage
    private saveSavedOffers(): void {
        localStorage.setItem(
            'savedOffers',
            JSON.stringify(Array.from(this.savedOffersSubject.value))
        );
    }
} 