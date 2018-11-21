import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class PerfIndicatorService {

  constructor(private http: Http) { }

  getPerfIndicators(tenantID) {
    return this.http.get(config.XOPSAPI + '/health_configs/configs/perfs/'+tenantID)
      .map((res: Response) => res.json())
  
  } 
  getItems(tenantID) {
    return this.http.get(config.XOPSAPI + '/health_configs/configs/items/'+tenantID)
      .map((res: Response) => res.json())
  
  } 
  getHealth(tenantID) {
    return this.http.get(config.XOPSAPI + '/health/'+tenantID)
      .map((res: Response) => res.json())
  
  }
}
