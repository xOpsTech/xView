
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { config } from '../config/config';
import { UserDetails } from '../models/userDetails';

@Injectable()
export class UserService {
  private getUserUrl = config.devUrl + "/user";
  private getcheckUserUrl = config.XOPSAPI + '/checkuser'
  private getUserDetailsUrl = config.XOPSAPI + "/userbyid";
  private getAllUsers = config.XOPSAPI + "/user";
  private getUserListUrl = config.XOPSAPI + "/user/_list";
  private getAllUserTypes = config.XOPSAPI + "/userType";
  private UserTypes = config.XOPSAPI + "/userType";
  private updateuser = config.XOPSAPI + "/updateuser";

  user = null;
  email_id: string;
  emailv = null;
  username: string;
  tenantId: string;
  options: RequestOptions;

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
  userid = ""
  constructor(private http: Http) {
    if (localStorage.getItem("userDetails") && localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
      this.tenant_id = this.userDetails.tenantId.toString();
      this.userid = this.userDetails.id.toString();
    }
  }

  checkUserStatus(email) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.getcheckUserUrl}/${email}`, { headers })
      .map((res: Response) => res.json())
  }

  getUserByLoggedInId() {
    var token = localStorage.getItem('token');
    let headers = new Headers({ token });
    return this.http.get(this.getUserDetailsUrl + "/" + this.userid, { headers })
      .map((res: Response) => res.json())
  }

  getUserById(idvalue) {
    var token = localStorage.getItem('token');
    let headers = new Headers({ token });
    return this.http.get(this.getUserDetailsUrl + "/" + idvalue, { headers })
      .map((res: Response) => res.json())
  }

  getUserData() {
    var token = localStorage.getItem('token');
    let headers = new Headers({ token });
    return this.http.get(this.getAllUsers, { headers })
      .map((res: Response) => res.json())
  }

  getUserList(tenantId) {
    var token = localStorage.getItem('token');
    let headers = new Headers({ token });
    return this.http.get(this.getUserListUrl+"/"+tenantId, { headers })
      .map((res: Response) => res.json())
  }
  checkUser(userID) {
    let userid = userID;
    let headers = new Headers({ userid });
    return this.http.get(this.getcheckUserUrl, { headers })
      .map((res: Response) => res.json())
  }

  updateSettings(body: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.updateuser}/${body['email']}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }


  updateUsertype(id,usertypessobj) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(usertypessobj)
    return this.http.put(`${this.UserTypes}/${id}`, usertypessobj, options)
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
    let headers = new Headers({ token });
    return this.http.get(this.getAllUsers + '/' + tenantId, { headers })
      .map((res: Response) => res.json())
  }

  getUserTypeByTenantId(tenantId) {
    var token = localStorage.getItem('token');
    let headers = new Headers({ token });
    return this.http.get(this.getAllUserTypes + '/' + tenantId, { headers })
      .map((res: Response) => res.json())

  }

  saveUserType(userType) {
    return this.http
      .post(config.XOPSAPI + '/userType', {
        "name": userType.name,
        "management": userType.management,
        "develop": userType.develop,
        "userTypeManager": userType.userTypeManager,
        "profileManager": userType.profileManager,
        "userManager": userType.userManager,
        "inputSourceManager": userType.userManager,
        "tenantId": userType.tenantId
      }, this.options)
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
    return Observable.throw(errMsg);
  }
}
