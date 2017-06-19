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
}
