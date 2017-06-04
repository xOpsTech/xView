import { Component, Input } from '@angular/core';
import { Injectable }  from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Settings} from "app/settings/Settings";

@Injectable()
export class SettingsService {

  constructor(private http: Http) {

  }

  UsersettingsMapped() {
    return this.http.get('http://localhost:3000/api/user')
      .toPromise()
      .then(res => {
          var responseJson = res.json();
          // console.log(responseJson[0]._source);
          // return <Alert[]> res.json()._source
          return <Settings[]> res.json();
        }
      )
      .then(data => { return data});
  }
}

