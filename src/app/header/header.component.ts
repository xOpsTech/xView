import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TenantService } from '../services/tenant.service';
import { globals } from '../config/globals';
import { UserDetails } from '../models/userDetails';
import { TenantDetails } from '../models/tenantDetails';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {

  toggleicon = globals.NAV_EXPAND_ICO;
  selected: boolean;
  logourl = globals.DEFAULT_LOGO;
  userDetails: UserDetails = {
    id: "",
    picture: ""
  }
  tenantDetails: TenantDetails = {
    banner: "",
    logo: "",
    id: ""
  }


  constructor(private userService: UserService, private tenantService: TenantService, private router: Router, private route: ActivatedRoute) {
    this.selected = false;

  }

  ngOnInit() {
    this.logourl = globals.DEFAULT_LOGO;
    
    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    if (typeof this.userDetails.picture == "undefined" || this.userDetails.picture == "") {
      this.userDetails.picture = '/assets/img/profilepics/default-profile-image.png'
    }
    else {
      this.userDetails.picture = "/assets/img/profilepics/" + this.userDetails.picture;
    }
  }

  toggleimg() {
    if (this.toggleicon == globals.NAV_EXPAND_ICO) { this.toggleicon = globals.NAV_COLLAPSE_ICO; }
    else {
      this.toggleicon = globals.NAV_EXPAND_ICO;
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
    localStorage.removeItem("userDetails");

    this.router.navigate(['/login'], { relativeTo: this.route });
    window.location.reload();
  }



}
