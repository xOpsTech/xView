import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class DashboardService {
  private test_results_url = 'http://35.184.66.182:4000/test/results';
  // private test_results_url = 'http://localhost:3000/test_results';

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
