import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider } from 'angular4-social-login';
import * as jwt_decode from 'jwt-decode';
import { UserDetails } from '../models/userDetails';
import { TenantDetails } from '../models/tenantDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService, LoginService]
})

export class LoginComponent implements OnInit {
  payload = {};
  userDetails: UserDetails = {
    tenantId: "",
  }
  
  tenantDetails: TenantDetails;

  credentials = {

    "id": "",
    "password": ""
  };

  errorMessage: boolean = false;
  errorMessage2: boolean = false;

  user: SocialUser;

  constructor(private loginService: LoginService, private router: Router) {
 
  }

  ngOnInit() {

  }

  authenticate() {

    var user = this.credentials;
    var email = this.credentials.id;
    this.loginService.Authenticate(user)
      .subscribe(res => {
        if (res.success) {
          this.payload = this.getDecodedAccessToken(res.token);

          localStorage.setItem('token', res.token);
          localStorage.setItem('userDetails', JSON.stringify(this.payload["user"]));
          localStorage.setItem('tenantDetails', JSON.stringify(this.payload["tenant"]));

          this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
          this.tenantDetails = JSON.parse(localStorage.getItem("tenantDetails"));

          this.router.navigate(['/business']);
        }
        this.errorMessage = true;
      });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  signInWithGoogle(): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // if(this.user){
    //    this.credentials={id:this.user.email,password:'123456789ABC'};
    // }
  }

  signInTrigger(user) {
    //  if(user !== null){ 
    //     this.credentials={id:user.email,password:'123456789ABC'};
    //  }
  }

}