import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports : [
    ButtonModule,
    CommonModule,
    PopoverModule,
    MenuModule
  ]

})
export class ProfilePopoverComponent implements OnInit {
  menuItems: MenuItem[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}
