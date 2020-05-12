import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { HeaderComponent } from './header/header.component';
import { PlacesCarouselComponent } from './location/places-carousel/places-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MDL } from './directives/MaterialDesignLiteUpgradeElement';
import { SharedModule } from './module/shared.module';
import { environment } from '../environments/environment';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { RecentLocationsComponent } from './home/recent-locations/recent-locations.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GCP.TRAVEL.client_id)
  }
]);

export function provideConfig() {
  return config;
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
    PlacesCarouselComponent,
    HeaderComponent,
    MDL,
    CreateNewEventComponent,
    SearchHistoryComponent,
    RecentLocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule,
    SocialLoginModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: createTranslateLoader, // exported factory function needed for AoT compilation
          deps: [HttpClient]
      }
    })
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
