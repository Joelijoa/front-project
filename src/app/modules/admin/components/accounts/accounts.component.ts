import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { isPlatformBrowser } from '@angular/common';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

// Types existants
import { CompanyAccount } from '../../models/company-account.interface';

interface Account {
  id: number;
  companyName: string;
  email: string;
  createdAt: Date;
  contactName?: string;
  phone?: string;
  status: 'pending' | 'processing' | 'rejected' | 'approved';
  rejectionReason?: string;
  address?: string;
  registrationNumber?: string;
  taxId?: string;
  legalRepresentative?: string;
  industry?: string;
  establishedDate?: Date;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TabViewModule,
    ConfirmDialogModule,
    TooltipModule,
    RippleModule,
    DialogModule,
    DynamicDialogModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class AccountsComponent implements OnInit {
  pendingAccounts: Account[] = [];
  rejectedAccounts: Account[] = [];
  processingAccounts: Account[] = [];
  
  selectedAccount: Account | null = null;
  rejectionReason: string = '';
  
  detailsRef: DynamicDialogRef | undefined;
  loading: boolean = true;
  rejectionDialogVisible: boolean = false;
  
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAccounts();
    }
  }

  loadAccounts(): void {
    this.loading = true;
    
    // Simulation de données au lieu d'appeler le service
    setTimeout(() => {
      // Comptes en attente
      this.pendingAccounts = [
        {
          id: 1,
          companyName: 'Tech Solutions SARL',
          email: 'contact@techsolutions.fr',
          createdAt: new Date('2023-05-15T10:30:00'),
          contactName: 'Jean Dupont',
          phone: '06 12 34 56 78',
          status: 'pending'
        },
        {
          id: 2,
          companyName: 'Innov Consulting',
          email: 'info@innovconsulting.fr',
          createdAt: new Date('2023-05-17T14:20:00'),
          contactName: 'Marie Lambert',
          phone: '07 98 76 54 32',
          status: 'pending'
        },
        {
          id: 3,
          companyName: 'Digital Factory SAS',
          email: 'contact@digitalfactory.fr',
          createdAt: new Date('2023-05-18T09:15:00'),
          contactName: 'Pierre Martin',
          phone: '06 45 67 89 10',
          status: 'pending'
        }
      ];
      
      // Comptes en traitement
      this.processingAccounts = [
        {
          id: 4,
          companyName: 'Data Analytics Pro',
          email: 'info@dataanalytics.fr',
          createdAt: new Date('2023-05-10T11:45:00'),
          contactName: 'Sophie Dubois',
          phone: '07 65 43 21 09',
          status: 'processing'
        },
        {
          id: 5,
          companyName: 'Cloud Services Plus',
          email: 'contact@cloudservices.fr',
          createdAt: new Date('2023-05-12T16:30:00'),
          contactName: 'Thomas Petit',
          phone: '06 11 22 33 44',
          status: 'processing'
        }
      ];
      
      // Comptes refusés
      this.rejectedAccounts = [
        {
          id: 6,
          companyName: 'Web Design Express',
          email: 'contact@webdesignexpress.fr',
          createdAt: new Date('2023-05-05T13:20:00'),
          contactName: 'Julien Robert',
          phone: '07 55 66 77 88',
          status: 'rejected',
          rejectionReason: 'Documents incomplets. Veuillez soumettre un extrait K-bis à jour.'
        },
        {
          id: 7,
          companyName: 'Marketing Digital SARL',
          email: 'info@marketingdigital.fr',
          createdAt: new Date('2023-05-08T10:10:00'),
          contactName: 'Émilie Fournier',
          phone: '06 99 88 77 66',
          status: 'rejected',
          rejectionReason: 'Information d\'entreprise non vérifiable. La société n\'existe pas dans notre base de données.'
        }
      ];
      
      this.loading = false;
    }, 1000);
  }

  viewAccountDetails(account: Account): void {
    this.selectedAccount = account;
    this.detailsRef = this.dialogService.open(AccountDetailsComponent, {
      header: 'Détails du compte',
      width: '70%',
      data: { accountId: account.id }
    });
    
    this.detailsRef.onClose.subscribe(() => {
      // Pas besoin de recharger pour la démo
      // this.loadAccounts();
    });
  }

  approveAccount(account: Account): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir approuver le compte de l'entreprise ${account.companyName} ?`,
      header: 'Confirmation',
      icon: 'pi pi-check-circle',
      accept: () => {
        // Supprimer le compte de la liste correspondante
        if (account.status === 'pending') {
          this.pendingAccounts = this.pendingAccounts.filter(a => a.id !== account.id);
        } else if (account.status === 'processing') {
          this.processingAccounts = this.processingAccounts.filter(a => a.id !== account.id);
        }
        
        this.messageService.add({
          severity: 'success',
          summary: 'Compte approuvé',
          detail: `Le compte de ${account.companyName} a été approuvé avec succès`
        });
      }
    });
  }

  openRejectionDialog(account: Account): void {
    this.selectedAccount = account;
    this.rejectionReason = '';
    this.rejectionDialogVisible = true;
  }

  confirmReject(): void {
    if (!this.selectedAccount || !this.rejectionReason.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez fournir une raison de rejet'
      });
      return;
    }
    
    // Supprimer le compte de la liste correspondante
    if (this.selectedAccount.status === 'pending') {
      this.pendingAccounts = this.pendingAccounts.filter(a => a.id !== this.selectedAccount!.id);
    } else if (this.selectedAccount.status === 'processing') {
      this.processingAccounts = this.processingAccounts.filter(a => a.id !== this.selectedAccount!.id);
    }
    
    // Ajouter le compte à la liste des comptes rejetés
    const rejectedAccount = {
      ...this.selectedAccount,
      status: 'rejected' as const,
      rejectionReason: this.rejectionReason
    };
    
    this.rejectedAccounts.push(rejectedAccount);
    
    this.messageService.add({
      severity: 'success',
      summary: 'Compte rejeté',
      detail: `Le compte de ${this.selectedAccount.companyName} a été rejeté`
    });
    
    this.closeRejectionDialog();
  }

  closeRejectionDialog(): void {
    this.rejectionDialogVisible = false;
    this.rejectionReason = '';
    this.selectedAccount = null;
  }

  markAsProcessing(account: Account): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir marquer le compte de ${account.companyName} comme "en traitement" ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Ici, nous simulons le changement de statut en local
        this.pendingAccounts = this.pendingAccounts.filter(a => a.id !== account.id);
        account.status = 'processing';
        this.processingAccounts.push(account);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Compte mis à jour',
          detail: `Le compte de ${account.companyName} est maintenant en traitement`
        });
      }
    });
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR').format(date);
  }
} 