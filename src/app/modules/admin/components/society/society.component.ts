import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Society } from './model/society';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    DialogModule
  ]
})

export class SocietyComponent implements OnInit {
  // Propriétés pour le popup
  displaySocietyDetails: boolean = false;
  selectedSociety: Society | null = null;

  societys: Society[] = [
    new Society(1, "INWI", "Télécommunication", "Rabat", "contact@inwi.ma", "+212 5 22 33 44 55", "/picture/logo.png", "Opérateur de télécommunications marocain", "www.inwi.ma"),
    new Society(2, "OCP Group", "Industrie", "Casablanca", "info@ocpgroup.ma", "+212 5 22 92 30 00", "/picture/axa.png", "Leader mondial dans l'industrie des phosphates", "www.ocpgroup.ma"),
    new Society(3, "Maroc Telecom", "Télécommunication", "Rabat", "contact@iam.ma", "+212 5 37 71 90 00", "/picture/atti.png", "Premier opérateur de télécommunications au Maroc", "www.iam.ma"),
    new Society(4, "Bank Al Maghrib", "Finance", "Rabat", "info@bkam.ma", "+212 5 37 70 26 26", "/picture/bmce.png", "Banque centrale du Royaume du Maroc", "www.bkam.ma"),
    new Society(5, "Royal Air Maroc", "Transport", "Casablanca", "contact@royalairmaroc.com", "+212 5 22 91 22 00", "/picture/bim.jpg", "Compagnie aérienne nationale du Maroc", "www.royalairmaroc.com"),
    new Society(6, "Attijariwafa Bank", "Finance", "Casablanca", "info@attijariwafa.com", "+212 5 22 29 88 88", "/picture/danone.png", "Première banque du Maroc", "www.attijariwafabank.com"),
    new Society(7, "ONCF", "Transport", "Rabat", "contact@oncf.ma", "+212 5 37 70 85 20", "/picture/sg.png", "Office National des Chemins de Fer", "www.oncf.ma"),
    new Society(8, "Centrale Danone", "Agroalimentaire", "Casablanca", "info@danone.ma", "+212 5 22 20 04 04", "/picture/um6p.png", "Leader des produits laitiers au Maroc", "www.centraledanone.ma"),
  ]

  constructor() { }

  ngOnInit() {
  }

  // Méthode pour afficher les détails d'une entreprise
  showSocietyDetails(society: Society): void {
    this.selectedSociety = society;
    this.displaySocietyDetails = true;
  }
}
