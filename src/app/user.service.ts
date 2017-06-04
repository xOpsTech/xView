import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class UserService {
  private getUserUrl = "/api/user";
  user = null;

  constructor(private http:Http) {
    console.log(this.getUserUrl);
    //this.user = this.getUserData();
  }

  getUserData() {
      return this.http.get(this.getUserUrl)
                  .map((res:Response) => res.json())
  }

  getUser() {
    console.log(this.user);
    if (this.user !== null) {
      return this.user;
    } else {
      this.getUserData().subscribe(res => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }
}
