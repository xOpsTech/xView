import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions ,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config/config';
import 'rxjs';
import {DashboardDetails} from '../models/dashboardDetails';
@Injectable()
export class DashboardLinks {
  constructor(private http: Http) { }

  getDashboardLinks(tenantId) {
    var token = localStorage.getItem('token');
    let headers = new Headers({token});
    return this.http.get(config.XOPSAPI + '/dashboard/links/'+tenantId,{ headers })
      .map((res:Response) => res.json())
  }

  getDashboardLinksAsync(tenantId): Observable<DashboardDetails[]> {
    return this.http.get(config.XOPSAPI + '/dashboard/links/'+tenantId).map(res => {
        return res.json().message.map(val => {

          return new DashboardDetails(val.id,val.active,val.tenantId,val.topic);
        });
      });
}

    postDashboardLinks(chartJson)
  {
    var token = localStorage.getItem('token');
    let headers =  new Headers({token});
    console.log(chartJson)
    return this.http.post(config.XOPSAPI +"/dashboard",chartJson).map(this.extractData)
    .catch(this.handleError);
  }


  updateDashboardLinks(body,id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(body)
    return this.http.put(config.XOPSAPI +"/updatedashboard/"+id, body, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  deleteDashboardLinks(chid) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(config.XOPSAPI +"/deletechart/"+chid, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  getDashboardById(id) {
    var token = localStorage.getItem('token');
    let headers = new Headers({token});
    return this.http.get(config.XOPSAPI + '/dashboardbyid/'+id,{ headers })
      .map((res:Response) => res.json())
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
