import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from '../../../services/account.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface AccountDetails {
  id: number;
  companyName: string;
  requestDate: Date;
  contactName: string;
  email: string;
  phone: string;
  status: 'pending' | 'processing' | 'rejected' | 'approved';
  rejectionReason?: string;
  companyInfo: {
    vatNumber: string;
    registrationNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    zipCode: string;
    country: string;
    foundedYear: number;
    employeeCount: number;
    website?: string;
    industry: string;
  };
  documents: {
    id: number;
    name: string;
    type: string;
    uploadDate: Date;
    status: 'valid' | 'invalid' | 'pending';
  }[];
}

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    CardModule,
    TabViewModule,
    DividerModule,
    TableModule,
    ProgressSpinnerModule
  ],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent implements OnInit {
  account: AccountDetails | null = null;
  loading = true;
  
  constructor(
    private accountService: AccountService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {}
  
  ngOnInit(): void {
    const accountId = this.config.data?.accountId;
    if (accountId) {
      this.loadAccountDetails(accountId);
    } else {
      this.loading = false;
    }
  }
  
  loadAccountDetails(accountId: number): void {
    this.loading = true;
    
    // Simulation d'un appel API
    setTimeout(() => {
      this.account = {
        id: accountId,
        companyName: 'Tech Solutions SARL',
        requestDate: new Date('2023-05-15'),
        contactName: 'Jean Dupont',
        email: 'j.dupont@techsolutions.fr',
        phone: '06 12 34 56 78',
        status: 'pending',
        companyInfo: {
          vatNumber: 'FR82123456789',
          registrationNumber: '123 456 789 00012',
          addressLine1: '23 Avenue des Entrepreneurs',
          city: 'Paris',
          zipCode: '75001',
          country: 'France',
          foundedYear: 2015,
          employeeCount: 42,
          website: 'https://techsolutions.example.com',
          industry: 'Services informatiques'
        },
        documents: [
          {
            id: 1,
            name: 'Extrait K-bis',
            type: 'PDF',
            uploadDate: new Date('2023-05-14'),
            status: 'valid'
          },
          {
            id: 2,
            name: 'Justificatif d\'identité',
            type: 'PDF',
            uploadDate: new Date('2023-05-14'),
            status: 'valid'
          },
          {
            id: 3,
            name: 'Relevé d\'identité bancaire',
            type: 'PDF',
            uploadDate: new Date('2023-05-14'),
            status: 'pending'
          }
        ]
      };
      this.loading = false;
    }, 1000);
  }
  
  closeDialog(): void {
    this.ref.close();
  }
  
  downloadDocument(documentId: number): void {
    // Implémentation de téléchargement
    console.log(`Téléchargement du document ${documentId}`);
  }
} 