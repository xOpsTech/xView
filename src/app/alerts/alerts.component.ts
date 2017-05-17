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
  cols3: { color: string; severity: string; }[];
  title: any;
  storedTimestamp: any;
  raisedLocalTimestamp: any;

  alerts: Alert[] = [];
  display: boolean = false;

  domain: any[];
  severity: any;
  cols2: any;
  status: any;
  constructor(private alertsService: AlertService) { }


  showDialog() {
    this.display = true;
  }

  ngOnInit() {

    this.alertsService.getALertsMapped().then(alerts => {
      this.alerts = alerts;
    });
    // this.getAlertData();
  }

  onRowSelect(event) {
    this.showDialog();
    this.status  = event.data._source.status.toUpperCase();
    this.title  = event.data._source.title;

    this.cols2 = [
      {head: 'Domain', val: event.data._source.domain},
      {head: 'Producer', val: event.data._source.producer},
      {head: 'Trigger', val: event.data._source.trigger},
      {head: 'Severity', val: event.data._source.severity},
      {head: 'State Trigger Id', val: event.data._source.stateTriggerId},
      {head: 'Monitored CI Name', val: event.data._source.monitoredCIName},
      {head: 'Raised Local Timestamp', val: event.data._source.raisedLocalTimestamp},
      {head: 'Stored Timestamp', val: event.data._source.storedTimestamp},
      {head: 'Timestamp Updated', val: event.data._source.timestampUpdated},
      {head: 'Closed Timestamp', val: event.data._source.closedTimestamp},
      {head: 'Location Code', val: event.data._source.locationCode},
      {head: 'State Trigger Id', val: event.data._source.stateTriggerId}
    ];

    this.cols3 = [
      {color: '#FF4500', severity: '1'},
      {color: '#008000', severity: '2'},
      {color: '#FF0000', severity: '3'},
      {color: '#FFFF00', severity: '4'},
    ];
  }

}
