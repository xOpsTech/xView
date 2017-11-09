import { StepsModule, MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { SignupService } from '../services/signup.service';
import { TenantService } from '../services/tenant.service';
import { EmailValidator } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PasswordValidation } from '../signup/passwordvalidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService, TenantService]
})

export class SignupComponent implements OnInit {

  createAccountForm: FormGroup;
  organizationInfoForm: FormGroup;
  configureServicesForm: FormGroup;
  twitterConfigForm: FormGroup;
  serviceNowConfigForm: FormGroup;
  newRelicConfigForm: FormGroup;
  selectedService: string = 'Select';

  items: MenuItem[];
  stage1 = true;
  stage2 = false;
  stage3 = false;
  public stat = true;
  tenantexist =false;
  //Initialize Variables
  username: String = '';
  email: String = '';
  password: String = '';
  cnfmpassword: String = '';
  public tenantId: String = '';
  servicestable = [];
  services: SelectItem[];
  banners: SelectItem[];
  existingtenant: String = '';
  activeIndex: number = 0;

  userAccountData: {};
  tenantData = {
    address: "",
    phone: "",
    banner: "",
    tenant: "",
    services: []
  };

  constructor(private tenantService: TenantService, private signupService: SignupService, private fb1: FormBuilder, private fb2: FormBuilder, private fb3: FormBuilder, private router: Router) {
    this.createAccountForm = fb1.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9.@]*')])],
      password: ['', Validators.required],
      cnfmpassword: ['', Validators.required]
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });


    this.organizationInfoForm = fb2.group({
      existingtenant: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      tenant: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
    }, );

    this.configureServicesForm = fb3.group({
      servicename: ['', Validators.required],

    }, );

    this.twitterConfigForm = fb3.group({
      consumer_key: new FormControl('', Validators.required),
      consumer_secret: new FormControl('', Validators.required),
      access_token: new FormControl('', Validators.required),
      access_token_secret: new FormControl('', Validators.required)
    });

    this.serviceNowConfigForm = fb3.group({
      url: new FormControl('', Validators.required),
      apiKey: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.newRelicConfigForm = fb3.group({
      url: new FormControl('', Validators.required),
      api_key: new FormControl('', Validators.required),
      query_key: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {


    this.services = [];
    this.services.push({ label: 'Select Services--', value: 'Select' });
    this.services.push({ label: 'Twitter', value: 'twitter' });
    this.services.push({ label: 'ServiceNow', value: 'servicenow' });
    this.services.push({ label: 'New relic', value: 'newrelic' });

    this.setDiv();
  }

  //Hide remove New Organization add
  onchangeorgid(event) {
    if (event == "" || event == null) {
      this.stat = true;
    }
    else {
      this.stat = false;
    }
  }

  OnStage1Click() {
    this.activeIndex = 0;
    this.setDiv();
  }

  OnStage2Click() {
    this.activeIndex = 1;
    this.setDiv();
  }

  OnStage3Click() {
    this.activeIndex = 2;
    this.setDiv();
  }


  removeConfiguration(index) {
    console.log(this.tenantData.services);
    if (index > -1) {
      this.tenantData.services.splice(index, 1);
      console.log("removed" + this.tenantData.services);
    }
  }
  OnStage1Completion(CreateAccountForm) {
    this.activeIndex = 1;
    this.setDiv();

    this.userAccountData = CreateAccountForm;
    console.log(this.userAccountData);
  }

  OnStage2Completion(OrginizationInfoForm) {
    console.log(OrginizationInfoForm)

    this.tenantData.banner = "http://xview.xops.it/assets/partner/" + OrginizationInfoForm.selectedBanner + ".jpg";
    this.tenantData.tenant = OrginizationInfoForm.tenant;
    this.existingtenant = OrginizationInfoForm.existingtenant;
    console.log(this.tenantData)

    
    console.log(this.userAccountData);
    if (typeof this.existingtenant !== 'undefined') {

      this.tenantService.getTenantIDbytenant(this.existingtenant)
        .subscribe(res1 => {
          this.tenantId = res1.tenantId;
          if(this.tenantId=="")
          {
            this.tenantexist =true;
            return null;
          }
        else{
          this.activeIndex = 2;
          this.setDiv();
        }
  })
}
  }

  addservice(service) {
    this.setDiv();
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

    delete this.userAccountData['cnfmpassword'];
    var payload = {
      "tenant": this.tenantData,
      "user": this.userAccountData
    };

    console.log(this.userAccountData);
    if (typeof this.existingtenant !== 'undefined') {
      delete this.tenantData['services'];

      this.tenantService.getTenantIDbytenant(this.existingtenant)
        .subscribe(res1 => {
          this.tenantId = res1.tenantId;
          console.log("tenatid + " + this.tenantId)
          this.userAccountData['tenantId'] = this.tenantId;

          // this.signupService.updateTenant(this.tenantId,this.tenantData)
          // .subscribe(response => {
          this.signupService.createUserAccount(this.userAccountData)
            .subscribe(res => {
              console.log(res);
              this.router.navigate(['/login']);
            });
        });

    }
    else {

      this.signupService.saveTenant(this.tenantData)
        .subscribe(response => {
          var tenantId = response.result.tenantId;
          console.log(tenantId);
          this.userAccountData['tenantId'] = tenantId;
          this.signupService.createUserAccount(this.userAccountData)
            .subscribe(res => {
              console.log("Response" + res);
              this.router.navigate(['/login']);

            });
          this.router.navigate(['/login']);
        });
    }
  }
  loginredirect(): void {
    this.router.navigate(['/login']);
  }



  setDiv() {
    if (this.activeIndex == 0) {
      this.stage1 = true;
      this.stage2 = false;
      this.stage3 = false;
    }
    else if (this.activeIndex == 1) {
      this.stage1 = false;
      this.stage2 = true;
      this.stage3 = false;
    }
    else if (this.activeIndex == 2) {
      this.stage1 = false;
      this.stage2 = false;
      this.stage3 = true;
    }
  }
}