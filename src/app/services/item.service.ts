import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class ItemService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  saveItem(tenantId,item) {
    return this.http.post(config.XOPSAPI + '/health_configs/item_indicators/'+tenantId, item)
      .map(this.extractData)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

}
