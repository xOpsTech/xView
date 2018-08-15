import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';
import { UserService, } from '../services/user.service';
import { OnInit } from '@angular/core';

@Injectable()
export class AlertService {

  user = {
    name: "",
    picture: ""
  };
  tenantID:string;

  headers: Headers;
  options: RequestOptions;
  
  private newRelicMapData =config.XOPSAPI + '/newrelic/map/'; 
  private alertsUrl = config.XOPSAPI + '/alerts';; 
  private alertsStatUrl = config.XOPSAPI + '/alerts/stats';
  private myAlertsUrl = config.XOPSAPI + '/myalerts';

  
  constructor(private http: Http, private userService:UserService) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });   

  }


  getAlerts() {
    return this.http.get(this.alertsUrl)
      .map((res: Response) => res.json());
  }

  getNewRelicMapData() {
    return this.http.get(this.newRelicMapData)
    .map((res: Response) => res.json());
  }

  getAlertTrends(hours,tenantId){

    return this.http.get(this.alertsUrl +"/"+tenantId+`/trend?hours=${hours}`)
      .map((res: Response) => res.json());
  }

  getAllalertsByPearson() {
    return this.http.get(this.myAlertsUrl)
      .toPromise()
      .then(res => {
        var responseJson = res.json();
        return <Alert[]>res.json();
      })
      .then(data => {
        return data
      });
  }

  getALertsMapped(tenantId) {
    return this.http.get(this.alertsUrl+"/"+tenantId)
      .toPromise()
      .then(res => {
        var responseJson = res.json();
        return <Alert[]>res.json();
      })
      .then(data => {
        return data
      });
  }

  putService(param: any): Observable<any> {
    let body = JSON.stringify(param);
    return this.http
      .put(this.alertsUrl, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  widgetStatus(tenantId) {
    return this.http.get(this.alertsStatUrl+"/"+tenantId)
      .map((res: Response) => res.json());
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

export interface Alert {
  domain;
  _source;
}
