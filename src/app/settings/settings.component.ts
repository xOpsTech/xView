import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],

})
export class SettingsComponent implements OnInit {
putUserSetting = {}; 
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
    this.username = this.usersets.email;
      });

  }
   clicked = false;
   submitted = false;

  onSubmit(settingForm: NgForm) {
   this.clicked = true;
   this.putUserSetting = {"email" :settingForm.value.name, "name" : settingForm.value.fullname} 
   this.userService.updateSettings( this.putUserSetting).subscribe(res => {},
             err => {console.log(err); });
   this.submitted = false;
   window.location.reload()

  }

  active = true;

  addsetting() {
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }


}

