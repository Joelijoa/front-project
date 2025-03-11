import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ImportsModule } from './imports'
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, ImportsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  imgLogo ! : string;
  items: MenuItem[] | undefined;

  myMenuBar : string = 'myMenuBar';
  isCollapsed = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {}

  ngOnInit() {
    this.imgLogo = "picture/logo.png"
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
      },
      {
        label: 'Offre d\'emploi',
        icon: 'pi pi-home',
      },
      {
        label: 'A propos',
        icon: 'pi pi-home',
      },
      {
        label: 'Français',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Anglais',
            icon: 'pi pi-bolt',
            
          },
          
          
        ],
      },
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
