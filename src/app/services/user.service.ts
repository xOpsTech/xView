
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class UserService {
  private getUserUrl = config.devUrl+"/user";
  private getcheckUserUrl = config.XOPSAPI+'/checkuser'
  private getUserDetailsUrl = config.XOPSAPI+"/user";
  private  getAllUsers = config.XOPSAPI+"/users";
  private  getAllUserTypes=config.XOPSAPI+"/userType";
  private updateuser = config.XOPSAPI+"/updateuser";

  user = null;
  email_id: string;
  emailv = null;
  username: string;
  tenantId: string;
  options: RequestOptions;

  constructor(private http: Http) {

  }

    checkUserStatus(email) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.get(`${this.getcheckUserUrl}/${email}`, { headers })
        .map((res: Response) => res.json())
    }

    getUserData() {
      var token = localStorage.getItem('token');
      let headers = new Headers({token});
      return this.http.get(this.getUserUrl ,{ headers })
        .map((res: Response) => res.json())
    }

  checkUser(userID){
    let userid =userID;
    let headers = new Headers({userid});
    return this.http.get(this.getcheckUserUrl ,{ headers })
      .map((res: Response) => res.json())
  }

  updateSettings(body: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.updateuser}/${body['email']}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  getUser() {
    if (this.user !== null) {
      return this.user;
    } else {
      this.getUserData().subscribe(res => {
        this.user = res.message[0];
        return this.user;
      });
    }
  }

  getUserByTenantId(tenantId) {
      var token = localStorage.getItem('token');
      let headers = new Headers({token});
      return this.http.get(this.getAllUsers+'/'+tenantId ,{ headers })
        .map((res: Response) => res.json())
    }

    getUserTypeByTenantId(tenantId){
      var token = localStorage.getItem('token');
      let headers = new Headers({token});
      return this.http.get(this.getAllUserTypes+'/'+tenantId ,{ headers })
        .map((res: Response) => res.json())

    }

  saveUserType(userType) {
    return this.http
      .post(config.XOPSAPI +'/userType', {
        "name": userType.name,
        "management": userType.management,
        "develop": userType.develop,
        "userTypeManager":userType.userTypeManager,
        "profileManager":userType.profileManager,
        "userManager":userType.userManager,
        "inputSourceManager":userType.userManager,
        "tenantId":userType.tenantId
      }, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getEmail() {
    this.getUserData().subscribe(res => {
      this.user = res.message[0];
      return this.user.id;
    });
  }

  getTenantId() {
    this.getUserData().subscribe(res => {
      this.user = res.message[0];
      return this.user.tenantId;
    });

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
