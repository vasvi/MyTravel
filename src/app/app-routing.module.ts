import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {LocationComponent} from './location/location.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'search',
  component: SearchComponent,
}, {
  path: 'location',
  component: LocationComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
