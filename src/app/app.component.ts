import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { ChatBubbleComponent } from './shared/components/chat-bubble/chat-bubble.component';
import { HeaderComponent } from './core/components/header/header.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderCandidatComponent } from "./core/components/header-candidat/header-candidat.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CookieConsentComponent, ChatBubbleComponent, HeaderCandidatComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'startech-front';
    isLoginPage = false;


    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              this.isLoginPage = this.router.url.includes('/login');
            }
          });
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
                window.scrollTo(0, 0);
            }
        });
    }
}
