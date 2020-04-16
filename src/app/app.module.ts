import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LocationComponent } from './location/location.component';
import { SearchFormComponent } from './home/search-form/search-form.component';
import { GlobalSearchComponent } from './global-search/global-search.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMasonryModule } from 'ngx-masonry';
import { SearchListComponent } from './search/search-list/search-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MapViewComponent } from './search/map-view/map-view.component';
import { AboutComponent } from './about/about.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {GoogleLoginProvider, SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import { SignInComponent } from './sign-in/sign-in.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    LocationComponent,
    SearchFormComponent,
    GlobalSearchComponent,
    SearchListComponent,
    MapViewComponent,
    AboutComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    MatIconModule,
    NgxMasonryModule,
    ScrollingModule,
    MatDialogModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
 ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
