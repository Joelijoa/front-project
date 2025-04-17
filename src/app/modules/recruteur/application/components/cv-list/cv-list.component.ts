import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CV } from '../../models/cv.model';
import { HeaderRecruteurComponent } from "../../../../../core/components/header-recruteur/header-recruteur.component";


@Component({
  selector: 'app-cv-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    HeaderRecruteurComponent
],
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss']
})
export class CvListComponent {
  selectedCV: CV | null = null;
  isSummarizing: boolean = false;

  // Données de test
  cvs: CV[] = [
    {
      id: '1',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@example.com',
      fileName: 'CV_John_Doe.pdf',
      uploadDate: new Date(),
      content: 'Contenu du CV...',
      skills: ['Angular', 'TypeScript', 'Node.js'],
      experience: [
        {
          title: 'Développeur Frontend',
          company: 'Tech Corp',
          period: '2020 - Présent',
          description: 'Développement d\'applications web avec Angular'
        }
      ],
      education: [
        {
          degree: 'Master en Informatique',
          institution: 'Université Paris',
          period: '2018 - 2020'
        }
      ]
    }
  ];

  onCVSelect(cv: CV) {
    this.selectedCV = cv;
    this.isSummarizing = false;
  }

  summarizeCV() {
    if (this.selectedCV) {
      this.isSummarizing = true;
      // Ici, vous pouvez appeler un service pour générer le résumé
      // Pour l'instant, nous utilisons un résumé factice
      this.selectedCV.summary = `
        ${this.selectedCV.candidateName} est un développeur expérimenté avec une expertise en ${this.selectedCV.skills.join(', ')}.
        Il a travaillé chez ${this.selectedCV.experience[0].company} en tant que ${this.selectedCV.experience[0].title}.
        Il est titulaire d'un ${this.selectedCV.education[0].degree} de ${this.selectedCV.education[0].institution}.
      `;
    }
  }
} 