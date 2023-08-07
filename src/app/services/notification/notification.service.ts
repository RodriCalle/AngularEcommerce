import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';

@Injectable() 
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  error(message: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message: message
      },
      duration: 5000,
      panelClass: ['mat-snackbar_error']
    });
  }

  success(message: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message: message
      },
      duration: 5000,
      panelClass: ['mat-snackbar_success']
    });
  }
}
