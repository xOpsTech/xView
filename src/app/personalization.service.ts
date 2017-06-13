import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class PersonalizationService {
  // private url = 'http://localhost:3000';
  // private url = 'http://35.184.66.182:4200/api/user/';
   //private url = 'http://localhost:4200';
  private url = 'http://35.184.66.182:4200';

  constructor(private http : Http) { }

  getPersonalization(user:string) {
    return this.http.get(this.url + '/api/user/' + user)
      .map((res:Response) => res.json())
  }

  savePersonalization(user:string, selected, all_widgets:{}) {
    var payload = {
      personalization : {
        dashboard: {}
      }
    }

    for (var i in all_widgets) {
      var name = all_widgets[i].name;
      if (selected.indexOf(name) == -1) {
        payload.personalization.dashboard[name] = false;
      } else {
        payload.personalization.dashboard[name] = true;
      }
    }

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var endpoint = this.url + '/api/user/' + user;
    return this.http.put(endpoint, payload, options)
      .map((res:Response) => res.json())
  }

   savePersonalization2(email,fullname,theme,timezone, selected, all_widgets:{}) {
    var putUserSetting = {
        "name" : fullname,
        "personalization": {
            "timezone": timezone,
            "theme": theme,
          "dashboard": {
          }
      } 
    }

    for (var i in all_widgets) {
      var name = all_widgets[i].name;
      if (selected.indexOf(name) == -1) {
        putUserSetting.personalization.dashboard[name] = false;
      } else {
        putUserSetting.personalization.dashboard[name] = true;
      }
    }

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var endpoint = this.url + '/api/user/' + email;
    return this.http.put(endpoint, putUserSetting, options)
      .map((res:Response) => res.json())
  }

  getWidgets() {
    return this.http.get(this.url + '/api/widget')
      .map((res:Response) => res.json())
  }
}
