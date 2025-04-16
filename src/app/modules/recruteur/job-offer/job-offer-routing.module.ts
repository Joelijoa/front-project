import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOfferComponent } from './components/all-offer/all-offer.component';

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
  }
  // Les autres routes seront ajoutées au fur et à mesure du développement
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOfferRoutingModule { }
