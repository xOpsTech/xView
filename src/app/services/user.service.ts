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
  user = null;
  email_id: string;
  emailv = null;
  username: string;
  tenantId: string;
 

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
      console.log(headers)
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
    return this.http.put(`${this.getUserUrl}/${body['email']}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  getUser() {
    if (this.user !== null) {
      return this.user;
    } else {
      this.getUserData().subscribe(res => {
        console.log(res);
        this.user = res.message[0];
        return this.user;
      });
    }
  }


  getEmail() {
    this.getUserData().subscribe(res => {
      console.log(res);
      this.user = res.message[0];
      return this.user.id;
    });
  }

  getTenantId() {
    this.getUserData().subscribe(res => {
      console.log(res);
      this.user = res.message[0];
      return this.user.tenantId;
    });
 
  }
}
