import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-angular-app';

  constructor(private firebase: AngularFirestore) { }

  ngOnInit() {
    this.firebase.collection('test').snapshotChanges().subscribe(res => {
      console.log(res.map(e => e.payload.doc.data() ));
    });
  }
}
