import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
import { Subscription, debounceTime, distinctUntilChanged, of } from 'rxjs';

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
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit, OnDestroy {
  searchText: string = '';
  favoriteOffers: Offer[] = [];
  filteredOffers: Offer[] = [];
  private subscription = new Subscription();
  private searchDebounce = new Subscription();

  constructor(
    private offerService: OfferService, 
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Chargement initial des favoris
    this.loadFavoriteOffers();

    // Souscription aux changements des favoris
    this.subscription.add(
      this.offerService.getFavoriteOffersObservable().pipe(
        distinctUntilChanged((prev, curr) => 
          JSON.stringify(prev) === JSON.stringify(curr)
        )
      ).subscribe(offers => {
        this.ngZone.run(() => {
          this.favoriteOffers = [...offers];
          this.filterOffers();
          this.cdr.markForCheck();
        });
      })
    );
  }

  private loadFavoriteOffers(): void {
    const offers = this.offerService.getFavoriteOffers();
    this.favoriteOffers = [...offers];
    this.filterOffers();
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.searchDebounce.unsubscribe();
  }

  filterOffers(): void {
    if (!this.searchText) {
      this.filteredOffers = [...this.favoriteOffers];
    } else {
      const searchLower = this.searchText.toLowerCase();
      this.filteredOffers = this.favoriteOffers.filter(offer => 
        offer.title?.toLowerCase().includes(searchLower) ||
        offer.company?.toLowerCase().includes(searchLower) ||
        offer.description?.toLowerCase().includes(searchLower)
      );
    }
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
    
    // Annuler le debounce précédent
    this.searchDebounce.unsubscribe();
    this.searchDebounce = new Subscription();
    
    // Créer un nouveau debounce
    this.searchDebounce.add(
      of(this.searchText).pipe(
        debounceTime(300)
      ).subscribe(() => {
        this.ngZone.run(() => {
          this.filterOffers();
          this.cdr.markForCheck();
        });
      })
    );
  }

  removeFromFavorites(offer: Offer): void {
    this.offerService.toggleFavorite(offer);
  }

  refreshFavorites(): void {
    this.loadFavoriteOffers();
  }

  trackByOfferId(index: number, offer: Offer): string {
    return offer.id;
  }
}
