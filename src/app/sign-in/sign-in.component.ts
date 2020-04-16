import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  /*signInWithGoogle(): void {
    console.log('sign in with google called');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }*/
 

}
