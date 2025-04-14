import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPopoverComponent } from './components/notification-popover/notification-popover.component';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { BadgeModule } from 'primeng/badge';
import { NotificationsRoutingModule } from './notifications-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    ButtonModule,
    PopoverModule,
    BadgeModule,
    NotificationPopoverComponent
  ],
  exports: [
    NotificationPopoverComponent
  ]
})
export class NotificationsModule { } 