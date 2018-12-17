import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions ,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config/config';
import 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserDetails } from '../models/userDetails';
@Injectable()
export class DashboardLinks {
  
  private obg = new BehaviorSubject<Array<any>>([]); 
  cast = this.obg.asObservable();


  loadDboardLinks(newObj){
    console.log(newObj)
    this.obg.next(newObj);
  }

  userDetails: UserDetails = {
    userType: {
      management: false,
      develop: false,
      userTypeManager: false,
      profileManager: false,
      userManager: false,
      inputSourceManager: false
    }
  }

  tenant_id = "";
  constructor(private http: Http) {
    if (localStorage.getItem("userDetails") && localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
      this.tenant_id = this.userDetails.tenantId.toString();
     
    }
   }


  getDashboardLinks(tenantId) {
    var token = localStorage.getItem('token');
    let headers = new Headers({token});
    return this.http.get(config.XOPSAPI + '/dashboard/links/'+tenantId)
      .map((res:Response) => res.json())
  }

  getDashboardLinksByPermission(perObj) {
    var token = localStorage.getItem('token');
    let headers = new Headers({token});
    return this.http.post(config.XOPSAPI + '/dashboard/linksbyperm/',perObj)
      .map((res:Response) => res.json())
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

  deleteDashboard(dashboardid) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(config.XOPSAPI +"/dashboard/"+dashboardid, options)
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
