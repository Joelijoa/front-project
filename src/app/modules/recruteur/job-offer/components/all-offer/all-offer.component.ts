import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderRecruteurComponent } from '../../../../../core/components/header-recruteur/header-recruteur.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';

interface JobOffer {
  id: number;
  title: string;
  company: string;
  location: string;
  contractType: string;
  salary: string;
  remote: string;
  status: string;
  publishedDate: Date | null;
  expiryDate: Date | null;
  applications: number;
  views: number;
}

@Component({
  selector: 'app-all-offer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderRecruteurComponent,
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    TooltipModule,
    MultiSelectModule,
    DialogModule,
    ChipModule,
    BadgeModule
  ],
  templateUrl: './all-offer.component.html',
  styleUrl: './all-offer.component.scss'
})
export class AllOfferComponent implements OnInit {
  offers: JobOffer[] = [];
  filteredOffers: JobOffer[] = [];
  
  // Filtres
  searchText: string = '';
  selectedStatuses: any[] = [];
  selectedTypes: any[] = [];
  
  // Options de filtre
  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Brouillon', value: 'draft' },
    { label: 'Expirée', value: 'expired' },
    { label: 'Archivée', value: 'archived' }
  ];
  
  contractTypeOptions = [
    { label: 'CDI', value: 'cdi' },
    { label: 'CDD', value: 'cdd' },
    { label: 'Stage', value: 'stage' },
    { label: 'Alternance', value: 'alternance' },
    { label: 'Freelance', value: 'freelance' }
  ];
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Simuler des données pour la démo
    this.loadOffers();
    this.applyFilters();
  }
  
  loadOffers() {
    // Données de test
    this.offers = [
      {
        id: 1,
        title: 'Développeur Frontend Angular',
        company: 'Tech Solutions',
        location: 'Paris',
        contractType: 'cdi',
        salary: '45-55k€',
        remote: 'hybrid',
        status: 'active',
        publishedDate: new Date('2023-12-15'),
        expiryDate: new Date('2024-06-15'),
        applications: 12,
        views: 245
      },
      {
        id: 2,
        title: 'UX/UI Designer',
        company: 'Design Studio',
        location: 'Lyon',
        contractType: 'cdd',
        salary: '40-45k€',
        remote: 'remote',
        status: 'active',
        publishedDate: new Date('2023-12-20'),
        expiryDate: new Date('2024-05-20'),
        applications: 8,
        views: 186
      },
      {
        id: 3,
        title: 'Chef de Projet IT',
        company: 'Tech Solutions',
        location: 'Paris',
        contractType: 'cdi',
        salary: '60-70k€',
        remote: 'onsite',
        status: 'active',
        publishedDate: new Date('2023-12-10'),
        expiryDate: new Date('2024-06-10'),
        applications: 15,
        views: 320
      },
      {
        id: 4,
        title: 'Data Scientist',
        company: 'AI Innovations',
        location: 'Toulouse',
        contractType: 'cdi',
        salary: '55-65k€',
        remote: 'remote',
        status: 'active',
        publishedDate: new Date('2023-11-30'),
        expiryDate: new Date('2024-05-30'),
        applications: 10,
        views: 275
      },
      {
        id: 5,
        title: 'DevOps Engineer',
        company: 'Cloud Services',
        location: 'Nantes',
        contractType: 'cdi',
        salary: '50-60k€',
        remote: 'hybrid',
        status: 'draft',
        publishedDate: new Date('2023-12-25'),
        expiryDate: new Date('2024-06-25'),
        applications: 0,
        views: 0
      },
      {
        id: 6,
        title: 'Stage Marketing Digital',
        company: 'MarketPro',
        location: 'Bordeaux',
        contractType: 'stage',
        salary: '800€/mois',
        remote: 'onsite',
        status: 'expired',
        publishedDate: new Date('2023-10-15'),
        expiryDate: new Date('2024-01-15'),
        applications: 20,
        views: 350
      },
      {
        id: 7,
        title: 'Développeur Backend Node.js',
        company: 'Web Agency',
        location: 'Lille',
        contractType: 'alternance',
        salary: 'Selon profil',
        remote: 'hybrid',
        status: 'active',
        publishedDate: new Date('2023-12-05'),
        expiryDate: new Date('2024-06-05'),
        applications: 5,
        views: 190
      },
      {
        id: 8,
        title: 'Product Owner',
        company: 'Innovation Lab',
        location: 'Marseille',
        contractType: 'cdi',
        salary: '55-65k€',
        remote: 'remote',
        status: 'draft',
        publishedDate: null,
        expiryDate: null,
        applications: 0,
        views: 0
      }
    ];
  }
  
  applyFilters() {
    this.filteredOffers = this.offers.filter(offer => {
      // Filtrer par recherche texte
      const searchMatches = !this.searchText || 
        offer.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        offer.location.toLowerCase().includes(this.searchText.toLowerCase()) ||
        offer.company.toLowerCase().includes(this.searchText.toLowerCase());
      
      // Filtrer par statut
      const statusMatches = this.selectedStatuses.length === 0 || 
        this.selectedStatuses.some(s => s.value === offer.status);
      
      // Filtrer par type de contrat
      const typeMatches = this.selectedTypes.length === 0 || 
        this.selectedTypes.some(t => t.value === offer.contractType);
      
      return searchMatches && statusMatches && typeMatches;
    });
  }
  
  onSearch() {
    this.applyFilters();
  }
  
  onStatusFilterChange() {
    this.applyFilters();
  }
  
  onTypeFilterChange() {
    this.applyFilters();
  }
  
  clearFilters() {
    this.searchText = '';
    this.selectedStatuses = [];
    this.selectedTypes = [];
    this.applyFilters();
  }
  
  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | undefined {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'secondary';
      case 'expired':
        return 'danger';
      case 'archived':
        return 'info';
      default:
        return 'secondary';
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
  
  getStatusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'draft':
        return 'Brouillon';
      case 'expired':
        return 'Expirée';
      case 'archived':
        return 'Archivée';
      default:
        return status;
    }
  }
  
  getRemoteLabel(remote: string): string {
    switch (remote) {
      case 'remote':
        return 'Télétravail';
      case 'hybrid':
        return 'Hybride';
      case 'onsite':
        return 'Sur site';
      default:
        return remote;
    }
  }
  
  editOffer(offer: JobOffer) {
    // Naviguer vers la page d'édition
    this.router.navigate([`/recruteur/offers/edit/${offer.id}`]);
  }
  
  createNewOffer() {
    // Naviguer vers la page de création
    this.router.navigate(['/recruteur/offers/new']);
  }
  
  viewOffer(offer: JobOffer) {
    // Naviguer vers la page de détail
    this.router.navigate([`/recruteur/offers/view/${offer.id}`]);
  }
  
  duplicateOffer(offer: JobOffer) {
    // Logique pour dupliquer une offre
    console.log('Duplication de l\'offre', offer.id);
  }
}
