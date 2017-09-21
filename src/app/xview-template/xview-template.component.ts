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
    picture: "",
    tenantId: ""
  };
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
      this.user = res;
      this.userService.setUserName(this.user.name);
      var tenant_id = this.user.tenantId;
      this.userService.setTenant(tenant_id);
      this.updateURLs();
    });
  }

  updateURLs() {
    if (this.userService.getUsername().trim() == 'John Edwards') {
      this.imgURL = "/assets/img/logo/scholastic.png";
    } else {
      this.imgURL = "/assets/img/logo.png";
    }
  }

}
