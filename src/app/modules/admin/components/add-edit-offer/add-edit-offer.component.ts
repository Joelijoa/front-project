import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-add-edit-offer',
  templateUrl: './add-edit-offer.component.html',
  styleUrls: ['./add-edit-offer.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    IftaLabelModule,
    FloatLabelModule
  ]
})
export class AddEditOfferComponent implements OnInit {
  showDialog: boolean = false;
  @Output() dataChanged = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}
