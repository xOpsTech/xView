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
  providers: [TenantService, AlertService]
})
export class XviewTemplateComponent implements OnInit {

  imgURL = "/assets/img/logo.png";
  banner_image = globals.DEFAULT_BANNER;
  logo_image = globals.DEFAULT_LOGO;

  userDetails: UserDetails = {
    id: "",
    tenantId: ""
  }
  tenantDetails: TenantDetails = {
    banner: "",
    logo: "",
    id: ""
  }

  public alert_counts = {
    severity_stats:
    {
      critical: 0,
      warning: 0,
      info: 0
    }
  }
  tenantId = ""
  banner = ""
  logo = ""

  constructor(private userService: UserService, private tenantService: TenantService, private alertsService: AlertService) {

  }
  ngOnInit() {

    this.tenantService.getTenantDetails().subscribe(res => {
      this.tenantId = res.message[0].id;
      this.banner = res.message[0].banner;
      this.logo = res.message[0].logo;
      this.alertsService.widgetStatus(this.tenantId).subscribe(alerts => {

        if (alerts["severity_stats"] !== undefined) {
          this.alert_counts = alerts;
          console.log(this.alert_counts)
        }

      });

      if ( this.banner != undefined && this.banner  != '') {
        this.banner_image = "assets/img/banners/" + this.tenantId + "_banner.png";
      }
      else {
        this.banner_image = globals.DEFAULT_BANNER
      }


      if (this.logo != undefined && this.logo != '') {
        this.logo_image = "/assets/img/logo/" + this.tenantId + "_logo.png";
      }

      else {
        this.logo_image = globals.DEFAULT_LOGO;
      }

    }
  )}

}
