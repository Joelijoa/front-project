import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { KnobModule } from 'primeng/knob';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HeaderRecruteurComponent } from '../../../../../core/components/header-recruteur/header-recruteur.component';

interface Recruiter {
  id: number;
  name: string;
  email: string;
}

interface Statistics {
  activeOffers: number;
  applications: number;
  views: number;
  hires: number;
  offersChange: number;
  applicationsChange: number;
  viewsChange: number;
  hiresChange: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChartModule,
    TableModule,
    BadgeModule,
    TagModule,
    ProgressBarModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    ScrollPanelModule,
    KnobModule,
    FormsModule,
    DropdownModule,
    HeaderRecruteurComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Flag pour indiquer si les graphiques sont initialisés
  isInitialized: boolean = false;
  
  // Données du recruteur
  currentRecruiter: Recruiter = {
    id: 1,
    name: 'Thomas Dubois',
    email: 'thomas.dubois@exemple.fr'
  };
  
  // Statistiques
  statistics: Statistics = {
    activeOffers: 12,
    applications: 87,
    views: 1243,
    hires: 6,
    offersChange: 25,
    applicationsChange: 12,
    viewsChange: 8,
    hiresChange: -3
  };
  
  // Permet d'utiliser Math dans le template
  Math = Math;
  
  // Sélecteur de période
  selectedTimeRange: any = { label: 'Ce mois-ci', value: 'month' };
  timeRanges: any[] = [
    { label: 'Cette semaine', value: 'week' },
    { label: 'Ce mois-ci', value: 'month' },
    { label: 'Ce trimestre', value: 'quarter' },
    { label: 'Cette année', value: 'year' }
  ];
  
  // Données des candidatures récentes
  recentApplications: any[] = [
    {
      id: 1,
      candidate: {
        name: 'Marie Laurent',
        email: 'marie.laurent@exemple.fr'
      },
      jobPost: {
        title: 'Développeur Frontend Angular'
      },
      date: '2023-11-12',
      status: 'Présélectionné'
    },
    {
      id: 2,
      candidate: {
        name: 'Jean Dupont',
        email: 'jean.dupont@exemple.fr'
      },
      jobPost: {
        title: 'Chef de Projet IT'
      },
      date: '2023-11-10',
      status: 'Entretien'
    },
    {
      id: 3,
      candidate: {
        name: 'Sophie Martin',
        email: 'sophie.martin@exemple.fr'
      },
      jobPost: {
        title: 'DevOps Engineer'
      },
      date: '2023-11-08',
      status: 'Test technique'
    },
    {
      id: 4,
      candidate: {
        name: 'Lucas Petit',
        email: 'lucas.petit@exemple.fr'
      },
      jobPost: {
        title: 'UX/UI Designer'
      },
      date: '2023-11-05',
      status: 'Reçu'
    },
    {
      id: 5,
      candidate: {
        name: 'Chloé Durand',
        email: 'chloe.durand@exemple.fr'
      },
      jobPost: {
        title: 'Data Scientist'
      },
      date: '2023-11-03',
      status: 'Refusé'
    }
  ];

  // Données pour les graphiques
  applicationsChartData: any;
  applicationsChartOptions: any;
  visitsChartData: any;
  visitsChartOptions: any;
  stagesChartData: any;
  stagesChartOptions: any;
  
  // Données pour les offres actives
  activeOffers: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Charger d'abord les données statiques
      this.loadActiveOffers();
      
