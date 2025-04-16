import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.isLoggedInSubject.next(isLoggedIn);
    }
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isLoggedIn', 'true');
    }
    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.isLoggedInSubject.next(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userType');
      // Forcer un rechargement de la page pour s'assurer que tous les composants sont actualisés
      window.location.href = "/";
    }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Méthode de test pour simuler la connexion
  simulateLogin() {
    this.isLoggedInSubject.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  simulateRecruiterLogin() {
    this.isLoggedInSubject.next(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', 'recruiter');
    // Rediriger vers la page d'accueil du recruteur
    return 'recruteur/home';
  }
} 