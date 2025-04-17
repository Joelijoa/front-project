import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobOffer } from '../../models/job-offer.model';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
    
@Component({
  selector: 'app-offer-details',
  imports: [
    CommonModule,
    DialogModule,
    TagModule,
    ButtonModule,
    InputTextModule

  ],
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {
  @Input() visible: boolean = false;
  @Input() offer?: JobOffer;
  @Output() visibleChange = new EventEmitter<boolean>();

  getContractTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'CDI': 'CDI',
      'CDD': 'CDD',
      'STAGE': 'Stage',
      'ALTERNANCE': 'Alternance',
      'FREELANCE': 'Freelance'
    };
    return labels[type] || type;
  }

  getContractTypeSeverity(type: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    const severities: { [key: string]: "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined } = {
      'CDI': 'success',
      'CDD': 'warn',
      'STAGE': 'info',
      'ALTERNANCE': 'info',
      'FREELANCE': 'secondary'
    };
    return severities[type] || 'info';
  }

  onClose() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
} 