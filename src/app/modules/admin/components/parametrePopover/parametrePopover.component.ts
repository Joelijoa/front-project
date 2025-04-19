import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-parametrePopover',
  templateUrl: './parametrePopover.component.html',
  styleUrl: './parametrePopover.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    ButtonModule,
    CommonModule,
    PopoverModule
  ],
})
export class ParametrePopoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
