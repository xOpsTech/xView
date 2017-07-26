import { Component, OnInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [AlertService],
})
export class MapComponent implements OnInit {
  chart: any;
  alerts: any[];
  color: any;
  mapcoordinates = [];
  targetSVGgreen: any = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';

  constructor(private AmCharts: AmChartsService, private alertsService: AlertService) { }
  ngOnInit() {

  
    this.alertsService.getAlerts().subscribe(alerts => {

      for (var dv of alerts) {
        if (dv._source.severity == "1") { this.color = '#54C40B' }
        if (dv._source.severity == "3") { this.color = '#d3d30a' }
        if (dv._source.severity == "4") { this.color = '#FF0000' }
        this.mapcoordinates.push({
          "latitude": dv._source.locationCoordinates[0],
          "longitude": dv._source.locationCoordinates[1],
           "title": dv._source.locationCode,
          "svgPath": this.targetSVGgreen,
          "width": 32,
          "height": 32,
          "color": this.color
        });
      }
      console.log(this.mapcoordinates);

      this.chart = this.AmCharts.makeChart("chartdiv", {
        "type": "map",
        "theme": "black",
        "projection": "miller",
        
        "backgroundColor" : "#000",
        "backgroundAlpha" : 1,

        "imagesSettings": {
          "selectedColor": "#fff",
        },

        "areasSettings": {
          "unlistedAreasColor": "#888"
        },

        "dataProvider": {
          "map": "worldLow",
          "zoomLevel": 1,
          "zoomLongitude": 7,
          "zoomLatitude": 52,
          "images": this.mapcoordinates
        },

        "export": {
          "enabled": true
        }
      });

    });
  }
  ngOnDestroy() {
    this.AmCharts.destroyChart(this.chart);
  }
}
