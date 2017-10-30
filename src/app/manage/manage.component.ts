import { StepsModule, MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { EmailValidator } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PasswordValidation } from '../signup/passwordvalidation';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { SignupService } from '../services/signup.service';
import { UserService } from '../services/user.service';
import { TenantService } from '../services/tenant.service';

//define the constant url we would be uploading to.
const URL = 'http://localhost:4200/api/upload';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [SignupService]
})
export class ManageComponent implements OnInit {

  configureServicesForm: FormGroup;
  twitterConfigForm: FormGroup;
  serviceNowConfigForm: FormGroup;
  newRelicConfigForm: FormGroup;
  selectedService: string = 'Select';

  consumer_key = "";
  consumer_secret = "";
  access_token = "";
  access_token_secret = "";

  apiKey = "";
  url = "";
  username = "";
  password = "";

  api_key = "";
  query_key = "";

  servicestable = [];
  services: SelectItem[];
  banners: SelectItem[];
  existingtenant: String = '';
  activeIndex: number = 0;

  tenantData = {
    address: "",
    phone: "",
    banner: "",
    tenant: "",
    services: []
  };

  user = {
    name: "",
    picture: "",
    tenantId: ""
  };

  constructor(private tenantService: TenantService, private signupService: SignupService, private userService: UserService, private fb3: FormBuilder) {

    this.configureServicesForm = fb3.group({
      servicename: ['', Validators.required],
    }, );

  }

  ngOnInit() {

    this.userService.getUserData().subscribe(res => {
      console.log(res);
      var email = res.message[0].id;
      this.tenantService.getTenantDetails(email).subscribe(res2 => {

        for (var service of res2["result"].tenant["services"]) {
          this.tenantData.services.push(service);

          if (service.service == "twitter") {
            this.consumer_key = service.consumer_key;
            this.consumer_secret = service.consumer_secret;
            this.access_token = service.access_token;
            this.access_token_secret = service.access_token_secret;
          }

          if (service.service == "servicenow") {
            this.apiKey = service.apiKey;
            this.url = service.url;
            this.username = service.username;
            this.password = service.password;
          }

          if (service.service == "newrelic") {
            this.api_key = service.api_key;
            this.query_key = service.query_key;
          }
        }
      });
    });

    this.services = [];
    this.services.push({ label: 'Select Services--', value: 'Select' });
    this.services.push({ label: 'Twitter', value: 'twitter' });
    this.services.push({ label: 'ServiceNow', value: 'servicenow' });
    this.services.push({ label: 'New relic', value: 'newrelic' });

  }
  removeConfiguration(index) {
    console.log(this.tenantData.services);
    if (index > -1) {
      this.tenantData.services.splice(index, 1);
      console.log("removed" + this.tenantData.services);
    }
  }

  addservice(service) {
    console.log(service)
    var servicesData = {
      "service": "",
      "url": "",
      "username": "",
      "password": ""
    };

    if (this.selectedService == 'twitter') {
      service.service = 'twitter';
      service.serviceId = 's3';
      service.active = true;
      service.service_started = false;
      this.tenantData.services.push(service);

    } else if (this.selectedService == 'servicenow') {
      service.service = 'servicenow';
      service.serviceId = 's1';
      service.active = true;
      service.service_started = false;
      this.tenantData.services.push(service);

    } else if (this.selectedService == 'newrelic') {
      service.service = 'newrelic';
      service.serviceId = 's2';
      service.active = true;
      service.service_started = false;
      console.log(JSON.stringify(service));
      this.tenantData.services.push(service);


    } else {
      this.tenantData.services.push({ "service": service.servicename, "url": service.serviceurl, "username": service.srusername, "password": service.srpassword })

    }

    console.log(this.tenantData.services);
  }

  OnStage3Completion(configureServicesForm) {

    this.userService.getUserData().subscribe(res => {
      this.user = res.message[0];
      var tenant_id = this.user.tenantId
      console.log(tenant_id);
      console.log(this.tenantData);
      this.signupService.updateTenant(tenant_id, this.tenantData)
        .subscribe(res2 => {
          if (res2.status === 200) {
            // redirect to login
            window.location.href = "http://xview.xops.it/login";
          }
        });
    });

  }

}