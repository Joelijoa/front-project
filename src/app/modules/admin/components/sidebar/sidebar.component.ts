import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class SidebarComponent {
  isCollapsed = false;
  menuItem: any[] = [];
  imgLogo ! : String;
  @Output() onCollapseChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.imgLogo = 'picture/logo.png'
    this.menuItem = [
      {
        label: 'APPLICATIONS',
        items: [
          {
            label: 'Offers',
            icon: 'pi pi-briefcase',
            command: () => this.router.navigate(['/admin/offers']),
          },
          {
            label: 'Requests',
            icon: 'pi pi-file',
            command: () => this.router.navigate(['/admin/requests']),
          },
          { label: 'Offer', icon: 'pi pi-file' },
        ],
      },
      {
        label: 'REPORTS',
        items: [
          {
            label: 'Reports',
            icon: 'pi pi-chart-bar',
            command: () => this.router.navigate(['/admin/reports']),
          },
          { label: 'Customers statistics', 
            icon: 'pi pi-chart-pie',
            command: () => this.router.navigate(['/admin/customer-statistics']),
          },
        ],
      },
      {
        label: 'BACKOFFICE',
        items: [
          {
            label: 'Society',
            icon: 'pi pi-building',
            command: () => this.router.navigate(['/admin/society']),
          },
          {
            label: 'Users',
            icon: 'pi pi-users',
            command: () => this.router.navigate(['/admin/users']),
          },
          {
             label: 'Accounts',
            icon: 'pi pi-id-card',
            command: ()=> this.router.navigate(['/admin/accounts'])
           },
        ],
      },
    ];
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.onCollapseChange.emit(this.isCollapsed);
  }
}
