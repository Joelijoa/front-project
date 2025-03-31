import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../core/components/footer/footer.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent]
})
export class AboutComponent {
  companyInfo = {
    mission: {
      title: 'Notre Mission',
      description: 'Yobber révolutionne le recrutement tech en connectant les meilleurs talents avec les entreprises innovantes. Notre plateforme utilise l\'intelligence artificielle et une approche humaine pour créer des matchs parfaits entre les candidats et les employeurs.',
      values: [
        {
          icon: 'pi pi-check-circle',
          title: 'Transparence',
          description: 'Nous croyons en une communication ouverte et honnête avec nos utilisateurs.'
        },
        {
          icon: 'pi pi-send',
          title: 'Innovation',
          description: 'Nous repoussons constamment les limites pour améliorer l\'expérience de recrutement.'
        },
        {
          icon: 'pi pi-users',
          title: 'Communauté',
          description: 'Nous construisons un écosystème tech dynamique et inclusif.'
        }
      ]
    },
    story: {
      title: 'Notre Histoire',
      milestones: [
        {
          year: 2022,
          title: 'Naissance de Yobber',
          description: 'Fondée par une équipe passionnée de tech et de RH.'
        },
        {
          year: 2023,
          title: 'Croissance Explosive',
          description: '10,000+ profils tech et 500+ entreprises nous font confiance.'
        },
        {
          year: 2024,
          title: 'Innovation Continue',
          description: 'Lancement de notre IA de matching et expansion internationale.'
        }
      ]
    },
    features: [
      {
        icon: 'pi pi-wave-pulse',
        title: 'Matching Intelligent',
        description: 'Notre algorithme analyse en profondeur les compétences, l\'expérience et les aspirations pour créer des connexions pertinentes.'
      },
      {
        icon: 'pi pi-clock',
        title: 'Processus Optimisé',
        description: 'Réduisez votre temps de recrutement de 60% grâce à notre plateforme intuitive.'
      },
      {
        icon: 'pi pi-chart-line',
        title: 'Analyses Détaillées',
        description: 'Suivez vos performances et optimisez votre stratégie de recrutement.'
      },
      {
        icon: 'pi pi-shield',
        title: 'Sécurité Maximale',
        description: 'Protection des données et confidentialité garanties selon les normes RGPD.'
      }
    ],
    team: {
      title: 'Notre Équipe',
      description: 'Une équipe diverse de passionnés qui travaillent chaque jour pour révolutionner le recrutement tech.',
      stats: [
        {
          number: '30+',
          label: 'Experts'
        },
        {
          number: '8',
          label: 'Pays'
        },
        {
          number: '24/7',
          label: 'Support'
        }
      ]
    },
    contact: {
      title: 'Contactez-nous',
      address: 'Prestigia ISMAGI Hay Riad, 12000 Rabat',
      email: 'yobbercontact@gmail.com',
      phone: '+212 (0) 6 94 82 69 89',
      social: {
        linkedin: 'https://linkedin.com/company/yobber',
        twitter: 'https://twitter.com/yobber',
        facebook: 'https://facebook.com/yobber'
      }
    }
  };
} 