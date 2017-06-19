import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SnowAggsService {
  //private url = 'https://api.myjson.com' + '/bins/gf8od';
  private url = 'http://localhost:4200/api/incidents'

  constructor(private http:Http) { }

  getSnowAggs(duration:number) {
    return this.http.get(this.url + '?duration='+duration).map((res:Response) => res.json());
  }
}
