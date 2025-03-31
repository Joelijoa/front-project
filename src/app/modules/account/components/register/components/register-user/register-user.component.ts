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
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss'],
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
export class RegisterUserComponent implements OnInit {
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

    domainesEtudes = [
        { label: 'Informatique', value: 'INFO' },
        { label: 'Business', value: 'BUS' },
        { label: 'Ingénierie', value: 'ING' }
    ];

    typesFormation = [
        { label: 'Formation initiale', value: 'INIT' },
        { label: 'Formation continue', value: 'CONT' },
        { label: 'Alternance', value: 'ALT' }
    ];

    niveauxEtudes = [
        { label: 'Bac', value: 'BAC' },
        { label: 'Bac+2', value: 'BAC2' },
        { label: 'Bac+3', value: 'BAC3' },
        { label: 'Bac+5', value: 'BAC5' }
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
            civilite: ['', Validators.required],
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            dateNaissance: ['', Validators.required],
            telephone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            pays: ['', Validators.required],
            ville: ['', Validators.required],
            domaineEtudes: ['', Validators.required],
            typeFormation: ['', Validators.required],
            niveauEtudes: ['', Validators.required],
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