import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import { MenuModule } from 'primeng/menu';
import { HeaderRecruteurComponent } from '../../../../../core/components/header-recruteur/header-recruteur.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

interface Company {
  logoUrl: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  sector: string;
  size: number;
  website?: string;
  linkedin?: string;
  twitter?: string;
}

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
    MenuModule,
    HeaderRecruteurComponent
  ],
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers: [MessageService]
})
export class CompanyProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  company: Company = {
    logoUrl: '',
    name: 'TechCorp',
    description: 'Entreprise leader dans le développement de solutions innovantes',
    email: 'contact@techcorp.com',
    phone: '01 23 45 67 89',
    address: 'Paris, France',
    sector: 'Technologies',
    size: 250
  };

  menuItems: MenuItem[] = [
    {
      label: 'Informations personnelles',
      icon: 'pi pi-user',
      command: () => this.showPersonalInfoDialog = true
    },
    {
      label: 'Sécurité',
      icon: 'pi pi-lock',
      command: () => this.showSecurityDialog = true
    }
  ];

  showPersonalInfoDialog = false;
  showSecurityDialog = false;
  showSocialLinksDialog = false;

  personalInfoForm: FormGroup;
  securityForm: FormGroup;
  socialLinksForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      phone: [''],
      address: [''],
      sector: [''],
      size: [null]
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });

    this.socialLinksForm = this.fb.group({
      website: [''],
      linkedin: [''],
      twitter: ['']
    });
  }

  ngOnInit() {
    this.initializePersonalInfoForm();
    this.initializeSocialLinksForm();
  }

  initializePersonalInfoForm() {
    this.personalInfoForm.patchValue({
      name: this.company.name,
      description: this.company.description,
      phone: this.company.phone,
      address: this.company.address,
      sector: this.company.sector,
      size: this.company.size
    });
  }

  initializeSocialLinksForm() {
    this.socialLinksForm.patchValue({
      website: this.company.website || '',
      linkedin: this.company.linkedin || '',
      twitter: this.company.twitter || ''
    });
  }

  updatePersonalInfo() {
    if (this.personalInfoForm.valid) {
      const formValue = this.personalInfoForm.value;
      this.company = { ...this.company, ...formValue };
      this.showPersonalInfoDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Informations mises à jour avec succès'
      });
    }
  }

  updatePassword() {
    if (this.securityForm.valid) {
      const { newPassword, confirmPassword } = this.securityForm.value;
      
      if (newPassword !== confirmPassword) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Les mots de passe ne correspondent pas'
        });
        return;
      }

      this.showSecurityDialog = false;
      this.securityForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Mot de passe mis à jour avec succès'
      });
    }
  }

  updateSocialLinks() {
    if (this.socialLinksForm.valid) {
      const formValue = this.socialLinksForm.value;
      this.company = { ...this.company, ...formValue };
      this.showSocialLinksDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Réseaux sociaux mis à jour avec succès'
      });
    }
  }

  onUploadLogo() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.company.logoUrl = e.target?.result as string;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Logo mis à jour avec succès'
        });
      };
      reader.readAsDataURL(file);
    }
  }

  editSocialLinks() {
    this.showSocialLinksDialog = true;
  }
}