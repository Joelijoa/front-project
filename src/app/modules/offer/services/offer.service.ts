import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Offer, OfferSearchCriteria, PaginatedOffers } from '../models/offer.model';
import { OfferType, ExperienceLevel, EducationLevel } from '../models/offer.model';
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
                try {
                    const parsedFavorites = JSON.parse(favorites);
                    console.log('Favoris chargés depuis localStorage:', parsedFavorites);
                    
                    // Convertir les dates qui sont des chaînes en objets Date
                    const processedFavorites = parsedFavorites.map((offer: Offer) => {
                        if (offer.createdAt && typeof offer.createdAt === 'string') {
                            offer.createdAt = new Date(offer.createdAt);
                        }
                        if (offer.updatedAt && typeof offer.updatedAt === 'string') {
                            offer.updatedAt = new Date(offer.updatedAt);
                        }
                        if (offer.publicationDate && typeof offer.publicationDate === 'string') {
                            offer.publicationDate = new Date(offer.publicationDate);
                        }
                        return offer;
                    });
                    
                    this.favoriteOffersSubject.next(processedFavorites);
                } catch (error) {
                    console.error('Erreur lors du parsing des favoris:', error);
                    this.favoriteOffersSubject.next([]);
                }
            } else {
                console.log('Aucun favori trouvé dans localStorage');
                this.favoriteOffersSubject.next([]);
            }
        }
    }

    private saveFavorites(): void {
        if (this.isBrowser) {
            const favorites = this.favoriteOffersSubject.value;
            localStorage.setItem('favoriteOffers', JSON.stringify(favorites));
            // Émettre une nouvelle valeur pour forcer la mise à jour
            this.favoriteOffersSubject.next([...favorites]);
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
        console.log('toggleFavorite appelé avec:', offer);
        
        if (!offer || !offer.id) {
            console.error('Offre invalide:', offer);
            return;
        }
        
        try {
            const currentFavorites = this.favoriteOffersSubject.value;
            const index = currentFavorites.findIndex(o => o.id === offer.id);

            let newFavorites: Offer[];

            if (index === -1) {
                // Ajouter aux favoris avec les valeurs par défaut si nécessaire
                const updatedOffer = {
                    ...offer,
                    isFavorite: true,
                    createdAt: offer.createdAt || new Date(),
                    updatedAt: offer.updatedAt || new Date(),
                    publicationDate: offer.publicationDate || new Date(),
                    requirements: offer.requirements || [],
                    skills: offer.skills || [],
                    benefits: offer.benefits || [],
                    type: offer.type || OfferType.CDI,
                    experience: offer.experience || ExperienceLevel.JUNIOR,
                    educationLevel: offer.educationLevel || EducationLevel.BAC3,
                    salary: offer.salary || { min: 0, max: 0, currency: 'EUR' },
                    contractType: offer.contractType || 'CDI',
                    title: offer.title || 'Sans titre',
                    company: offer.company || 'Entreprise inconnue',
                    description: offer.description || 'Aucune description disponible'
                };
                
                newFavorites = [...currentFavorites, updatedOffer];
                console.log('Offre ajoutée aux favoris:', updatedOffer);
            } else {
                // Retirer des favoris
                newFavorites = currentFavorites.filter(o => o.id !== offer.id);
                console.log('Offre retirée des favoris:', offer.id);
            }

            // Mettre à jour le BehaviorSubject et localStorage
            this.favoriteOffersSubject.next(newFavorites);
            this.saveToLocalStorage(newFavorites);
            
            console.log('Favoris mis à jour, nouvelle taille:', newFavorites.length);
        } catch (error) {
            console.error('Erreur lors de la mise à jour des favoris:', error);
        }
    }
    
    private saveToLocalStorage(favorites: Offer[]): void {
        if (this.isBrowser) {
            try {
                localStorage.setItem('favoriteOffers', JSON.stringify(favorites));
            } catch (error) {
                console.error('Erreur lors de la sauvegarde dans localStorage:', error);
            }
        }
    }
} 