import { Component, Inject, PLATFORM_ID, ApplicationRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderCandidatComponent } from './core/components/header-candidat/header-candidat.component';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { ChatBubbleComponent } from './shared/components/chat-bubble/chat-bubble.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderCandidatComponent,
    CookieConsentComponent,
    ChatBubbleComponent
  ]
})
export class AppComponent {
  private isLoginPageValue: boolean = false;
  private isRecruiterRouteValue: boolean = false;

  constructor(
    private router: Router,
    private appRef: ApplicationRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // S'abonner aux événements de navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Mettre à jour les valeurs si on est dans un navigateur
      if (isPlatformBrowser(this.platformId)) {
        const url = this.router.url;
        this.isLoginPageValue = url.includes('/login');
        this.isRecruiterRouteValue = url.includes('/recruteur');
      }
      // Déclencher la détection de changements
      this.appRef.tick();
    });
  }

  get isLoginPage(): boolean {
    return this.isLoginPageValue;
  }
  
  get isRecruiterRoute(): boolean {
    return this.isRecruiterRouteValue;
  }
}
