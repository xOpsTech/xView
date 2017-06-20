import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class RssfeedService {
  private getRssFeedUrl = config.XOPSAPI+"/scholastic/services-health";

  constructor(private http:Http) {
  }

  getRssFeed() {
      return this.http.get(this.getRssFeedUrl)
                  .map((res:Response) => res.json())
  }

}
