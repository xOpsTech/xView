import { Component, OnInit } from '@angular/core';
import { Alert } from './Alert';
import { AlertService } from '../services/alert.service';
import { IncidentService } from '../services/incident.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  providers: [AlertService, IncidentService]
})

export class AlertsComponent implements OnInit {
  alert_put_values: { _id: string };
  title: any;
  alerts: Alert[] = [];
  display: boolean = false;
  cols2: any;
  eventid: any;
  status: any;
  private colorval: string;
  public widget_data;

  constructor(private alertsService: AlertService, private incidentService: IncidentService) {
  }

  disabled: boolean = true;

  showDialog() {
    this.display = true;
  }

  ngOnInit() {
    this.alertsService.getALertsMapped().then(alerts => {
      this.alerts = alerts;
    });

    this.alertsService.widgetStatus().subscribe(widget_data1 => {
      this.widget_data = widget_data1;
      console.log(this.widget_data)
    });
  }

  onRowSelect(event) {
    this.showDialog();
    this.status = event.data._source.status.toUpperCase();
    this.title = event.data._source.title;
    this.eventid = event.data._source.eventId;
    this.cols2 = [
      { head: 'Event ID', val: event.data._source.eventId },
      { head: 'Domain', val: event.data._source.domain },
      { head: 'Producer', val: event.data._source.producer },
      { head: 'Trigger', val: event.data._source.trigger },
      { head: 'Severity', val: event.data._source.severity },
      { head: 'State Trigger Id', val: event.data._source.stateTriggerId },
      { head: 'Monitored CI Name', val: event.data._source.monitoredCIName },
      { head: 'Raised Local Timestamp', val: event.data._source.raisedLocalTimestamp },
      { head: 'Stored Timestamp', val: event.data._source.storedTimestamp },
      { head: 'Timestamp Updated', val: event.data._source.timestampUpdated },
      { head: 'Closed Timestamp', val: event.data._source.closedTimestamp },
      { head: 'Location Code', val: event.data._source.locationCode },
      { head: 'State Trigger Id', val: event.data._source.stateTriggerId }
    ];

    if (event.data._source.severity == '1') {
      this.colorval = "red"
    }
    else if (event.data._source.severity == '2') {
      this.colorval = "orange"
    }
    else if (event.data._source.severity == '3') {
      this.colorval = "orange"
    }
    else if (event.data._source.severity == '4') {
      this.colorval = "yellow"
    }
  }
  alertselections: any[] = [
    { val: 'Assess', name: 'Assess' },
    { val: 'Incident', name: 'Incident' },
    { val: 'Invalid', name: 'Invalid' },
    { val: 'Ignore', name: 'Ignore' },
    { val: 'Closed', name: 'Closed' },

  ];

  onclickAsses(value, eventid) {
    if (value == "Ignore" || value == "Closed" || value == "Invalid") {
      this.alertsService.putService({
        "eventId": eventid,
        "status": value
      })
        .subscribe(
        result => console.log(result)
        );

    }

    if (value == "Incident") {

      this.incidentService.postIncident({ "eventId": eventid })
        .subscribe(
        result => console.log(result)
        );
    }
    else {

    }
  }

  //------ Alerts Chart
  public alertChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', fill: false },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', fill: false }
  ];
  public alertChartLabels: Array<any> = ['Jun 12', 'Jun 13', 'Jun 14', 'Jun 15', 'Jun 16', 'Jun 17', 'Jun 18'];
  public alertChartOptions: any = {
    type: "line",
    responsive: true
  };
  /*public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  } */
  //---- Alerts Chart End

  //----- Widget Data


  //---- Widget Data End

}
