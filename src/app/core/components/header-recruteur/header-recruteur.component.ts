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
  selector: 'app-header-recruteur',
  imports: [
    ButtonModule, 
    ImportsModule, 
    RouterModule, 
    CommonModule, 
    MenuModule,
    NotificationPopoverComponent
  ],
  templateUrl: './header-recruteur.component.html',
  styleUrl: './header-recruteur.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class HeaderRecruteurComponent implements OnInit, OnDestroy {
  imgLogo ! : string;
  items: MenuItem[] | undefined;
  isLoggedIn: boolean = false;
  isTestMode: boolean = true;
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userType');
    }
    window.location.href = "/";
  }

  goToLogin() {
    this.router.navigate(['/account/login']);
  }

  goToRegister() {
    this.router.navigate(['/account/register']);
  }

  goToDashboard() {
    this.router.navigate(['/recruteur/dashboard']);
  }

  goToOffers() {
    this.router.navigate(['/recruteur/offers']);
  }

  goToApplications() {
    this.router.navigate(['/recruteur/applications']);
  }

  goToSettings() {
    this.router.navigate(['/recruteur/settings']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  simulateLogin() {
    this.authService.simulateLogin();
  }

  simulateRecruiterLogin() {
    this.authService.simulateRecruiterLogin();
  }

  ngOnInit() {
    this.imgLogo = "picture/logo.png";
    
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
      }
    ];

    if (this.isLoggedIn) {
      this.items = [
        ...baseItems,
        {
          label: 'Tableau de bord',
          icon: 'pi pi-chart-bar',
          command: () => this.goToDashboard()
        },
        {
          label: 'Mes offres d\'emploi',
          icon: 'pi pi-briefcase',
          items: [
            {
              label: 'Voir toutes les offres',
              icon: 'pi pi-list',
              command: () => this.goToOffers()
            },
            {
              label: 'Mes Brouillons',
              icon: 'pi pi-file-o',
              command: () => this.router.navigate(['/recruteur/offers/drafts'])
            }
          ]
        },
        {
          label: 'Candidatures reçues',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Toutes les candidatures',
              icon: 'pi pi-list',
              command: () => this.goToApplications()
            },
            {
              label: 'CV reçus',
              icon: 'pi pi-file-pdf',
              command: () => this.router.navigate(['/recruteur/applications/cv'])
            }
          ]
        },
        {
          label: 'Paramètres du compte',
          icon: 'pi pi-cog',
          items: [
            {
              label: 'Informations entreprise',
              icon: 'pi pi-building',
              command: () => this.router.navigate(['/recruteur/settings/company'])
            }
          ]
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
          label: 'Test',
          icon: 'pi pi-sign-in',
          items: [
            {
              label: 'Candidat',
              icon: 'pi pi-user',
              command: () => this.simulateLogin()
            },
            {
              label: 'Recruteur',
              icon: 'pi pi-briefcase',
              command: () => this.simulateRecruiterLogin()
            }
          ]
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