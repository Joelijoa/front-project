import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID, Renderer2, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ImportsModule } from './imports'
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, ImportsModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  imgLogo ! : string;
  items: MenuItem[] | undefined;
  isLoggedIn: boolean = false;

  myMenuBar : string = 'myMenuBar';
  isCollapsed = false;

  isLoginHovered: boolean = false;
  isRegisterHovered: boolean = false;
  isContactHovered: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/account/login']);
  }

  goToRegister() {
    this.router.navigate(['/account/register']);
  }

  goToOffers() {
    this.router.navigate(['/offers']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToProfile() {
    this.router.navigate(['/account/profile']);
  }
  goToContact() {
    this.router.navigate(['/contact']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.imgLogo = "picture/logo.png";
    
    // S'abonner aux changements d'état de connexion
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.updateMenuItems();
    });

    if (isPlatformBrowser(this.platformId)) {
      console.log('Initialisation du listener de défilement');
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  private updateMenuItems() {
    const baseItems = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        command: () => this.goToHome()
      },
      {
        label: 'Offres d\'emploi',
        icon: 'pi pi-briefcase',
        command: () => this.goToOffers()
      },
      {
        label: 'À propos',
        icon: 'pi pi-info-circle',
        command: () => this.goToAbout()
      }
    ];

    if (this.isLoggedIn) {
      // Ajouter les onglets pour l'utilisateur connecté
      this.items = [
        ...baseItems,
        {
          label: 'Mon Profil',
          icon: 'pi pi-user',
          command: () => this.goToProfile()
        },
        {
          label: 'Déconnexion',
          icon: 'pi pi-sign-out',
          command: () => this.logout()
        }
      ];
    } else {
      // Ajouter les onglets pour l'utilisateur non connecté
      this.items = [
        ...baseItems,
        {
          label: 'Connexion',
          icon: 'pi pi-sign-in',
          command: () => this.goToLogin()
        },
        {
          label: 'Inscription',
          icon: 'pi pi-user-plus',
          command: () => this.goToRegister()
        }
      ];
    }
  }

  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    console.log('Position de défilement:', scrollPosition);

    if (scrollPosition > 50) {
      console.log('Changement de classe à opaque-navbar');
      this.myMenuBar = 'opaque-navbar';
    } else {
      console.log('Retour à menuBar');
      this.myMenuBar = 'myMenuBar';
    }
  }

  toogleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll.bind(this));
      // Nettoyer le header lors de la destruction du composant
      const headerElement = document.querySelector('.p-menubar');
      if (headerElement) {
        headerElement.remove();
      }
    }
  }
}
