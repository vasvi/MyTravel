import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { SearchHistoryComponent } from './search-history/search-history.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'about',
  component: AboutComponent
}, {
  path: 'search',
  component: SearchComponent,
}, {
  path: 'location',
  component: LocationComponent
},
{
  path: 'search-history',
  component: SearchHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
