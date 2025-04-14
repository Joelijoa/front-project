import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID, Renderer2, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ImportsModule } from '../header/imports';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { NotificationPopoverComponent } from '../../../modules/notifications/components/notification-popover/notification-popover.component';

@Component({
  selector: 'app-header-candidat',
  imports: [
    ButtonModule, 
    ImportsModule, 
    RouterModule, 
    CommonModule, 
    MenuModule,
    NotificationPopoverComponent
  ],
  templateUrl: './header-candidat.component.html',
  styleUrl: './header-candidat.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class HeaderCandidatComponent implements OnInit, OnDestroy {
  imgLogo ! : string;
  items: MenuItem[] | undefined;
  isLoggedIn: boolean = false;
  isTestMode: boolean = true; // Pour le test
  isLoginHovered: boolean = false;
  isRegisterHovered: boolean = false;
  isContactHovered: boolean = false;
  menuItems: MenuItem[] = [];

  myMenuBar : string = 'myMenuBar';
  isCollapsed = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  goToOffers() {
    this.router.navigate(['/offers']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  goToLogin() {
    this.router.navigate(['/account/login']);
  }

  goToRegister() {
    this.router.navigate(['/account/register']);
  }

  goToProfile() {
    this.router.navigate(['/profil']);
  }

  goToMyApplications() {
    this.router.navigate(['/candidature']);
  }

  goToMyFavorites() {
    this.router.navigate(['/favorite']);
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Méthode de test pour simuler la connexion
  simulateLogin() {
    this.authService.simulateLogin();
  }

  ngOnInit() {
    this.imgLogo = "picture/logo.png";
    
    // S'abonner aux changements d'état de connexion
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.updateMenuItems();
      this.updateMenuButtons();
    });

    if (isPlatformBrowser(this.platformId)) {
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
      this.items = [
        ...baseItems,
        {
          label: 'Profil',
          icon: 'pi pi-user',
          command: () => this.goToProfile()
        },
        {
          label: 'Mes Candidatures',
          icon: 'pi pi-file',
          command: () => this.goToMyApplications()
        },
        {
          label: 'Favoris',
          icon: 'pi pi-heart',
          command: () => this.goToMyFavorites()
        },
        {
          label: 'Déconnexion',
          icon: 'pi pi-sign-out',
          command: () => this.logout()
        }
      ];
    } else if (this.isTestMode) {
      this.items = [
        ...baseItems,
        {
          label: 'Test: Se connecter',
          icon: 'pi pi-sign-in',
          command: () => this.simulateLogin()
        }
      ];
    }
  }

  private updateMenuButtons() {
    if (!this.isLoggedIn) {
      this.menuItems = [
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
    if (scrollPosition > 50) {
      this.myMenuBar = 'opaque-navbar';
    } else {
      this.myMenuBar = 'myMenuBar';
    }
  }

  toogleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll.bind(this));
      const headerElement = document.querySelector('.p-menubar');
      if (headerElement) {
        headerElement.remove();
      }
    }
  }
}
