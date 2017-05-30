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

  postval: { _id: string};
  val: any = "nav-link";
  cols3: { color: string; severity: string; }[];
  title: any;
  storedTimestamp: any;
  raisedLocalTimestamp: any;
  id :any;
  alerts: Alert[] = [];
  display: boolean = false;

  domain: any[];
  severity: any;
  cols2: any;
  status: any;
  private colorval: string;
  constructor(private alertsService: AlertService) {


  }
  text: string;

  disabled: boolean = true;
  vale : string = "Edit";
  toggleDisabled() {
    this.disabled = !this.disabled;
   if(this.disabled == true)
   {
     this.vale ="Edit";
   }
   else {
     this.vale ="Save";
   }

  }

  showDialog() {
    this.display = true;
  }



  ngOnInit() {

    this.alertsService.getALertsMapped().then(alerts => {
      this.alerts = alerts;
});


  }

  onRowSelect(event) {
    this.showDialog();
    this.status  = event.data._source.status.toUpperCase();
    this.title  = event.data._source.title;

    this.cols2 = [
      {head: 'ID', val: event.data._source.id},
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

    if ( event.data._source.severity =='1' ){
      this.colorval = "red"
    }
    else if ( event.data._source.severity =='2' ){
      this.colorval = "orange"
    }
    else if (event.data._source.severity=='3' ){
      this.colorval = "orange"
    }
    else if (event.data._source.severity=='4' ){
      this.colorval = "yellow"
    }


  }

  onclickAsses()
  {

       this.alertsService.createService('http://35.184.66.182:4000/test/alerts', this.postval)
      .subscribe(
        result => console.log(result)

      );
  }

}
