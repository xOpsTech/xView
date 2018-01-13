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
    tenantId: "",
    id:""
  };
  photo = '/assets/partner/xops.jpg';
  constructor(private userService: UserService, private tenantService: TenantService) {

  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {

      console.log(res.message[0]);
      this.user = res.message[0];
      var tenant_id = this.user.tenantId;
      var email = this.user.id;
      this.tenantService.getTenantDetails(email).subscribe(res2 => {
        console.log(JSON.stringify(res2))
     
        if(typeof res2.result.tenant.banner!='undefined')
        {
            // this.photo = res2.result.tenant.banner;
            this.photo = '/assets/partner/xops.jpg'
        }
       else
       {
          this.photo = '/assets/partner/xops.jpg'
       }

      });
    });

  }

}
