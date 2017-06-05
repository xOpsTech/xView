import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],

})
export class SettingsComponent implements OnInit {
 
usersets = {
    name: "",
    picture: "",
    email:""
  };

fullnameval ="";
username = "";

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
    this.usersets = res;
    this.fullnameval =this.usersets.name;
    this.username = this.usersets.email.substring(0, this.usersets.email.indexOf( "@" ));
      });
  }

   submitted = false;

  onSubmit(settingForm) {
  }

  active = true;

  addsetting() {
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }


}

