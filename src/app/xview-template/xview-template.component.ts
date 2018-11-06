import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TenantService } from '../services/tenant.service';
import { globals } from '../config/globals';
import { UserDetails } from '../models/userDetails';
import { TenantDetails } from '../models/tenantDetails';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-xview-template',
  templateUrl: './xview-template.component.html',
  styleUrls: ['./xview-template.component.scss'],
  providers: [TenantService,AlertService]
})
export class XviewTemplateComponent implements OnInit {

  imgURL = "/assets/img/logo.png";
  banner_image = globals.DEFAULT_BANNER;
  logo_image = globals.DEFAULT_LOGO;

  userDetails: UserDetails = {
    id: "",
    tenantId:""
  }
  tenantDetails: TenantDetails = {
    banner: "",
    logo:"",
    id :""
  }

  public alert_counts = {
    severity_stats :
    {
      critical:0,
      warning:0,
      info:0
    }
  }
  tenantId = ""
  constructor(private userService: UserService, private tenantService: TenantService,private alertsService: AlertService) {

  }
  ngOnInit() {
    
    if (localStorage.getItem("userDetails") && localStorage.getItem("userDetails") !==null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
      this.tenantDetails = JSON.parse(localStorage.getItem("tenantDetails"));
    }
    this.tenantId =  this.userDetails.tenantId.toString();
    let email = this.userDetails.id.toString();

    this.alertsService.widgetStatus(this.tenantId).subscribe(alerts => {

      if(alerts["severity_stats"]!== undefined)
      {
        this.alert_counts = alerts;
        console.log(this.alert_counts)
      }

    });

      if (this.tenantDetails.banner != '') {
        this.banner_image = globals.DEFAULT_BANNER + this.tenantDetails.banner;
      }
      else {
        this.banner_image = '/assets/partner/xops.jpg'
      }


      if (typeof this.tenantDetails.logo != "undefined") {
        this.logo_image = "/assets/img/logo/" + this.tenantDetails.logo;
      }

      else {
        this.logo_image = globals.DEFAULT_LOGO;
      }

  }

}
