import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextarea } from 'primeng/inputtextarea';

@NgModule({
    imports: [
        ButtonModule,
        CheckboxModule,
        InputTextarea
    ],
    exports: [
        ButtonModule,
        CheckboxModule,
        InputTextarea
    ]
})
export class StylesModule { } 