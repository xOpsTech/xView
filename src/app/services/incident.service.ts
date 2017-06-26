import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class IncidentService {
  headers: Headers;
  options: RequestOptions;

  private incdent_url = config.XOPSAPI+'/incidents/_create';

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
console.log(this.incdent_url);
  }


  postIncident(param: any): Observable<any> {
  let body = JSON.stringify(param);
  console.log(body);
  return this.http
    .post(this.incdent_url, body, this.options)
    .map(this.extractData)
    .catch(this.handleError);
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

