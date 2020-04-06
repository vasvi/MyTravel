import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { JsonPipe } from "@angular/common";

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
  })
  
  export class SearchListComponent implements OnInit {

    destinations: any;
    @Input() applicableDestinations: Observable<any>;

    // @Input() set applicableDestinations(value: any) { 
    //     this.destinations=value; 
    // }

    // get applicableDestinations(): any {
    //   return this.destinations;
    // }

    ngOnInit(){
      console.log('search-list init' + JSON.stringify(this.applicableDestinations) + 'destinations' + this.destinations);
        this.applicableDestinations.subscribe(data=>{
          this.destinations=data;
          console.log('data received in child' + JSON.stringify(this.destinations));
        })
    }

  }