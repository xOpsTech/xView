import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';
import { UserService, } from './user.service';
import { OnInit } from '@angular/core';
import { UserDetails } from '../models/userDetails';

@Injectable()
export class TenantService {

  emailv: any;
  headers: Headers;
  options: RequestOptions;

  private getTenantUrl;

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
  constructor(private http: Http, private userService: UserService) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });

    if (localStorage.getItem("userDetails") && localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
      this.tenant_id = this.userDetails.tenantId.toString();
    console.log( "asdsdasd" +this.tenant_id)
    }

  }

  getTenantDetails() {
    return this.http.get(config.XOPSAPI + '/tenant/' + this.tenant_id)
      .map((res: Response) => res.json())
  }

  getTenantIDbytenant(tenant) {
    return this.http.get(config.XOPSAPI + '/gettenant/' + tenant)
      .map((res: Response) => res.json())
  }

  updateTenant(tenantdata) {

    return this.http
      .put(config.XOPSAPI + '/tenant/' + this.tenant_id, tenantdata, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deletetool(tenant, toolData) {
    console.log(tenant);
    return this.http
      .put(config.XOPSAPI + '/deletetool/' + tenant, toolData, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createElastAlertPagerduty(tenant, toolData) {
    console.log(tenant);
    return this.http
      .put(config.XOPSAPI + '/elastalert/pagerduty/' + tenant, toolData, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createElastAlertEmail(tenant, toolData) {
    console.log(tenant);
    return this.http
      .put(config.XOPSAPI + '/elastalert/email/' + tenant, toolData, this.options)
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
