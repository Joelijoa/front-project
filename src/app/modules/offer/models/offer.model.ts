// Types d'offres
export enum OfferType {
    CDI = 'CDI',
    CDD = 'CDD',
    STAGE = 'Stage',
    ALTERNANCE = 'Alternance',
    FREELANCE = 'Freelance'
}

// Niveaux d'expérience
export enum ExperienceLevel {
    JUNIOR = 'Junior (0-2 ans)',
    INTERMEDIAIRE = 'Intermédiaire (2-5 ans)',
    SENIOR = 'Senior (5-10 ans)',
    EXPERT = 'Expert (10+ ans)'
}

// Niveaux d'études
export enum EducationLevel {
    BAC = 'Bac',
    BAC2 = 'Bac +2',
    BAC3 = 'Bac +3',
    BAC5 = 'Bac +5',
    BAC8 = 'Bac +8'
}

// Interface principale d'une offre
export interface Offer {
    id: string;
    title: string;
    company: string;
    location: string;
    type: OfferType;
    description: string;
    requirements: string[];
    experience: ExperienceLevel;
    educationLevel: EducationLevel;
    salary?: {
        min: number;
        max: number;
        currency: string;
    };
    isSaved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Interface pour les filtres de recherche
export interface OfferFilters {
    type?: OfferType;
    experience?: ExperienceLevel;
    education?: EducationLevel;
    location?: string;
    salary?: {
        min?: number;
        max?: number;
    };
    datePosted?: 'today' | 'week' | 'month' | 'year';
}

// Interface pour les critères de recherche
export interface OfferSearchCriteria {
    query?: string;
    filters?: OfferFilters;
    page: number;
    limit: number;
}

// Interface pour la réponse paginée
export interface PaginatedOffers {
    items: Offer[];
    total: number;
    page: number;
    limit: number;
} 