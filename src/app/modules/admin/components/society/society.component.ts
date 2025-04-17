import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Society } from './model/society';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.scss'],
  encapsulation:ViewEncapsulation.None,
  imports: [
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule
  ]
})

export class SocietyComponent implements OnInit {
  societys : Society [] = [
    new Society(1, "INWI", "Telecomunication", "Rabat"),
    new Society(1, "INWI", "Telecomunication", "Rabat"),
    new Society(1, "INWI", "Telecomunication", "Rabat"),
    new Society(1, "INWI", "Telecomunication", "Rabat"),
    new Society(1, "INWI", "Telecomunication", "Rabat"),
    new Society(1, "INWI", "Telecomunication", "Rabat"),
    new Society(1, "INWI", "Telecomunication", "Rabat"),
    new Society(1, "INWI", "Telecomunication", "Rabat"),
  ]

  constructor() { }

  ngOnInit() {
  }

}
