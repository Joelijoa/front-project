import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../components/notification-popover/notification-popover.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    // Initialiser avec quelques notifications de test
    this.notificationsSubject.next([
      {
        id: 1,
        title: 'Nouvelle offre correspondant à votre profil',
        message: 'Une nouvelle offre de Développeur Frontend a été publiée',
        date: new Date(),
        read: false,
        icon: 'pi pi-briefcase',
        type: 'info'
      }
    ]);
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications$;
  }

  markAsRead(id: number): void {
    const notifications = this.notificationsSubject.value;
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.notificationsSubject.next(updatedNotifications);
  }

  addNotification(notification: Notification): void {
    const notifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...notifications, notification]);
  }
} 