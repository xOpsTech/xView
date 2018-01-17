import {Component, OnInit} from '@angular/core';
import {UserType} from './userManager/userType';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit{

  constructor(private userService: UserService) { }

  userAccountData: {};
  userType:UserType;
  public userManager:boolean=false;


  ngOnInit(): void {
    this.userAccountData = this.userService.getUserData().subscribe(res => {
      console.log(res);

      this.userType=res.message[0].userType;

      console.log(this.userType)

      this.userManager=this.userType.userManager;


    });
  }
}

