import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    DatePickerModule,
    TableModule,
    SelectModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    CommonModule,
    CardModule
  ]
})
export class RequestsComponent implements OnInit {
  customers = [
    { label: 'INWI', value: 'INWI' },
    { label: 'Other', value: 'Other' },
  ];

  requests = [
    {
      date: '05/03/2025',
      customer: 'INWI',
      poste: 'Responsable SI',
      closingDate: '22/06/2025',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
