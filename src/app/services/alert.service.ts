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
  
  private alerts_url;  
  private new_relic_map_data; 
  private alerts_url_old = config.XOPSAPI + '/alerts';; 
  private alerts_stats_url = config.XOPSAPI + '/alerts/stats';
  private my_alerts_url = config.XOPSAPI + '/myalerts';
  constructor(private http: Http, private userService:UserService) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });   

  }

  updateURLs() {
    var tenantID = this.userService.getTenantId();
    this.alerts_url = config.XOPSAPI + '/alerts/' + tenantID;
    this.new_relic_map_data = config.XOPSAPI + '/newrelic/map/' + tenantID;
  }

  getAlerts() {
    return this.http.get(this.alerts_url)
      .map((res: Response) => res.json());
  }

  getNewRelicMapData()
  {
    return this.http.get(this.new_relic_map_data)
    .map((res: Response) => res.json());
  }



  getAlertTrends(hours): Observable<any[]> {
    return this.http.get(this.alerts_url_old + `/trend?hours=${hours}`)
      .map((res: Response) => res.json());
  }

  getAllalertsByPearson() {
    return this.http.get(this.my_alerts_url)
      .toPromise()
      .then(res => {
        var responseJson = res.json();
        return <Alert[]>res.json();
      })
      .then(data => {
        return data
      });
  }
  getALertsMapped() {
    return this.http.get(this.alerts_url)
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
    console.log(body);
    return this.http
      .put(this.alerts_url, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  widgetStatus() {
    return this.http.get(this.alerts_stats_url)
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
