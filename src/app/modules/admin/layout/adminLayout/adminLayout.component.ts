import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-adminLayout',
  templateUrl: './adminLayout.component.html',
  imports: [
    SidebarComponent,
    RouterModule,
    BreadcrumbModule,
    ButtonModule
  ],
  styleUrls: ['./adminLayout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  constructor() { }

  ngOnInit() {}

}
