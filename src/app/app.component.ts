import {Component, OnInit} from '@angular/core';
import {GetUserSignedInState} from './utilities';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My Travel';
  signedIn: boolean;
  showBanner: boolean = false;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.signedIn = GetUserSignedInState();
    setTimeout(this.showSignInBanner,  2*60*1000);
  }

  sessionUpdated = () => {
    this.signedIn = GetUserSignedInState();
  }

  closeBanner = () => {
    this.showBanner = false;
  }

  showSignInBanner = () => {
    this.showBanner = true;
  }
}
