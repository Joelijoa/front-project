import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ButtonModule,
    CalendarModule,
    TableModule,
    SelectModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    CardModule,
    ChipModule,
    DialogModule,
    TooltipModule,
    DropdownModule,
    EditorModule,
    StepperModule,
    TextareaModule
    ],
  standalone: true
})
export class OffersComponent implements OnInit {
  // Options pour les listes déroulantes
  customers = [
    { name: 'INWI', value: 'INWI' },
    { name: 'Other', value: 'Other' }
  ];
  
  contractTypes = [
    { label: 'CDI', value: 'CDI' },
    { label: 'CDD', value: 'CDD' },
    { label: 'Stage', value: 'Stage' },
    { label: 'Freelance', value: 'Freelance' }
  ];
  
  offers = [
    { 
      date: new Date('2025-03-05'), 
      customer: 'INWI', 
      poste: 'Responsable SI', 
      location: 'Casablanca',
      contractType: { label: 'CDI', value: 'CDI' },
      closingDate: new Date('2025-06-22'), 
      salary: '15000.00',
      description: '',
      requirements: '',
      process: '',
      companyDescription: '',
      benefits: ''
    },
  ];

  // Propriétés pour le dialogue
  showOfferDialog: boolean = false;
  editMode: boolean = false;
  offerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  // Initialiser le formulaire réactif
  initForm() {
    this.offerForm = this.fb.group({
      poste: ['', Validators.required],
      customer: [null, Validators.required],
      location: ['', Validators.required],
      contractType: [null, Validators.required],
      salary: [''],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      process: [''],
      companyDescription: [''],
      benefits: [''],
      closingDate: [null, Validators.required]
    });
  }

  // Méthodes pour gérer les offres
  onAddNewOffer() {
    this.editMode = false;
    this.offerForm.reset();
    this.offerForm.patchValue({
      closingDate: new Date()
    });
    this.showOfferDialog = true;
  }

  viewOffer(offer: any) {
    // Implémenter la vue détaillée de l'offre
    console.log('Viewing offer:', offer);
  }

  editOffer(offer: any) {
    this.editMode = true;
    
    // Trouver le type de contrat correspondant dans la liste
    const contractType = this.contractTypes.find(type => type.value === offer.contractType?.value);
    
    // Mettre à jour le formulaire avec les valeurs de l'offre
    this.offerForm.patchValue({
      poste: offer.poste,
      customer: this.customers.find(c => c.name === offer.customer),
      location: offer.location,
      contractType: contractType,
      salary: offer.salary?.replace(' MAD', ''),
      description: offer.description || '',
      requirements: offer.requirements || '',
      process: offer.process || '',
      companyDescription: offer.companyDescription || '',
      benefits: offer.benefits || '',
      closingDate: offer.closingDate instanceof Date ? new Date(offer.closingDate) : new Date(offer.closingDate)
    });
    
    this.showOfferDialog = true;
  }

  deleteOffer(offer: any) {
    // Ajouter une confirmation de suppression
    console.log('Deleting offer:', offer);
    // Pour l'exemple, supprimons directement l'offre du tableau
    this.offers = this.offers.filter(o => o !== offer);
  }

  closeOfferDialog() {
    this.showOfferDialog = false;
  }

  saveOffer() {
    if (this.offerForm.invalid) {
      return;
    }
    
    const formValues = this.offerForm.value;
    
    const newOffer = {
      date: new Date(),
      customer: formValues.customer?.name,
      poste: formValues.poste,
      location: formValues.location,
      contractType: formValues.contractType,
      closingDate: formValues.closingDate,
      salary: formValues.salary ? `${formValues.salary} MAD` : '',
      description: formValues.description,
      requirements: formValues.requirements,
      process: formValues.process,
      companyDescription: formValues.companyDescription,
      benefits: formValues.benefits
    };
    
    if (this.editMode) {
      // Mettre à jour l'offre existante
      const index = this.offers.findIndex(o => 
        o.poste === this.offers.find(offer => offer.poste === formValues.poste)?.poste
      );
      
      if (index !== -1) {
        this.offers[index] = {...newOffer};
      }
      console.log('Updating offer:', newOffer);
    } else {
      // Ajouter une nouvelle offre
      this.offers.push({...newOffer});
      console.log('Adding new offer:', newOffer);
    }
    this.showOfferDialog = false;
  }
}
