import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  messageServis = inject(MessageService);
  success(message: string, summary: string) {
    this.messageServis.add({
      severity: 'success',
      summary: summary,
      detail: message,
    });
  }
  warning(message: string, summary: string) {
    this.messageServis.add({
      severity: 'warn',
      summary: summary,
      detail: message,
    });
  }
  danger(message: string, summary: string) {
    this.messageServis.add({
      severity: 'error',
      summary: summary,
      detail: message,
    });
  }
  info(message: string, summary: string) {
    this.messageServis.add({
      severity: 'info',
      summary: summary,
      detail: message,
    });
  }
  Contrast(message: string, summary: string) {
    this.messageServis.add({
      severity: 'Contrast',
      summary: summary,
      detail: message,
    });
  }
  secondary(message: string, summary: string) {
    this.messageServis.add({
      severity: 'secondary',
      summary: summary,
      detail: message,
    });
  }
}
