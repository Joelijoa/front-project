import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

// Components
import { FooterComponent } from '../../../../../../core/components/footer/footer.component';

@Component({
    selector: 'app-register-company',
    templateUrl: './register-company.component.html',
    styleUrls: ['./register-company.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        PasswordModule,
        CheckboxModule,
        FooterComponent
    ]
})
export class RegisterCompanyComponent implements OnInit {
    registerForm!: FormGroup;

    civilites = [
        { label: 'M.', value: 'M' },
        { label: 'Mme', value: 'F' }
    ];

    pays = [
        { label: 'France', value: 'FR' },
        { label: 'Belgique', value: 'BE' },
        { label: 'Suisse', value: 'CH' }
    ];

    villes = [
        { label: 'Paris', value: 'PAR' },
        { label: 'Lyon', value: 'LYO' },
        { label: 'Marseille', value: 'MAR' }
    ];

    formesJuridiques = [
        { label: 'SARL', value: 'SARL' },
        { label: 'SA', value: 'SA' },
        { label: 'SAS', value: 'SAS' },
        { label: 'EURL', value: 'EURL' }
    ];

    typesSociete = [
        { label: 'PME', value: 'PME' },
        { label: 'Grande Entreprise', value: 'GE' },
        { label: 'Start-up', value: 'STARTUP' }
    ];

    domainesActivite = [
        { label: 'Informatique', value: 'INFO' },
        { label: 'Finance', value: 'FIN' },
        { label: 'Industrie', value: 'IND' },
        { label: 'Commerce', value: 'COM' }
    ];

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.registerForm = this.fb.group({
            nomSociete: ['', Validators.required],
            civilite: ['', Validators.required],
            nomRepresentant: ['', Validators.required],
            prenomRepresentant: ['', Validators.required],
            dateCreation: ['', Validators.required],
            telephone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            pays: ['', Validators.required],
            ville: ['', Validators.required],
            formeJuridique: ['', Validators.required],
            typeSociete: ['', Validators.required],
            domaineActivite: ['', Validators.required],
            acceptConditions: [false, Validators.requiredTrue]
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
            // TODO: Implement registration logic
        } else {
            Object.keys(this.registerForm.controls).forEach(key => {
                const control = this.registerForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
        }
    }
}
