import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LocationComponent } from './location/location.component';
import { SearchFormComponent } from './home/search-form/search-form.component';
import { GlobalSearchComponent } from './global-search/global-search.component';

import { SearchListComponent } from './search/search-list/search-list.component';
import { MapViewComponent } from './search/map-view/map-view.component';
import { AboutComponent } from './about/about.component';
import { WeatherWidgetComponent } from './location/weather-widget/weather-widget.component';
import { LocationImagesComponent } from './location/location-images/location-images.component';
import { GoogleLoginProvider, SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserNamePipe } from './user-name.pipe';
import { PlacesCarouselComponent } from './location/places-carousel/places-carousel.component';

import { SharedModule } from './module/shared.module';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("151161582611-i9fkqu14n7giqluadt174na8nil5qo2r.apps.googleusercontent.com")
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
    WeatherWidgetComponent,
    LocationImagesComponent,
    SignInComponent,
    WeatherWidgetComponent,
    UserNamePipe,
    PlacesCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
    SocialLoginModule,
    SharedModule
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
