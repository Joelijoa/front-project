import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteComponent,
    title: 'Mes Favoris'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule { }
