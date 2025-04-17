import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { DashboardComponent } from './modules/recruteur/dashboard/components/dashboard/dashboard.component';
import { AllOfferComponent } from './modules/recruteur/job-offer/components/all-offer/all-offer.component';
import { OfferFormComponent } from './modules/recruteur/job-offer/components/offer-form/offer-form.component';
import { OfferDetailsComponent } from './modules/recruteur/job-offer/components/offer-details/offer-details.component';
import { DraftOffersComponent } from './modules/recruteur/job-offer/components/draft-offers/draft-offers.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Accueil - Yobber'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'À propos - Yobber'
    },
    {
        path: 'account',
        loadChildren: () =>
            import('./modules/account/account.module').then(m => m.AccountModule),
        title: 'Compte - Yobber'
    },
    {
        path: 'offers',
        loadChildren: () =>
            import('./modules/offer/offer.module').then(m => m.OfferModule),
        title: 'Offres d\'emploi - Yobber'
    },
    {
        path: 'profil',
        loadChildren: () => 
            import('./modules/profil/profil.module').then(m => m.ProfilModule),
        title: 'Mon Profil'
    },
    {
        path: 'candidature',
        loadChildren: () =>
            import('./modules/candidature/candidature.module').then(m => m.CandidatureModule),
        title: 'Mes candidatures'
    },
    {
        path: 'favorite',
        loadChildren: () =>
            import('./modules/favorite/favorite.module').then(m => m.FavoriteModule),
        title: 'Mes favoris'
    },
    {
        path: 'notifications',
        loadChildren: () =>
            import('./modules/notifications/notifications.module').then(m => m.NotificationsModule),
        title: 'Notifications'
    },
    {
        path: 'contact',
        loadChildren: () =>
            import('./modules/contact/contact.module').then(m => m.ContactModule),
        title: 'Contact us'
    },
    {
        path: 'recruteur/home',
        component: DashboardComponent,
        title: 'Tableau de bord recruteur'
    },
    {
        path: 'recruteur/dashboard',
        component: DashboardComponent,
        title: 'Tableau de bord recruteur'
    },
    {
        path: 'recruteur/offers',
        component: AllOfferComponent,
        title: 'Mes offres d\'emploi'
    },
    {
        path: 'recruteur/offers/new',
        component: OfferFormComponent,
        title: 'Nouvelle offre'
    },
    {
        path: 'recruteur/offers/drafts',
        component: DraftOffersComponent,
        title: 'Mes brouillons'
    },
    {
        path: 'recruteur/offers/edit/:id',
        component: OfferFormComponent,
        title: 'Modifier l\'offre'
    },
    {
        path: 'recruteur/offers/view/:id',
        component: OfferDetailsComponent,
        title: 'Détails de l\'offre'
    }
];
