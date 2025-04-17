import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { HeaderRecruteurComponent } from '../../../../../core/components/header-recruteur/header-recruteur.component';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    AvatarModule,
    DialogModule,
    InputTextarea,
    DropdownModule,
    PasswordModule,
    ToastModule,
    RippleModule,
    HeaderRecruteurComponent
  ],
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers: [MessageService]
})
export class CompanyProfileComponent {
  company = {
    name: 'Nom de l\'entreprise',
    description: 'Description de l\'entreprise...',
    logo: 'assets/images/company-logo.png',
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      website: ''
    },
    contactInfo: {
      phone: '',
      email: '',
      address: '',
      activityDomain: '',
      sector: ''
    }
  };

  showPasswordDialog = false;
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  activityDomains = [
    { label: 'Informatique', value: 'IT' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Santé', value: 'Health' },
    { label: 'Éducation', value: 'Education' },
    { label: 'Commerce', value: 'Retail' }
  ];

  sectors = [
    { label: 'Privé', value: 'Private' },
    { label: 'Public', value: 'Public' },
    { label: 'Mixte', value: 'Mixed' }
  ];

  constructor(private messageService: MessageService) {}

  updateProfile() {
    // Logique de mise à jour du profil
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Profil mis à jour avec succès'
    });
  }

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Les mots de passe ne correspondent pas'
      });
      return;
    }

    // Logique de changement de mot de passe
    this.showPasswordDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Mot de passe changé avec succès'
    });
  }
}