      // Différer le chargement des graphiques pour améliorer l'hydratation
      setTimeout(() => {
        this.initCharts();
        this.isInitialized = true;
      }, 500);
    }
  }

  // Méthode pour obtenir les initiales d'un nom
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  // Méthode pour déterminer la gravité du statut
  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (status) {
      case 'Entretien':
        return 'success';
      case 'Refusé':
        return 'danger';
      case 'Test technique':
        return 'warn';
      case 'Présélectionné':
      case 'Reçu':
      default:
        return 'info';
    }
  }

  // Méthode pour déterminer la gravité du type de contrat
  getContractSeverity(contractType: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (contractType) {
      case 'CDI':
        return 'success';
      case 'CDD':
        return 'warn';
      case 'Stage':
        return 'info';
      case 'Freelance':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  // Méthode pour calculer la progression des applications
  getApplicationProgress(offer: any): number {
    // Supposons que 30 est l'objectif maximal de candidatures
    const target = 30;
    return Math.min(100, (offer.applications / target) * 100);
  }

  // Navigation vers les candidatures ou les offres
  viewAllApplications(): void {
    console.log('Navigating to all applications');
    // Implement navigation logic
  }

  viewAllOffers(): void {
    console.log('Navigating to all offers');
    // Implement navigation logic
  }

  viewApplication(application: any): void {
    console.log('Viewing application', application.id);
    // Implement view logic
  }

  editApplication(application: any): void {
    console.log('Editing application', application.id);
    // Implement edit logic
  }

  editOffer(offer: any): void {
    console.log('Editing offer', offer.id);
    // Implement edit logic
  }

  private initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    // Configuration du graphique des candidatures
    this.applicationsChartData = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
      datasets: [
        {
          label: 'Candidatures',
          data: [12, 19, 13, 25, 34, 17],
          backgroundColor: '#6366F1',
          borderColor: '#6366F1',
          tension: 0.4
        }
      ]
    };

    this.applicationsChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              weight: '500'
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 11
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 11
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
    
    // Configuration du graphique des vues
    this.visitsChartData = {
      labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      datasets: [
        {
          label: 'Vues',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: '#818CF8',
          borderColor: '#818CF8',
          tension: 0.4
        },
        {
          label: 'Clics',
          data: [28, 48, 40, 19, 38, 27, 20],
          backgroundColor: '#C4B5FD',
          borderColor: '#C4B5FD',
          tension: 0.4
        }
      ]
    };

    this.visitsChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              weight: '500'
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 11
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 11
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
    
    // Configuration du graphique de progression des candidats
    this.stagesChartData = {
      labels: ['Reçus', 'Présélectionnés', 'Entretien', 'Test technique', 'Offre envoyée', 'Acceptée'],
      datasets: [
        {
          label: 'Nombre de candidats',
          data: [87, 56, 32, 18, 9, 6],
          backgroundColor: [
            '#818CF8', 
            '#A5B4FC', 
            '#C4B5FD', 
            '#DDD6FE', 
            '#93C5FD', 
            '#BAE6FD'
          ]
        }
      ]
    };
    
    this.stagesChartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            font: {
              weight: '500'
            },
            padding: 15
          }
        }
      },
      cutout: '40%',
      responsive: true
    };
  }

  private loadActiveOffers() {
    this.activeOffers = [
      {
        id: 1,
        title: 'Développeur Frontend Angular',
        location: 'Paris',
        contractType: 'CDI',
        expirationDate: '2023-12-01',
        applications: 24,
        views: 187,
        clickRate: 12.8
      },
      {
        id: 2,
        title: 'Chef de Projet IT',
        location: 'Lyon',
        contractType: 'CDI',
        expirationDate: '2023-11-15',
        applications: 18,
        views: 143,
        clickRate: 15.2
      },
      {
        id: 3,
        title: 'DevOps Engineer',
        location: 'Bordeaux',
        contractType: 'CDD',
        expirationDate: '2023-12-05',
        applications: 9,
        views: 98,
        clickRate: 10.5
      },
      {
        id: 4,
        title: 'UX/UI Designer',
        location: 'Nantes',
        contractType: 'Freelance',
        expirationDate: '2023-11-25',
        applications: 12,
        views: 112,
        clickRate: 13.7
      },
      {
        id: 5,
        title: 'Data Scientist',
        location: 'Toulouse',
        contractType: 'Stage',
        expirationDate: '2023-12-10',
        applications: 7,
        views: 78,
        clickRate: 9.6
      }
    ];
  }
}
