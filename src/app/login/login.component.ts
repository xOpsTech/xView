import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoginService } from '../services/login.service';
import { Router}     from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService ,LoginService]
})
export class LoginComponent implements OnInit {

  credentials = {};
  errorMessage:boolean = false;

  constructor(private authenticationService : AuthenticationService, private loginService:LoginService ,private router: Router) { }

  ngOnInit() {
  }

  authenticate() {
    var user = this.credentials;    
     this.loginService.Authenticate(user)
      .subscribe(res => {
             console.log(res);
            if (res.success) {
              localStorage.setItem('token', res.token);
              this.router.navigate(['/business']);
            }
            this.errorMessage=true;

        });
  }

}
