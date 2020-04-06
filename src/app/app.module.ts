import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LocationComponent } from './location/location.component';
import { SearchFormComponent } from './home/search-form/search-form.component';
import { GlobalSearchComponent } from './global-search/global-search.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    LocationComponent,
    SearchFormComponent,
    GlobalSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSnackBarModule,
    // MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    NgxMasonryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
