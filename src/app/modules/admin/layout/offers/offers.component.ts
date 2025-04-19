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
import { AddEditOfferComponent } from '../../components/add-edit-offer/add-edit-offer.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ButtonModule,
    DatePickerModule,
    TableModule,
    SelectModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    CardModule,
    AddEditOfferComponent
  ]
})

export class OffersComponent implements OnInit {
  customers = [
    { label: 'INWI', value: 'INWI' },
    { label: 'Other', value: 'Other' }
  ];

  offers = [
    { date: '05/03/2025', customer: 'INWI', poste: 'Responsable SI', closingDate: '22/06/2025', salary: '15000.00 MAD' },
  ];

  constructor() { }

  ngOnInit() {}
}
