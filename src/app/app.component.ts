import {Component, OnInit} from '@angular/core';
import {GetUserSignedInState} from './utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My Travel';
  signedIn: boolean;
  showBanner: boolean = true;

  ngOnInit() {
    this.signedIn = GetUserSignedInState();
  }

  sessionUpdated = () => {
    this.signedIn = GetUserSignedInState();
  }

  closeBanner = () => {
    this.showBanner = false;
  }
}
