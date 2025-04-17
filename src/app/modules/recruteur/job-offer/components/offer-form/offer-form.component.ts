import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JobOffer } from '../../models/job-offer.model';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    EditorModule,
    ButtonModule,
    DialogModule
  ]
})
export class OfferFormComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() offer?: JobOffer;
  @Input() isEditMode: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<JobOffer>();
  @Output() cancel = new EventEmitter<void>();

  offerForm!: FormGroup;

  contractTypes = [
    { label: 'CDI', value: 'cdi' },
    { label: 'CDD', value: 'cdd' },
    { label: 'Stage', value: 'stage' },
    { label: 'Alternance', value: 'alternance' },
    { label: 'Freelance', value: 'freelance' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.offerForm = this.fb.group({
      title: [this.offer?.title || '', [Validators.required]],
      company: [this.offer?.company || '', [Validators.required]],
      location: [this.offer?.location || '', [Validators.required]],
      contractType: [this.offer?.contractType || '', [Validators.required]],
      salary: [this.offer?.salary || ''],
      description: [this.offer?.description || '', [Validators.required]],
      requirements: [this.offer?.requirements || '', [Validators.required]],
      process: [this.offer?.process || ''],
      companyDescription: [this.offer?.companyDescription || ''],
      benefits: [this.offer?.benefits || ''],
      expiryDate: [this.offer?.expiryDate || null]
    });
  }

  onSubmit() {
    if (this.offerForm.valid) {
      const formValue = this.offerForm.value;
      const offer: JobOffer = {
        ...this.offer,
        ...formValue,
        id: this.offer?.id || Date.now().toString(),
        publishedDate: this.offer?.publishedDate || new Date(),
        status: this.offer?.status || 'DRAFT',
        views: this.offer?.views || 0,
        applications: this.offer?.applications || 0
      };

      this.submit.emit(offer);
      this.onCancel();
    }
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
} 