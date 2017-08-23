import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class PerfIndicatorService {

  constructor(private http: Http) { }

  getPerfIndicators() {
    return this.http.get(config.XOPSAPI + '/health_configs/perf_indicators/tenant_a')
      .map((res: Response) => res.json())
    // return [{
    //   "id": "cpu:10.90.123.2",
    //   "thresholdRed": 80,
    //   "thresholdAmber": 70,
    //   "importance": 9
    // }]
  }
}
