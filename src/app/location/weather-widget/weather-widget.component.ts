import { Component, OnInit, Input } from '@angular/core';
import { WeatherDetails } from 'src/app/model/weather.model';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  @Input('weather') weatherDetails: WeatherDetails;
  constructor() { }
  
  ngOnInit() {
  }

}
