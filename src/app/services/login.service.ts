import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class LoginService {
	 headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
	this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
   }

   Authenticate(user){
   	return this.http
      .post(config.XOPSHOST +'/login', {
        "id": user.id, "password": user.password,
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
