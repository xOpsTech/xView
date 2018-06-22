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
    id:"",
    banner:""
  };
  banner_image = '/assets/partner/xops.jpg';
  logo_image = "/assets/img/logo.png";

  constructor(private userService: UserService, private tenantService: TenantService) {

  }
  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
      this.user = res.message[0];
      var tenant_id = this.user.tenantId;
      var email = this.user.id;
      localStorage.setItem("UserDetails",JSON.stringify(res.message[0]));
      this.user = JSON.parse(localStorage.getItem("UserDetails"));
      console.log(this.user)
      this.tenantService.getTenantDetails(email).subscribe(res2 => {
     
        if(res2.result.tenant.banner!='')
        {
           console.log(res2.result.tenant.banner)
            this.banner_image = '/assets/img/banners/'+res2.result.tenant.banner;
        }
       else
       {
          this.banner_image = '/assets/partner/xops.jpg'
       }
   

       if (typeof res2.result.tenant.logo!= "undefined") 
       { 
         this.logo_image = "/assets/img/logo/" + res2.result.tenant.logo;
       }
        
       else {
         this.logo_image = "/assets/img/logo.png";
       }
      });
    });

  }

}
