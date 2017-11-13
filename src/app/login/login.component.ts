import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoginService } from '../services/login.service';
import { UserService} from '../services/user.service';
import { Router}     from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider} from 'angular4-social-login';
// import {GoogleSignInSuccess} from 'angular-google-signin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService ,LoginService]
})
export class LoginComponent implements OnInit {

  credentials = {};
  errorMessage:boolean = false;
  user: SocialUser;

  constructor(private authenticationService : AuthenticationService, private loginService:LoginService ,private router: Router ,
    private userService:UserService,private authService: AuthService) { }
  // private myClientId: string = '1097768545835-cr04oqb5at81e517jge5lfgmos3pcs0t.apps.googleusercontent.com';
  // private width:string='100%';
  ngOnInit() {
     this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  authenticate() {
    var user = this.credentials;     
     this.loginService.Authenticate(user)
      .subscribe(res => {           
            if (res.success) {              
              localStorage.setItem('token', res.token);
              this.router.navigate(['/business']);
            }
            this.errorMessage=true;

        });
  }
 signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    if(this.user){
       this.credentials={id:this.user.email,password:'123456789ABC'};
    }
  }

  signInTrigger(user){  
   if(user !== null){ 
      this.credentials={id:user.email,password:'123456789ABC'};
   }
 }

}
