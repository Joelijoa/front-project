import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

interface Periode {
  label: string;
  value: string;
}

interface Region {
  nom: string;
  nombre: number;
  pourcentage: number;
}

interface Client {
  id: number;
  nom: string;
  email: string;
  initiales: string;
  couleur: string;
  type: 'individual' | 'company';
  dateCreation: Date;
  statut: 'active' | 'inactive' | 'pending' | 'blocked';
  activite: number;
}

interface Statistiques {
  totalClients: number;
  croissanceClients: number;
  clientsParticuliers: number;
  pourcentageParticuliers: number;
  clientsEntreprises: number;
  pourcentageEntreprises: number;
  tauxActivite: number;
  evolutionActivite: number;
  topRegions: Region[];
  clientsActifs: Client[];
}

@Component({
  selector: 'app-customer-statistics',
  templateUrl: './customer-statistics.component.html',
  styleUrls: ['./customer-statistics.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    TableModule,
    ChartModule,
    SelectButtonModule,
    CardModule,
    DropdownModule,
    ButtonModule
  ]
})
export class CustomerStatisticsComponent implements OnInit {
  
  // Options de période
  periodes: Periode[] = [
    { label: '7 derniers jours', value: '7j' },
    { label: '30 derniers jours', value: '30j' },
    { label: '3 derniers mois', value: '3m' },
    { label: '12 derniers mois', value: '12m' }
  ];
  periodeSelectionnee: string = '30j';
  
  // États
  chargement: boolean = true;
  statistiques: Statistiques | null = null;

  // Données pour les graphiques
  graphiqueEvolution: any;
  optionsGraphiqueEvolution: any;
  graphiqueRepartition: any;
  optionsGraphiqueRepartition: any;

  // Couleurs pour les graphiques
  couleursGraphiques = {
    primaire: '#4a6baf',
    secondaire: '#6c8ffa',
    success: '#5cb85c',
    warning: '#f0ad4e',
    danger: '#d9534f',
    info: '#5bc0de',
    particulier: '#5bc0de',
    entreprise: '#6c8ffa'
  };

  constructor() { }

  ngOnInit(): void {
    this.initialiserGraphiques();
    this.chargerStatistiques();
  }

  initialiserGraphiques(): void {
    // Configuration du graphique d'évolution
    this.optionsGraphiqueEvolution = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    };

