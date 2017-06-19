import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';



@Injectable()
export class AlertService {
  headers: Headers;
  options: RequestOptions;

  // private alerts_url = "http://localhost:3000/alerts";
  private alerts_url = "http://localhost:4200/api/alerts";

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });

  }

  getAlerts() {
    return this.http.get(this.alerts_url)
      .map((res:Response) => res.json());
  }

  getALertsMapped() {
    return this.http.get(this.alerts_url)
      .toPromise()
      .then(res => {
          var responseJson = res.json();
          // console.log(responseJson[0]._source);
          // return <Alert[]> res.json()._source
          return <Alert[]> res.json();
        }
      )
      .then(data => { return data});
  }

  putService(url: string, param: any): Observable<any> {
  let body = JSON.stringify(param);
  return this.http
    .put(url, body, this.options)
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

export interface Alert {
    domain;
    _source;
}
