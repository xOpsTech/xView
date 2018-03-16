import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';
import { UserService, } from '../services/user.service';
import { OnInit } from '@angular/core';

@Injectable()
export class MapService {

  user = {
    name: "",
    picture: ""
  };
  tenantID:string;

  headers: Headers;
  options: RequestOptions;

  private new_relic_map_data; 

  constructor(private http: Http, private userService:UserService) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });   

  }

  updateURLs() {
    var tenantID = this.userService.getTenantId();
    this.new_relic_map_data = config.XOPSAPI + '/newrelic/map/' + tenantID;
  }


  getNewRelicMapData()
  {
    var tenantID = this.userService.getTenantId();
    var url = config.XOPSAPI + '/newrelic/map/' + tenantID;
    console.log(url);
    //var url = 'http://localhost:4200/api/newrelic/map/dmetbyc'
    return this.http.get(url)
    .map((res: Response) => res.json());
  }

}