import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilRoutingModule } from './profil-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    CommonModule,
    ProfilRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    EditorModule,
    TimelineModule,
    CardModule,
    RatingModule,
    FileUploadModule,
    ToastModule,
    DialogModule,
    PasswordModule
  ],
  providers: [provideHttpClient()]
})
export class ProfilModule { }
