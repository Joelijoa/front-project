import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationPopoverComponent } from './components/notification-popover/notification-popover.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationPopoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { } 