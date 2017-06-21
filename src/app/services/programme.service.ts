import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class ProgrammeService {
  private getProgrammeUrl = config.XOPSAPI+"/programs";

  constructor(private http:Http) {
  }

  getProgrammes() {
      return this.http.get(this.getProgrammeUrl)
                  .map((res:Response) => res.json())
  }

   

}
