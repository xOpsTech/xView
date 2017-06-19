import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class UserService {
  private getUserUrl = config.XOPSAPI+"/user";
  user = null;

  constructor(private http:Http) {
    console.log(this.getUserUrl);
    //this.user = this.getUserData();
  }

  getUserData() {
      return this.http.get(this.getUserUrl)
                  .map((res:Response) => res.json())
  }

 updateSettings(body: Object) {

        let headers      = new Headers({ 'Content-Type': 'application/json' });
        let options       = new RequestOptions({ headers: headers });
        return this.http.put(`${this.getUserUrl}/${body['email']}`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error));
    }

  getUser() {
    console.log(this.user);
    if (this.user !== null) {
      return this.user;
    } else {
      this.getUserData().subscribe(res => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }
}
