import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextarea } from 'primeng/inputtextarea';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent {
  @Input() visible: boolean = false;
  @Input() application?: Application;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() responseSubmitted = new EventEmitter<{ applicationId: string, response: string }>();

  responseText: string = '';
  isResponding: boolean = false;

  onClose() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetResponse();
  }

  startResponse() {
    this.isResponding = true;
  }

  cancelResponse() {
    this.isResponding = false;
    this.resetResponse();
  }

  submitResponse() {
    if (this.application && this.responseText.trim()) {
      this.responseSubmitted.emit({
        applicationId: this.application.id,
        response: this.responseText.trim()
      });
      this.isResponding = false;
      this.resetResponse();
    }
  }

  private resetResponse() {
    this.responseText = '';
    this.isResponding = false;
  }
} 