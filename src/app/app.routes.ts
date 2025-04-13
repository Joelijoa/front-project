import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { AboutComponent } from './modules/about/about.component';

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
    }
];
