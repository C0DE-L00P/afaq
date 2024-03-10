import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications = [
    {title: 'Profile data has been updated', createdAt: '03-04-2024'},
    {title: 'Profile data has been updated', createdAt: '03-03-2024'},
    {title: 'Account Has been verified', createdAt: '03-03-2024'},
  ];
}
