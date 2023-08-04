import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface NotificationData {
  message: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: NotificationData ) {

  }

  ngOnInit(): void {
  }

}
