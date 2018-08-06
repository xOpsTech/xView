import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class IncidentService {


  private incident_url = config.XOPSAPI + '/incidents/_create';
  private incident_assignees = config.XOPSAPI + '/user/_list';
  private incident_count_per_person = config.XOPSAPI + '/alerts/_count';


  constructor(private http: Http) {
   
  }

  postIncident(param: any): Observable<any> {
    let body = JSON.stringify(param);
    var token = localStorage.getItem('token');
    let headers = new Headers({token});
    return this.http
      .post(this.incident_url, body, {headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAssignees() {
    return this.http.get(this.incident_assignees)
      .map((res: Response) => res.json()).timeoutWith(5000, Observable.throw(new Error('Timeout Bro!')));
  }

  getAssigntoCountPerPerson(param: any): Observable<any> {
    let body = JSON.stringify(param);
    var token = localStorage.getItem('token');
    let headers = new Headers({token});
    return this.http
      .post(this.incident_count_per_person, body,  {headers})
      .map(this.extractData)
      .catch(this.handleError).timeoutWith(5000, Observable.throw(new Error('Timeout Bro!')));;
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
