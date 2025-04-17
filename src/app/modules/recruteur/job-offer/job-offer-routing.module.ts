import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOfferComponent } from './components/all-offer/all-offer.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { DraftOffersComponent } from './components/draft-offers/draft-offers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: 'all',
    component: AllOfferComponent,
    title: 'Mes offres d\'emploi'
  },
  {
    path: 'drafts',
    component: DraftOffersComponent,
    title: 'Mes brouillons'
  },
  {
    path: 'view/:id',
    component: OfferDetailsComponent,
    title: 'Détails de l\'offre'
  },
  {
    path: 'new',
    component: OfferFormComponent,
    title: 'Nouvelle offre'
  },
  {
    path: 'edit/:id',
    component: OfferFormComponent,
    title: 'Modifier l\'offre'
  }
  // Les autres routes seront ajoutées au fur et à mesure du développement
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOfferRoutingModule { }
