import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyC-AvpfVMYfqd5VLYR8PCkIAIHQp2SSuLE",
      authDomain: "angularlearning-hans.firebaseio.com"
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
