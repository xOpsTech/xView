import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = {
    name: "",
    picture: "",
    tenantId: ""
  };
  constructor(private userService:UserService) {

  }

  ngOnInit() {
      this.userService.getUserData().subscribe(res => {
        this.user = res;
        this.userService.setUserName(this.user.name);
        this.userService.setTenant(this.user.tenantId);
      });
  }

}
