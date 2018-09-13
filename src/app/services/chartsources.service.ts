import { Injectable } from "../../../node_modules/@angular/core";
import { Http, Response, RequestOptions ,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config/config';
import 'rxjs';

@Injectable()
export class ChartSourceService {
  constructor(private http: Http) { }

  getServerDetails() {
    var token = localStorage.getItem('token');
    let headers = new Headers({token});
    return this.http.get(config.XOPSAPI + '/getsources',{ headers })
      .map((res:Response) => res.json())
  }

  postChartDetails(chartJson)
  {
    var token = localStorage.getItem('token');
    let headers =  new Headers({token});
    return this.http.post(config.XOPSAPI +"/chart",chartJson).map(this.extractData)
    .catch(this.handleError);
  }

  getChartDetails(tenantID)
  {
    var token = localStorage.getItem('token');
    let headers =  new Headers({token});
    return this.http.get(config.XOPSAPI +"/chart/"+tenantID). map((res:Response) => res.json())
  }

  updateCharts(body,chid) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(body)
    return this.http.put(config.XOPSAPI +"/updatechartbyid/"+chid, body, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  deleteChartById(chid) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(config.XOPSAPI +"/deletechart/"+chid, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  getChartById(chartid)
  {
    var token = localStorage.getItem('token');
    let headers =  new Headers({token});
    return this.http.get(config.XOPSAPI +"/chartbyid/"+chartid). map((res:Response) => res.json())
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
