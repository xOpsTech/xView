import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  credentials = {};

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
  }

  authenticate() {
    console.log(this.credentials);
    console.log(this.authenticationService.authenticate());
  }

}
