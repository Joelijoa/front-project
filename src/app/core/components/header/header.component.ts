import { Component, Inject, OnInit, PLATFORM_ID, Renderer2, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ImportsModule } from './imports'
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, ImportsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit{
  imgLogo ! : string;
  items: MenuItem[] | undefined;

  myMenuBar : string = 'myMenuBar';
  isCollapsed = false;

  isLoginHovered: boolean = false;
  isRegisterHovered: boolean = false;
  isContactHovered: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private renderer: Renderer2,
    private router: Router
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

  ngOnInit() {
    this.imgLogo = "picture/logo.png"
    this.items = [
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
      },
      {
        label: 'Français',
        icon: 'pi pi-globe',
        items: [
          {
            label: 'Anglais',
            icon: 'pi pi-flag'
          }
        ]
      }
    ];

    if (isPlatformBrowser(this.platformId)) {
      console.log('Initialisation du listener de défilement');
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll(): void {
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
}