    // Configuration du graphique de répartition
    this.optionsGraphiqueRepartition = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      },
      cutout: '70%'
    };
  }

  chargerStatistiques(): void {
    this.chargement = true;
    
    // Simuler un délai de chargement
    setTimeout(() => {
      // Générer des données simulées pour la démonstration
      this.genererDonneesSimulees();
      this.chargement = false;
    }, 1000);
  }

  genererDonneesSimulees(): void {
    // Données simulées pour le nombre total de clients
    const totalClients = 1842;
    const croissanceClients = 12.5;
    
    // Répartition par type de client
    const clientsParticuliers = 1374;
    const pourcentageParticuliers = Math.round((clientsParticuliers / totalClients) * 100);
    const clientsEntreprises = totalClients - clientsParticuliers;
    const pourcentageEntreprises = 100 - pourcentageParticuliers;
    
    // Taux d'activité
    const tauxActivite = 68;
    const evolutionActivite = 5.2;
    
    // Données simulées pour les régions
    const topRegions: Region[] = [
      { nom: 'Île-de-France', nombre: 523, pourcentage: 28 },
      { nom: 'Auvergne-Rhône-Alpes', nombre: 315, pourcentage: 17 },
      { nom: 'Provence-Alpes-Côte d\'Azur', nombre: 218, pourcentage: 12 },
      { nom: 'Occitanie', nombre: 186, pourcentage: 10 },
      { nom: 'Nouvelle-Aquitaine', nombre: 167, pourcentage: 9 }
    ];
    
    // Générer une liste de clients actifs simulés
    const clientsActifs: Client[] = this.genererClientsActifs(20);
    
    // Compiler toutes les statistiques
    this.statistiques = {
      totalClients,
      croissanceClients,
      clientsParticuliers,
      pourcentageParticuliers,
      clientsEntreprises,
      pourcentageEntreprises,
      tauxActivite,
      evolutionActivite,
      topRegions,
      clientsActifs
    };
    
    // Créer les données pour les graphiques
    this.genererDonneesGraphiques();
  }
  
  genererClientsActifs(nombre: number): Client[] {
    const clients: Client[] = [];
    const types: Array<'individual' | 'company'> = ['individual', 'company'];
    const statuts: Array<'active' | 'inactive' | 'pending' | 'blocked'> = ['active', 'inactive', 'pending', 'blocked'];
    const couleurs = ['#4a6baf', '#6c8ffa', '#5cb85c', '#f0ad4e', '#d9534f', '#5bc0de'];
    
    const nomsPrenoms = [
      'Dupont Jean', 'Martin Sophie', 'Durand Pierre', 'Lefebvre Marie',
      'Moreau Thomas', 'Petit Julie', 'Leroy Nicolas', 'Roux Camille',
      'Dubois Alexandre', 'Laurent Emma', 'Simon Lucas', 'Michel Léa',
      'Garcia Hugo', 'Bernard Chloé', 'Robert Nathan', 'Richard Eva'
    ];
    
    const nomsEntreprises = [
      'Tech Solutions', 'InnovateSoft', 'Digi Media', 'Green Energy',
      'Smart Systems', 'DataFlow', 'EcoImpact', 'Connect Plus',
      'Future Vision', 'Bright Horizons', 'Next Level', 'Pure Logic'
    ];
    
    for (let i = 1; i <= nombre; i++) {
      const estEntreprise = Math.random() > 0.7;
      const type = estEntreprise ? 'company' : 'individual';
      
      let nom, email, initiales;
      if (estEntreprise) {
        nom = nomsEntreprises[Math.floor(Math.random() * nomsEntreprises.length)];
        email = `contact@${nom.toLowerCase().replace(/\s+/g, '')}.com`;
        initiales = nom.split(' ').map(mot => mot[0]).join('');
      } else {
        nom = nomsPrenoms[Math.floor(Math.random() * nomsPrenoms.length)];
        const [prenom, nomFamille] = nom.split(' ').reverse();
        email = `${prenom.toLowerCase()}.${nomFamille.toLowerCase()}@example.com`;
        initiales = nom.split(' ').map(mot => mot[0]).join('');
      }
      
      // Générer une date d'inscription aléatoire dans les 2 dernières années
      const aujourdhui = new Date();
      const deuxAnsAvant = new Date(aujourdhui);
      deuxAnsAvant.setFullYear(aujourdhui.getFullYear() - 2);
      const dateCreation = new Date(deuxAnsAvant.getTime() + Math.random() * (aujourdhui.getTime() - deuxAnsAvant.getTime()));
      
      // Générer un score d'activité aléatoire
      const activite = Math.floor(Math.random() * 100);
      
      // La plupart des clients sont actifs
      const statut = activite > 70 ? 'active' : 
                     activite > 40 ? statuts[Math.floor(Math.random() * 2)] : 
                     statuts[Math.floor(Math.random() * statuts.length)];
      
      clients.push({
        id: i,
        nom,
        email,
        initiales,
        couleur: couleurs[Math.floor(Math.random() * couleurs.length)],
        type,
        dateCreation,
        statut,
        activite
      });
    }
    
    // Trier par activité décroissante
    return clients.sort((a, b) => b.activite - a.activite);
  }
  
  genererDonneesGraphiques(): void {
    // Données pour le graphique d'évolution
    const mois = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
    const derniersMois = [];
    const donneesParticuliers = [];
    const donneesEntreprises = [];
    
    // Générer des données pour les 12 derniers mois
    const dateActuelle = new Date();
    const moisActuel = dateActuelle.getMonth();
    
    for (let i = 0; i < 12; i++) {
      const indiceMois = (moisActuel - i + 12) % 12;
      derniersMois.unshift(mois[indiceMois]);
      
      // Générer des valeurs aléatoires qui suivent une tendance croissante
      const baseParticuliers = 80 + i * 10 + Math.floor(Math.random() * 20);
      const baseEntreprises = 30 + i * 5 + Math.floor(Math.random() * 10);
      
      donneesParticuliers.unshift(baseParticuliers);
      donneesEntreprises.unshift(baseEntreprises);
    }
    
    this.graphiqueEvolution = {
      labels: derniersMois,
      datasets: [
        {
          label: 'Particuliers',
          data: donneesParticuliers,
          fill: false,
          backgroundColor: this.couleursGraphiques.particulier,
          borderColor: this.couleursGraphiques.particulier,
          tension: 0.2
        },
        {
          label: 'Entreprises',
          data: donneesEntreprises,
          fill: false,
          backgroundColor: this.couleursGraphiques.entreprise,
          borderColor: this.couleursGraphiques.entreprise,
          tension: 0.2
        }
      ]
    };
    
    // Données pour le graphique de répartition
    this.graphiqueRepartition = {
      labels: ['Particuliers', 'Entreprises'],
      datasets: [
        {
          data: [this.statistiques?.pourcentageParticuliers, this.statistiques?.pourcentageEntreprises],
          backgroundColor: [this.couleursGraphiques.particulier, this.couleursGraphiques.entreprise],
          hoverBackgroundColor: [this.couleursGraphiques.particulier, this.couleursGraphiques.entreprise]
        }
      ]
    };
  }
}
