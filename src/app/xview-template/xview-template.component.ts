import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TenantService } from '../services/tenant.service';
@Component({
  selector: 'app-xview-template',
  templateUrl: './xview-template.component.html',
  styleUrls: ['./xview-template.component.scss'],
  providers: [TenantService]
})
export class XviewTemplateComponent implements OnInit {

 imgURL = "/assets/img/logo.png";
  user = {
    name: "",
    picture: "",
    tenantId: ""
  };
  photo = '/assets/partner/xops.png';
  constructor(private userService: UserService, private tenantService: TenantService) {

  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {

      console.log(res.id);
      this.user = res;
      this.userService.setUserName(this.user.name);
      var tenant_id = this.user.tenantId;
      this.userService.setTenant(tenant_id);
      this.userService.setEmail(res.id);
      this.tenantService.updateURLs();

      this.tenantService.getTenantDetails().subscribe(res2 => {
        console.log(JSON.stringify(res2))
     
        if(typeof res2.result.tenant.banner!='undefined')
        {
            // this.photo = res2.result.tenant.banner;
            this.photo = '/assets/partner/xops.png'
        }
       else
       {
          this.photo = '/assets/partner/xops.png'
       }

      });
    });

  }

}
