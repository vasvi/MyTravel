import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService, GoogleLoginProvider, LoginOpt } from 'angularx-social-login';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() sessionStatusUpdate = new EventEmitter();
  user;
  loggedIn;
  menuOpen = false;
  userName = 'userName';
  scope: LoginOpt = {
    scope: 'https://www.googleapis.com/auth/calendar'
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.setUserProperties(user);
    })
  }

  setUserProperties (user) {
    this.user = user;
    this.loggedIn = (user != null);
    this.menuOpen = false;
    if (this.user) {
      sessionStorage.setItem('user_authToken', this.user.authToken);
      this.sessionStatusUpdate.emit();
    }
  }
  signInWithGoogle = (): void => {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.scope);
  }

  signOut = (): void => {
    this.authService.signOut();
    sessionStorage.removeItem('user_authToken');
    this.sessionStatusUpdate.emit();
  }

  showUSerInfo = (): void => {
    this.menuOpen = !this.menuOpen;
  }
}
