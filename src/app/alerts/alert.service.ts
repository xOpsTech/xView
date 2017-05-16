import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Alert } from './Alert';
import 'rxjs';


@Injectable()
export class AlertService {

  // private alerts_url = "http://localhost:3000/alerts";
  private alerts_url = "http://35.184.66.182:4000/test/alerts";

  constructor(private http: Http) { }

  getAlerts() {
    return this.http.get(this.alerts_url)
      .map((res:Response) => res.json())
  }

  getALertsMapped() {
    return this.http.get(this.alerts_url)
      .toPromise()
      .then(res => {
          var responseJson = res.json();
          // console.log(responseJson[0]._source);
          // return <Alert[]> res.json()._source
          return <Alert[]> res.json()
        }
      )
      .then(data => { return data});
  }

}
