import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { Application } from '../../models/application.model';
import { ApplicationDetailsComponent } from '../application-details/application-details.component';
import { HeaderRecruteurComponent } from '../../../../../core/components/header-recruteur/header-recruteur.component';
import { ChipModule } from 'primeng/chip';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-all-applications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    InputTextModule,
    HeaderRecruteurComponent,
    ButtonModule,
    TagModule,
    TooltipModule,
    DialogModule,
    ApplicationDetailsComponent,
    ChipModule,
    InputGroup,
    InputGroupAddon
  ],
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.scss']
})
export class AllApplicationsComponent implements OnInit {
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  searchText: string = '';
  
  // Dialogues
  showApplicationDetails: boolean = false;
  selectedApplication: Application | undefined;
  
  constructor() {}
  
  ngOnInit() {
    this.loadApplications();
  }
  
  loadApplications() {
    // Simuler des données pour la démo
    this.applications = [
      {
        id: '1',
        candidate: {
          id: '1',
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean.dupont@email.com',
          phone: '06 12 34 56 78',
          location: 'Paris, France',
          resume: 'CV_Jean_Dupont.pdf',
          coverLetter: 'Lettre_de_motivation_Jean_Dupont.pdf'
        },
        offer: {
          id: '1',
          title: 'Développeur Frontend Angular',
          company: 'Tech Solutions'
        },
        status: 'PENDING',
        applicationDate: new Date('2024-03-15'),
        lastUpdate: new Date('2024-03-15')
      },
      {
        id: '2',
        candidate: {
          id: '2',
          firstName: 'Marie',
          lastName: 'Martin',
          email: 'marie.martin@email.com',
          phone: '07 89 12 34 56',
          location: 'Lyon, France',
          resume: 'CV_Marie_Martin.pdf',
          coverLetter: 'Lettre_de_motivation_Marie_Martin.pdf'
        },
        offer: {
          id: '2',
          title: 'UX/UI Designer',
          company: 'Design Studio'
        },
        status: 'REVIEWED',
        applicationDate: new Date('2024-03-10'),
        lastUpdate: new Date('2024-03-12')
      }
    ];
    this.filteredApplications = [...this.applications];
  }
  
  applyFilters() {
    this.filteredApplications = this.applications.filter(application => 
      !this.searchText || 
      application.candidate.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      application.candidate.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      application.offer.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      application.offer.company.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  onSearch() {
    this.applyFilters();
  }
  
  viewApplication(application: Application) {
    this.selectedApplication = application;
    this.showApplicationDetails = true;
  }
  
  onApplicationDetailsClose() {
    this.showApplicationDetails = false;
    this.selectedApplication = undefined;
  }
  
  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'En attente';
      case 'REVIEWED':
        return 'Examinée';
      case 'ACCEPTED':
        return 'Acceptée';
      case 'REJECTED':
        return 'Rejetée';
      default:
        return status;
    }
  }
  
  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (status) {
      case 'PENDING':
        return 'info';
      case 'REVIEWED':
        return 'warn';
      case 'ACCEPTED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      default:
        return 'info';
    }
  }
} 