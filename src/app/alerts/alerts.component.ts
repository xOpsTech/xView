import { Component, OnInit } from '@angular/core';
import { Alert } from './Alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [AlertService]
})
export class AlertsComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(private alertsService: AlertService) { }

  getAlertData() {
    this.alertsService.getAlerts()
      .subscribe(res => {
        for (let alert of res) {

        }
        console.log(this.alerts)
      })
  }

  extractData() {

  }

  ngOnInit() {

    this.alertsService.getALertsMapped().then(alerts => {
      this.alerts = alerts;
    });
    // this.getAlertData();
  }

}
