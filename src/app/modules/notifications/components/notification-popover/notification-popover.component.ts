import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  icon: string;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
  data?: any;
}

@Component({
  selector: 'app-notification-popover',
  templateUrl: './notification-popover.component.html',
  styleUrls: ['./notification-popover.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    BadgeModule,
    OverlayPanelModule
  ],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationPopoverComponent implements OnInit {
  @ViewChild('op') overlayPanel!: OverlayPanel;
  
  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle offre disponible',
      message: 'Une nouvelle offre correspondant à vos critères est disponible',
      date: new Date(),
      read: false,
      icon: 'pi pi-info-circle',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Candidature acceptée',
      message: 'Votre candidature a été acceptée pour l\'entretien',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      icon: 'pi pi-check-circle',
      type: 'success'
    }
  ]; // Données de test

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('NotificationPopoverComponent initialized');
    // En production, décommenter cette ligne pour obtenir les vraies notifications
    /*this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
      this.notifications.sort((a, b) => b.date.getTime() - a.date.getTime());
    });*/
  }

  handleNotificationClick(notification: Notification): void {
    this.markAsRead(notification.id);
    
    if (this.overlayPanel) {
      this.overlayPanel.hide();
    }

    if (notification.link) {
      this.router.navigate([notification.link], { state: notification.data });
    }
  }

  markAsRead(id: number): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      // En production, décommenter cette ligne
      // this.notificationService.markAsRead(id);
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      if (!notification.read) {
        this.markAsRead(notification.id);
      }
    });
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'pi pi-check-circle';
      case 'warning':
        return 'pi pi-exclamation-triangle';
      case 'error':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-info-circle';
    }
  }

  formatDate(date: Date): string {
    const now = new Date();
    const notifDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - notifDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else {
      return notifDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  }
} 