import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen.show({
      autoHide: false
    });

    // Your app initialization code goes here

    setTimeout(() => {
      SplashScreen.hide();
    }, 3000); // Adjust the timeout value as needed
  }
}