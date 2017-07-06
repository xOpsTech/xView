import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { CircleProgressComponent } from '../../shared/circle-progress.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  providers: [AlertService]
})
export class BusinessComponent implements OnInit {

  public alert_trend;
  public data;
  public sgopt;
  public svcWidgets = [];

  constructor(private alertsService: AlertService) {
    this.alertsService.getAlertTrends('12')
    .subscribe((data: any) => {
      this.alert_trend = data;
      //console.log(this.alert_trend);
    });

    this.svcWidgets = [
      {
        data : {
          labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
          datasets: [
              {
                  label: 'Svc 1',
                  data: [65, 59, 80, 81, 56, 80, 95],
                  borderColor: '#555'
              }
          ]
        },
        title : "Service 1",
        latency : "22ms",
        svcload : 95
      },

      {
        data : {
          labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
          datasets: [
              {
                  label: 'Svc 1',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  borderColor: '#555'
              }
          ]
        },
        title : "Service 2",
        latency : "8ms",
        svcload : 40
      },

      {
        data : {
          labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
          datasets: [
              {
                  label: 'Svc 1',
                  data: [25, 30, 10, 45, 18, 65, 80],
                  borderColor: '#555'
              }
          ]
        },
        title : "Service 3",
        latency : "28ms",
        svcload : 80
      }
    ]

    //this.svcWidgets[0].push(this.data);

    this.sgopt = {
        scales:{
            xAxes: [{display: false}],
            yAxes: [{
              display: false,
              ticks: {
                beginAtZero: true
              }
            }]
        },
        tooltips: {
          enabled : false
        },
        legend: {
            display: false
        }
      }
  }

  ngOnInit() {
  }

}
