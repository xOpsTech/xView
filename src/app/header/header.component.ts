import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TenantService } from '../services/tenant.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  user = {
    name: "",
    picture: "",
    tenantId: ""
  };


  logourl = "/assets/img/logo.png"
  toggleicon = "/assets/img/nav-expand.png";
  selected: boolean;

  constructor(private userService: UserService, private tenantService: TenantService, private router: Router, private route: ActivatedRoute) {
    this.selected = false;
  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
      this.user = res.message[0];
      if(typeof res.message[0].picture =="undefined")
      {
        this.user.picture = "/assets/img/profilepics/default-profile-image.png"
      }
      else{
        this.user.picture = "/assets/img/profilepics/" + res.message[0].picture;
      }
 
    });
   

  }
  
  toggleimg() {
    if (this.toggleicon == "/assets/img/nav-expand.png") { this.toggleicon = "/assets/img/nav-collapse.png"; }
    else {
      this.toggleicon = "/assets/img/nav-expand.png"
    }
  }

  toggledropDown() {
    this.selected = !this.selected;
  }
  removedropDown() {
    this.selected = !this.selected;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("UserDetails");

    this.router.navigate(['/login'], { relativeTo: this.route });
    window.location.reload();
  }



}
