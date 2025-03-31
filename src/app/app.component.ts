import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { ChatBubbleComponent } from './shared/components/chat-bubble/chat-bubble.component';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CookieConsentComponent, ChatBubbleComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'startech-front';

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });
    }
}
