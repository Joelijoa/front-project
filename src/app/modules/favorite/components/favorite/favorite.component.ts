import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { OfferService } from '../../../offer/services/offer.service';
import { Offer } from '../../../offer/models/offer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    CommonModule, 
    InputTextModule, 
    CardModule, 
    ButtonModule, 
    FormsModule, 
    RouterModule, 
    HttpClientModule,
    TooltipModule
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit, OnDestroy {
  searchText: string = '';
  favoriteOffers: Offer[] = [];
  filteredOffers: Offer[] = [];
  private subscription: Subscription;

  constructor(private offerService: OfferService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    // Chargement initial des favoris
    this.favoriteOffers = this.offerService.getFavoriteOffers();
    this.filteredOffers = [...this.favoriteOffers];

    // Souscription aux changements
    this.subscription.add(
      this.offerService.getFavoriteOffersObservable().subscribe(offers => {
        console.log('Offres en favoris reçues:', offers);
        this.favoriteOffers = offers;
        this.filterOffers();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filterOffers(): void {
    if (!this.searchText) {
      this.filteredOffers = [...this.favoriteOffers];
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.filteredOffers = this.favoriteOffers.filter(offer => 
      offer.title.toLowerCase().includes(searchLower) ||
      offer.company.toLowerCase().includes(searchLower) ||
      offer.description.toLowerCase().includes(searchLower)
    );
  }

  removeFromFavorites(offer: Offer): void {
    this.offerService.toggleFavorite(offer);
  }
}
