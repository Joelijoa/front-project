import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Composants
import { AccountsComponent } from './accounts.component';

// Modules PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AccountsComponent,
    
    // PrimeNG
    TableModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    ConfirmDialogModule,
    TooltipModule,
    RippleModule,
    DialogModule,
    MessageModule,
    DynamicDialogModule
  ],
  providers: []
})
export class AccountsModule { } 