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
  @Output() onCollapseChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menuItem = [
      {
        label: 'Application',
        items: [
          {
            label: 'Offers',
            icon: 'pi pi-file',
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
        label: 'Reports',
        items: [
          {
            label: 'Reports',
            icon: 'pi pi-chart-bar',
            command: () => this.router.navigate(['/admin/reports']),
          },
          { label: 'Customers statistics', icon: 'pi pi-chart-bar' },
        ],
      },
      {
        label: 'Backoffice',
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
          { label: 'Accounts', icon: 'pi pi-id-card' },
        ],
      },
    ];
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.onCollapseChange.emit(this.isCollapsed);
  }
}
