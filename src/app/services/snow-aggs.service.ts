import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { config } from '../config/config';

@Injectable()
export class SnowAggsService {
  constructor(private http:Http) { }

  getSnowAggs(duration:number) {
    return this.http.get(config.XOPSAPI + '/incidents?duration='+duration).map((res:Response) => res.json());
  }

  getSnowStats(duration: number) {
    return this.http.get(config.XOPSAPI + '/snstats?duration='+duration).map((res:Response) => res.json());
    // return this.http.get('http://localhost:3000/daily').map((res:Response) => res.json());
  }
}
