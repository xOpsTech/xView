import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';
import { UserService, } from '../services/user.service';
import { OnInit } from '@angular/core';

@Injectable()
export class TenantService {

  emailv:string;

  headers: Headers;
  options: RequestOptions;
  
  private getTenantUrl;

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
    var emailv = this.userService.getEmail();
    this.getTenantUrl = config.XOPSAPI + '/tenant/' + emailv;
  }

 
  getUserBanner() {
    this.emailv = this.userService.getEmail();
    return this.http.get(this.getTenantUrl)
      .map((res: Response) => res.json())
  }
}
