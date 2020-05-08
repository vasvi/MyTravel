import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig , AuthService , GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { SignInComponent } from './sign-in.component';
import { Observable } from 'rxjs';
import { UserNamePipe } from '../user-name.pipe';

export class AuthServiceMock {
  authState (){

  }
}
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("google id goes here")
  }
]);

export function provideConfig() {
  return config;
}
fdescribe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent, UserNamePipe ],
      providers: [{provide: AuthService, useClass: AuthService}, 
                  {provide: AuthServiceConfig, useFactory: provideConfig}]
    })
    .compileComponents();
  }));

  
  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    let authService: AuthService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should test signInWithGoogle', () => {
    let authService: AuthService = TestBed.get(AuthService);
    spyOn(authService, 'signIn');
    component.signInWithGoogle();
    expect(authService.signIn).toHaveBeenCalled();
  });

  it('should test signOut', () => {
    let authService: AuthService = TestBed.get(AuthService);
    spyOn(authService, 'signOut');
    component.signOut();
    expect(authService.signOut).toHaveBeenCalled();
  }); 

  it('should test showUSerInfo', () => {
    component.menuOpen = true;
    component.showUSerInfo();
    expect(component.menuOpen).toEqual(false);
  }); 

  it('should test setUserProperties', () => {
    const user={authToken: 'abcd'};
    component.setUserProperties(user);
    expect(component.loggedIn).toEqual(true);
    expect(component.menuOpen).toEqual(false);
  }); 

});
