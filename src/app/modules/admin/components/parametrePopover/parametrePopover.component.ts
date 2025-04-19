import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-parametrePopover',
  templateUrl: './parametrePopover.component.html',
  styleUrl: './parametrePopover.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    ButtonModule,
    CommonModule,
    PopoverModule,
    MenuModule
  ],
})
export class ParametrePopoverComponent implements OnInit {
  menuItems : MenuItem[] = [
    {
      "label": "Information perosnnel",
      "icon": "pi pi-user",
      command: () => {
        console.log("Information personnel");
      }
    },
    {
      "label": "Securite",
      "icon": "pi pi-lock",
      command: () => {
        console.log("Securite");
      }
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
