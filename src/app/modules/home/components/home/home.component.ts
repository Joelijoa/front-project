import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../core/components/header/header.component";
import { FooterComponent } from "../../../../core/components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

interface Partner {
  name: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule, ButtonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  titre_1!: string;
  Sous_titre_1 !: string 
  img_illustration !: string;
  titre_2!: string;
  Sous_titre_2!: string;
  img_illustration_2!: string;

  // Section partenaires
  titre_partenaires: string = "Ils nous font confiance";
  partners: Partner[] = [
    { name: 'Entreprise 1', image: "picture/atti.png" },
    { name: 'Entreprise 2', image: 'picture/axa.png' },
    { name: 'Entreprise 3', image: 'picture/bmce.png' },
    { name: 'Entreprise 4', image: 'picture/danone.png' },
    { name: 'Entreprise 5', image: 'picture/sg.png' },
    { name: 'Entreprise 6', image: 'picture/bim.jpg' },
    { name: 'Entreprise 7', image: 'picture/um6p.png' }
  ];

  // Options du carrousel
  carouselResponsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    }
  ];

  // Section 3
  titre_3: string = "Comment ça marche";
  processSteps: ProcessStep[] = [
    {
      icon: 'pi pi-user',
      title: 'Je crée un nouveau compte',
      description: 'J\'entre toutes les informations me concernant pour améliorer ma visibilité.'
    },
    {
      icon: 'pi pi-check-square',
      title: 'Je passe gratuitement le test personnalité',
      description: 'J\'identifie mes capacités innées et mes valeurs phares.'
    },
    {
      icon: 'pi pi-file',
      title: 'Je joins mon CV',
      description: 'Je joins mon CV à mon profil et je remplis tous les champs du cv Yobber.'
    },
    {
      icon: 'pi pi-list',
      title: 'Je choisis l\'offre d\'emploi qui me correspond',
      description: 'Je postule et j\'envoie ma candidature.'
    }
  ];

  // Statistiques
  stats = {
    candidats: '+100',
    entreprises: '+400'
  };

  ngOnInit(): void {
    this.titre_1 = "La puissance de la connexion client";
    this.Sous_titre_1 = "Chaque interaction, une opportunité.";
    this.img_illustration = "picture/yobber-photo.png"
    
    this.titre_2 = "Notre impact";
    this.Sous_titre_2 = "Interaction entreprise et candidat efficace";
    this.img_illustration_2 = "picture/yobber-photo-2.png";
  }
}
