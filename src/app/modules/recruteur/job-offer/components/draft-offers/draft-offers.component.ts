import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { JobOffer } from '../../models/job-offer.model';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { HeaderRecruteurComponent } from '../../../../../core/components/header-recruteur/header-recruteur.component';
@Component({
  selector: 'app-draft-offers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    HeaderRecruteurComponent,
    TagModule,
    TooltipModule,
    DialogModule,
    OfferFormComponent
  ],
  templateUrl: './draft-offers.component.html',
  styleUrls: ['./draft-offers.component.scss']
})
export class DraftOffersComponent implements OnInit {
  draftOffers: JobOffer[] = [];
  filteredDrafts: JobOffer[] = [];
  searchText: string = '';
  
  // Dialogues
  showOfferForm: boolean = false;
  selectedOffer: JobOffer | undefined;
  isEditMode: boolean = false;
  
  constructor() {}
  
  ngOnInit() {
    this.loadDraftOffers();
  }
  
  loadDraftOffers() {
    // Simuler des données pour la démo
    this.draftOffers = [
      {
        id: '1',
        title: 'Développeur Frontend Angular',
        company: 'Tech Solutions',
        location: 'Paris',
        contractType: 'cdi',
        salary: '45-55k€',
        remote: true,
        status: 'DRAFT',
        publishedDate: new Date(),
        expiryDate: new Date('2024-06-15'),
        applications: 0,
        views: 0,
        description: 'Description du poste',
        requirements: 'Exigences du poste'
      },
      {
        id: '2',
        title: 'UX/UI Designer',
        company: 'Design Studio',
        location: 'Lyon',
        contractType: 'cdd',
        salary: '40-45k€',
        remote: true,
        status: 'DRAFT',
        publishedDate: new Date(),
        expiryDate: new Date('2024-05-20'),
        applications: 0,
        views: 0,
        description: 'Description du poste',
        requirements: 'Exigences du poste'
      }
    ];
    this.filteredDrafts = [...this.draftOffers];
  }
  
  applyFilters() {
    this.filteredDrafts = this.draftOffers.filter(offer => 
      !this.searchText || 
      offer.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      offer.location.toLowerCase().includes(this.searchText.toLowerCase()) ||
      offer.company.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  onSearch() {
    this.applyFilters();
  }
  
  editOffer(offer: JobOffer) {
    this.selectedOffer = offer;
    this.isEditMode = true;
    this.showOfferForm = true;
  }
  
  onOfferFormSubmit(offer: JobOffer) {
    if (this.isEditMode) {
      const index = this.draftOffers.findIndex(o => o.id === offer.id);
      if (index !== -1) {
        this.draftOffers[index] = offer;
      }
    }
    this.showOfferForm = false;
    this.applyFilters();
  }
  
  onOfferFormCancel() {
    this.showOfferForm = false;
    this.selectedOffer = undefined;
  }
  
  getContractTypeLabel(type: string): string {
    switch (type) {
      case 'cdi':
        return 'CDI';
      case 'cdd':
        return 'CDD';
      case 'stage':
        return 'Stage';
      case 'alternance':
        return 'Alternance';
      case 'freelance':
        return 'Freelance';
      default:
        return type;
    }
  }
  
  getContractTypeSeverity(type: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (type) {
      case 'cdi':
        return 'success';
      case 'cdd':
        return 'warn';
      case 'stage':
        return 'info';
      case 'alternance':
        return 'secondary';
      case 'freelance':
        return 'danger';
      default:
        return 'info';
    }
  }
} 