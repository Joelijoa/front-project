import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

interface Candidature {
  id: number;
  dateSoumission: Date;
  intitulePoste: string;
  nomEntreprise: string;
  statut: string;
  details: {
    description: string;
    competences: string[];
    experience: string;
    diplome: string;
    lettreMotivation: string;
  };
}

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-candidature',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    DialogModule,
    InputTextModule,
    SelectModule,
    TooltipModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss'],
})
export class CandidatureComponent implements OnInit {
  candidatures: Candidature[] = [];
  filteredCandidatures: Candidature[] = [];
  displayDialog = false;
  candidatureSelectionnee: Candidature | null = null;
  loading = false;
  
  // Filtres
  searchText = '';
  selectedStatut: SelectOption | null = null;
  selectedDate: SelectOption | null = null;
  
  // Options des selects
  statutOptions: SelectOption[] = [
    { label: 'En cours', value: 'En cours' },
    { label: 'Acceptée', value: 'Acceptée' },
    { label: 'Refusée', value: 'Refusée' }
  ];
  
  dateOptions: SelectOption[] = [
    { label: 'Plus récentes', value: 'recent' },
    { label: 'Plus anciennes', value: 'old' }
  ];

  ngOnInit() {
    this.loading = true;
    // Exemple de données - À remplacer par un appel API
    setTimeout(() => {
      this.candidatures = [
        {
          id: 1,
          dateSoumission: new Date('2024-03-15'),
          intitulePoste: 'Développeur Full Stack',
          nomEntreprise: 'Tech Solutions',
          statut: 'En cours',
          details: {
            description: 'Recherche d\'un développeur full stack expérimenté...',
            competences: ['Angular', 'Node.js', 'MongoDB'],
            experience: '3-5 ans',
            diplome: 'Bac+5 en informatique',
            lettreMotivation: 'Je suis très intéressé par ce poste...'
          }
        },
        {
          id: 2,
          dateSoumission: new Date('2024-03-10'),
          intitulePoste: 'Développeur Frontend',
          nomEntreprise: 'Web Corp',
          statut: 'Acceptée',
          details: {
            description: 'Recherche d\'un développeur frontend...',
            competences: ['React', 'TypeScript', 'CSS'],
            experience: '2-3 ans',
            diplome: 'Bac+3 en informatique',
            lettreMotivation: 'Je suis motivé par ce poste...'
          }
        }
      ];
      this.filteredCandidatures = [...this.candidatures];
      this.loading = false;
    }, 1000);
  }

  filterCandidatures() {
    this.filteredCandidatures = this.candidatures.filter(candidature => {
      const matchesSearch = !this.searchText || 
        candidature.intitulePoste.toLowerCase().includes(this.searchText.toLowerCase()) ||
        candidature.nomEntreprise.toLowerCase().includes(this.searchText.toLowerCase()) ||
        candidature.statut.toLowerCase().includes(this.searchText.toLowerCase());
      
      const matchesStatut = !this.selectedStatut || 
        candidature.statut === this.selectedStatut.value;
      
      return matchesSearch && matchesStatut;
    });

    if (this.selectedDate) {
      this.filteredCandidatures.sort((a, b) => {
        if (this.selectedDate?.value === 'recent') {
          return b.dateSoumission.getTime() - a.dateSoumission.getTime();
        } else {
          return a.dateSoumission.getTime() - b.dateSoumission.getTime();
        }
      });
    }
  }

  resetFilters() {
    this.searchText = '';
    this.selectedStatut = null;
    this.selectedDate = null;
    this.filterCandidatures();
  }

  afficherDetails(candidature: Candidature) {
    this.candidatureSelectionnee = candidature;
    this.displayDialog = true;
  }

  modifierCandidature(candidature: Candidature) {
    // À implémenter
    console.log('Modifier candidature:', candidature);
  }

  supprimerCandidature(candidature: Candidature) {
    // À implémenter
    console.log('Supprimer candidature:', candidature);
  }
} 