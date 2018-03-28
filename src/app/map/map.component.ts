import { Component, OnInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { MapService } from '../services/map.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [UserService, AlertService, MapService],
})
export class MapComponent implements OnInit {
  chart: any;
  alerts: any[];
  mapgear = false;
  color: any;
  mapcoordinates = [];
  targetSVGgreen: any = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';

  user = {
    name: "",
    picture: "",
    tenantId: ""
  };

  constructor(private AmCharts: AmChartsService, private router: Router, private alertsService: AlertService, private userService: UserService, private mapService: MapService) { }
  ngOnInit() {

    this.userService.getUserData().subscribe(res => {
      this.user = res;
      var tenantId = res.message[0].tenantId
      console.log("sdfsdfsfsdfsdfsdfsdf");
      this.mapService.getNewRelicMapData(tenantId).subscribe(newrelicmapdata => {
        for (var dv of newrelicmapdata['newrelicMapData']) {
          var title2 = ""
          var title = "<b>location</b> = " + dv.locationLabel;

          for (var i = 0; i < dv.apps.length; i++) {
            title2 = title2 + "<b>monitorName</b> = " + dv.apps[i].monitorName + "</br>" + " <b>duration</b> = " + dv.apps[i].duration + "</br>";
          }

          this.mapcoordinates.push({
            "latitude": dv.apps[0].latitude,
            "longitude": dv.apps[0].longitude,
            "title": title + "</br>" + title2,
            "svgPath": this.targetSVGgreen,
            "width": 32,
            "height": 32,
            "color": '#54C40B',
            "textAlign": "left"
          });

          console.log(this.mapcoordinates)
        }

        this.chart = this.AmCharts.makeChart("chartdiv", {
          "type": "map",
          "theme": "black",
          "projection": "miller",

          "backgroundColor": "#000",
          "backgroundAlpha": 1,

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

      },
        (error) => {
          this.mapgear = true;
          console.log(error+ "  sdsfdsdfsdfsfs")
          console.log(this.mapgear + "  sdsfdsdfsdfsfs")
        });
    });


  }

  confirm() {
    this.router.navigate(['manage']);
  }

  ngOnDestroy() {
//    this.AmCharts.destroyChart(this.chart);
  }
}
