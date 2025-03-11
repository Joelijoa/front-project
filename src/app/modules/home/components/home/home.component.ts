import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../core/components/header/header.component";
import { FooterComponent } from "../../../../core/components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule, ButtonModule],
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
