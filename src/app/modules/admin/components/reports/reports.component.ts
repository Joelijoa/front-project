import { ChartPeriodOption, RecentOffer, TotalReports } from './model/reports';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ChartModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule
  ],
})
export class ReportsComponent implements OnInit {
  // Données pour les cartes de statistiques
  totals = [
    new TotalReports('Total des visites', 200000, 12),
    new TotalReports('Visiteurs uniques', 45800, -5),
    new TotalReports('Utilisateurs actifs', 1250, 8),
    new TotalReports('Offres publiées', 378, 22),
  ];

  // Options de période pour les filtres
  periodOptions: ChartPeriodOption[] = [
    { label: 'Cette semaine', value: 'week' },
    { label: 'Ce mois', value: 'month' },
    { label: 'Ce trimestre', value: 'quarter' },
    { label: 'Cette année', value: 'year' },
  ];

  selectedPeriod: ChartPeriodOption = this.periodOptions[1]; // Par défaut "Ce mois"

  // Données pour le graphique en camembert
  pieData = {
    labels: ['Offres actives', 'Offres pourvues', 'Offres expirées', 'Offres en attente'],
    datasets: [
      {
        data: [120, 85, 98, 75],
        backgroundColor: ['#003366', '#118ab2', '#06d6a0', '#ffd166'],
        hoverBackgroundColor: ['#004080', '#13a0cc', '#07eeb1', '#ffda80'],
        borderWidth: 0
      },
    ],
  };

  // Options pour le graphique en camembert
  pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.formattedValue;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((context.raw / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  // Données pour le graphique en barres
  barData = {
    labels: ['Développement', 'Marketing', 'Design', 'Finance', 'RH', 'Commercial'],
    datasets: [
      {
        label: 'Candidats',
        data: [65, 45, 80, 35, 30, 55],
        backgroundColor: '#003366',
        barThickness: 25,
        borderRadius: 6,
      },
      {
        label: 'Postes ouverts',
        data: [40, 25, 35, 20, 15, 30],
        backgroundColor: '#118ab2',
        barThickness: 25,
        borderRadius: 6,
      }
    ]
  };

  // Options pour le graphique en barres
  barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          color: 'rgba(200, 200, 200, 0.2)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Données pour le graphique en ligne
  lineData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Recrutements finalisés',
        data: [12, 19, 15, 20, 28, 25, 35, 30, 28, 33, 39, 42],
        fill: false,
        borderColor: '#06d6a0',
        tension: 0.4,
        pointBackgroundColor: '#06d6a0',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4
      },
      {
        label: 'Candidatures reçues',
        data: [65, 72, 78, 85, 95, 110, 125, 130, 140, 150, 165, 180],
        fill: false,
        borderColor: '#118ab2',
        tension: 0.4,
        pointBackgroundColor: '#118ab2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ]
  };

  // Options pour le graphique en ligne
  lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3
      }
    }
  };

  // Données pour le graphique radar
  radarData = {
    labels: ['JavaScript', 'Java', 'Python', 'React', 'Angular', 'Node.js', 'C#', 'DevOps', 'UX/UI', 'Data Science'],
    datasets: [
      {
        label: 'Demande du marché',
        data: [90, 75, 85, 88, 70, 83, 65, 80, 78, 82],
        backgroundColor: 'rgba(0, 51, 102, 0.2)',
        borderColor: '#003366',
        pointBackgroundColor: '#003366',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#003366'
      },
      {
        label: 'Candidats disponibles',
        data: [65, 80, 70, 50, 45, 60, 75, 40, 55, 30],
        backgroundColor: 'rgba(17, 138, 178, 0.2)',
        borderColor: '#118ab2',
        pointBackgroundColor: '#118ab2',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#118ab2'
      }
    ]
  };

  // Options pour le graphique radar
  radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(200, 200, 200, 0.2)'
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        },
        ticks: {
          backdropColor: 'transparent',
          color: '#6c757d',
          font: {
            size: 10
          }
        },
        pointLabels: {
          font: {
            size: 11
          }
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  // Données pour le tableau des offres récentes
  recentOffers: RecentOffer[] = [
    { title: 'Développeur Frontend Angular', client: 'Tech Solutions', applications: 28, status: 'Active', date: '15/04/2023' },
    { title: 'Chef de Projet Digital', client: 'Media Group', applications: 15, status: 'Pourvue', date: '22/03/2023' },
    { title: 'DevOps Engineer', client: 'Cloud Services', applications: 12, status: 'Active', date: '10/04/2023' },
    { title: 'UX/UI Designer', client: 'Creative Agency', applications: 32, status: 'Expirée', date: '01/03/2023' },
    { title: 'Data Scientist', client: 'Data Analytics', applications: 18, status: 'Active', date: '05/04/2023' },
    { title: 'Responsable Marketing', client: 'E-commerce Inc.', applications: 24, status: 'En attente', date: '12/04/2023' },
  ];

  constructor() {}

  ngOnInit() {}
}
