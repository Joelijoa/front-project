import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from '../offer-details/offer-details.component';

const routes: Routes = [
    {
        path: '',
        component: OfferListComponent
    },
    {
        path: ':id',
        component: OfferDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OfferRoutingModule { }
