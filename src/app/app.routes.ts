import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { AboutComponent } from './modules/about/about.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'À propos - Yobber'
    },
    {
        path: 'account',
        loadChildren: () =>
            import('./modules/account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'offers',
        loadChildren: () =>
            import('./modules/offer/offer.module').then(m => m.OfferModule)
    }
];
