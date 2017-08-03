import { Component, OnInit } from '@angular/core';
import { UserService, } from '../services/user.service';
@Component({
  selector: 'app-xview-template',
  templateUrl: './xview-template.component.html',
  styleUrls: ['./xview-template.component.scss']
})
export class XviewTemplateComponent implements OnInit {

  imgURL:string
  user = {
    name: "",
    picture: ""
  };
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
      this.user = res;
      this.userService.setUserName(this.user.name);
      this.updateURLs();
    });
  }

  updateURLs() {
    console.log(this.userService.getUsername());
    if (this.userService.getUsername().trim() == 'John Edwards') {
      this.imgURL = "/assets/img/logo/scholastic.png";
    } else {
      this.imgURL = "/assets/img/logo.png";
    }
  }

}
