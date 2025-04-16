import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderCandidatComponent } from '../header-candidat/header-candidat.component';
import { HeaderRecruteurComponent } from '../header-recruteur/header-recruteur.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-main',
  standalone: true,
  imports: [CommonModule, HeaderCandidatComponent, HeaderRecruteurComponent],
  template: `
    <app-header-candidat *ngIf="!isLoggedIn || (isLoggedIn && userType !== 'recruiter')"></app-header-candidat>
    <app-header-recruteur *ngIf="isLoggedIn && userType === 'recruiter'"></app-header-recruteur>
  `,
  styles: []
})
export class HeaderMainComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userType: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (isPlatformBrowser(this.platformId)) {
          this.userType = localStorage.getItem('userType');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
} 