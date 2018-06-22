import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { config } from '../config/config';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  authenticate () {
    console.log('auth service');
    return this.http.get('http://localhost:4201/api/auth/google')
      .map((res:Response) => res.json())
  }
}
