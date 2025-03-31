import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { StorageService } from '../../../core/services/storage.service';

interface CookiePreferences {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
}

@Component({
    selector: 'app-cookie-consent',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cookie-consent.component.html',
    styleUrls: ['./cookie-consent.component.scss'],
    animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({ transform: 'translateY(100%)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
            ])
        ])
    ]
})
export class CookieConsentComponent implements OnInit {
    showConsent = false;
    hasConsent = false;
    preferences: CookiePreferences = {
        essential: true,
        analytics: false,
        marketing: false
    };

    constructor(private storageService: StorageService) {}

    ngOnInit() {
        // Vérifier si l'utilisateur a déjà donné son consentement
        const savedConsent = this.storageService.getItem('cookieConsent');
        if (savedConsent) {
            this.hasConsent = true;
            try {
                this.preferences = JSON.parse(savedConsent);
            } catch (e) {
                console.error('Erreur lors de la lecture des préférences de cookies:', e);
            }
        } else {
            // Afficher la popup après un délai
            setTimeout(() => {
                this.showConsent = true;
            }, 2000);
        }
    }

    onToggleConsent(): void {
        this.showConsent = !this.showConsent;
    }

    acceptAll(): void {
        this.preferences = {
            essential: true,
            analytics: true,
            marketing: true
        };
        this.savePreferences();
    }

    savePreferences(): void {
        this.storageService.setItem('cookieConsent', JSON.stringify(this.preferences));
        this.hasConsent = true;
        this.showConsent = false;
    }
} 