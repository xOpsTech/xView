import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class RssfeedService {
  private getRssFeedUrl = "http://localhost:4200/api/scholastic/services-health";

  constructor(private http:Http) {
  }

  getRssFeed() {
      return this.http.get(this.getRssFeedUrl)
                  .map((res:Response) => res.json())
  }

}
