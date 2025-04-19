import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ParametrePopoverComponent } from '../../components/parametrePopover/parametrePopover.component';

@Component({
  selector: 'app-adminLayout',
  templateUrl: './adminLayout.component.html',
  styleUrl: './adminLayout.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    SidebarComponent,
    ParametrePopoverComponent,
    RouterModule,
    BreadcrumbModule,
    ButtonModule
  ],
})
export class AdminLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  constructor() { }

  ngOnInit() {}

}
