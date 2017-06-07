import { Component, Input } from '@angular/core';
import { Injectable }  from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SettingsService {
 private getUserUrl = "/api/user";
  user = null;

  constructor(private http: Http) {

  }

  UsersettingsMapped() {
      return this.http.get(this.getUserUrl)
                  .map((res:Response) => res.json())
  }

   
 
}

