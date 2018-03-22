import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';
import { UserService, } from '../services/user.service';
import { OnInit } from '@angular/core';

@Injectable()
export class MapService {

  headers: Headers;
  options: RequestOptions;


  constructor(private http: Http, private userService:UserService) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });   

  }

  getNewRelicMapData(tenantID)
  {
    var url = config.XOPSAPI + '/newrelic/map/' + tenantID;
    console.log(url);
    return this.http.get(url)
    .map((res: Response) => {
      if (res) {
          if (res.status === 201) {
              return res.json();
          }
          else if (res.status === 200) {
            return res.json();
          }
      }
  }).   catch(this.handleError);
}

private handleError(error: any) { 
  let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  return Observable.throw(error);
}
 
  }

