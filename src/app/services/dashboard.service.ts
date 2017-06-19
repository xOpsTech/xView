import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class DashboardService {
  private test_results_url = config.XOPSAPI+'/results';

  constructor(private http: Http) { }

  getLoadTimes() {
    return this.http.get(this.test_results_url)
                    // .map(this.extractData)
                    .map((res:Response) => res.json())
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
    // return body.data || { };
  }
}
