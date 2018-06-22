import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class PerfIndicatorService {

  constructor(private http: Http) { }

  getPerfIndicators() {
    return this.http.get(config.XOPSAPI + '/health_configs/configs/xtenant')
      .map((res: Response) => res.json())
  
  }  getHealth() {
    return this.http.get(config.XOPSAPI + '/health/xtenant_new')
      .map((res: Response) => res.json())
  
  }
}
