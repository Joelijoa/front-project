import { Component, Inject, PLATFORM_ID, ApplicationRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderCandidatComponent } from './core/components/header-candidat/header-candidat.component';
import { filter } from 'rxjs/operators';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { ChatBubbleComponent } from './shared/components/chat-bubble/chat-bubble.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderCandidatComponent, CookieConsentComponent,ChatBubbleComponent
  ]
})
export class AppComponent {
  showNavBar: boolean = false;

  constructor(
    private router: Router,
    private appRef: ApplicationRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.subscribeToRouterEvents();
  }

  private subscribeToRouterEvents(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.updateNavBarVisibility(this.router.url);
      }
      this.appRef.tick(); // Trigger change detection
    });
  }

  private updateNavBarVisibility(url: string): void {
    const hiddenRoutes = ['/login', '/recruteur', '/admin'];
    this.showNavBar = !hiddenRoutes.includes(url);
    console.log('showNavBar:', this.showNavBar); // Debugging line
  }
}