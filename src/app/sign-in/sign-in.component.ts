import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user;
  loggedIn;
  menuOpen = false;
  userName = 'userName';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.menuOpen = false;
    })
  }

  signInWithGoogle = (): void => {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut = (): void => {
    this.authService.signOut();
  }

  showUSerInfo = (): void => {
    this.menuOpen = !this.menuOpen;
  }
}
