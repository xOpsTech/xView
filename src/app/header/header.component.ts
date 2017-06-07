import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {
    name: "",
    picture: ""
  };
  constructor(private userService:UserService) {

  }

  ngOnInit() {
      console.log(this.user);
      this.userService.getUserData().subscribe(res => {
        this.user = res;
      });
      console.log(this.user);
  }

}
