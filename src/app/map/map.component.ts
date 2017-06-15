import { Component, OnInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { AlertService } from '../alerts/alert.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [AlertService],
})
export class MapComponent implements OnInit {
  chart: any;
  alerts:any[];

  targetSVG: any  = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';

  constructor(private AmCharts: AmChartsService,private alertsService:AlertService) {}

  ngOnInit() {

 this.alertsService.getALertsMapped().then(alerts => {
 
      console.log( this.alerts)
});


    this.chart = this.AmCharts.makeChart( "chartdiv", {
      "type": "map",
      "theme": "dark",
      "projection": "winkel3",

      "imagesSettings": {
        "rollOverColor": "#eff1f1",
        "rollOverScale": 1,
        "selectedScale": 1,
        "selectedColor": "#089282",
        "color": "#13564e"
      },

      "dataProvider": {
        "map": "worldLow",
        "zoomLevel": 1,
        "zoomLongitude": 7,
        "zoomLatitude": 52,
        "images": [ {
          "latitude": 50.448,
          "longitude":3.819,
          "svgPath": this.targetSVG,
          "width": 32,
          "height": 32,
          "label": "europe-west1"
        }, {
          "latitude": 45.595,
          "longitude": -121.179,
          "svgPath": this.targetSVG,
          "width": 32,
          "height": 32,
          "label": "us-west1"
        }
        ]
      },

      "areasSettings": {
        "outlineThickness": 0.6,
        "autoZoom": true
      },

      "export": {
        "enabled": true
      }
    } );
  }
  ngOnDestroy() {
    this.AmCharts.destroyChart(this.chart);
  }
}
