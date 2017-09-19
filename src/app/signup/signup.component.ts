import { StepsModule, MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { SignupService } from '../services/signup.service';
import { EmailValidator } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PasswordValidation } from '../signup/passwordvalidation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]


})

export class SignupComponent implements OnInit {

  createAccountForm: FormGroup;
  organizationInfoForm: FormGroup;
  configureServicesForm: FormGroup;

  items: MenuItem[];
  stage1 = true;
  stage2 = false;
  stage3 = false;
  public stat = true;

  //Initialize Variables
  username: String = '';
  email: String = '';
  password: String = '';
  cnfmpassword: String = '';

  servicestable = [];
  services: SelectItem[];

  servers: SelectItem[];
  numberofemployees: SelectItem[];
  activeIndex: number = 0;

  userAccountData: {};
  tenantData = {
    address: "",
    phone: "",
    tenant: "",
    services: []
  };

  constructor(private signupService: SignupService, private fb1: FormBuilder, private fb2: FormBuilder, private fb3: FormBuilder) {
    this.createAccountForm = fb1.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9.@]*')])],
      password: ['', Validators.required],
      cnfmpassword: ['', Validators.required]
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });


    this.organizationInfoForm = fb2.group({
      orgaddress: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      tenant: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      numberofemployees: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      servers: ['', Validators.required]
    }, );

    this.configureServicesForm = fb3.group({
      servicename: ['', Validators.required],
      serviceurl: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      srusername: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      srpassword: ['', Validators.required]

    }, );
  }

  ngOnInit() {

    this.services = [];
    this.services.push({ label: '--Select Services--', value: '' });
    this.services.push({ label: 'Apica', value: 'Apica' });
    this.services.push({ label: 'CloudTest', value: 'CloudTest' });
    this.services.push({ label: 'Loadrunner ', value: 'Loadrunner ' });
    this.services.push({ label: 'blitz', value: 'blitz' });

    this.servers = [];
    this.servers.push({ label: '--Select Servers--', value: '' });
    this.servers.push({ label: '1-3 Servers', value: '1-3 Servers' });
    this.servers.push({ label: '3-10 Servers', value: '3-10 Servers' });
    this.servers.push({ label: '11-20 Servers', value: '11-20 Servers' });
    this.servers.push({ label: '21+ Servers  ', value: '1-3 Servers' });

    this.numberofemployees = [];
    this.numberofemployees.push({ label: '--Select range--', value: '' });
    this.numberofemployees.push({ label: '2-20 ', value: '2-20' });
    this.numberofemployees.push({ label: '21-100 ', value: '21-100' });
    this.numberofemployees.push({ label: '101-1000 ', value: '101-1000' });
    this.numberofemployees.push({ label: '1001-5000   ', value: '1001-5000' });
    this.numberofemployees.push({ label: '5000+', value: '5000+' });
    this.numberofemployees.push({ label: 'Just Me', value: 'Just Me' });

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
    if (index > -1) {
      this.servicestable.splice(index, 1);
      console.log(this.servicestable);
    }
  }
  OnStage1Completion(CreateAccountForm) {
    this.activeIndex = 1;
    this.setDiv();

    this.userAccountData = CreateAccountForm;
    console.log(this.userAccountData);
  }

  OnStage2Completion(OrginizationInfoForm) {
    this.activeIndex = 2;
    this.setDiv();
    this.tenantData.tenant = OrginizationInfoForm.tenant;
    // console.log(OrginizationInfoForm.tenant);
  }

  addservice(configureServicesForm) {
    this.setDiv();
    console.log(configureServicesForm);
    var servicesData = {
      "service": "",
      "url": "",
      "username": "",
      "password": ""
    };

    this.servicestable.push({ "service": configureServicesForm.servicename, "url": configureServicesForm.serviceurl, "username": configureServicesForm.srusername, "password": configureServicesForm.srpassword })
    console.log(this.servicestable);

  }

  OnStage3Completion(configureServicesForm) {
    this.tenantData.services.push(this.servicestable);
    delete this.userAccountData['cnfmpassword'];
    var payload = {
      "tenant": this.tenantData,
      "user": this.userAccountData
    };
    console.log(JSON.stringify(this.tenantData));
    console.log(this.userAccountData);


    //create user account
    this.signupService.createUserAccount(this.userAccountData)
      .subscribe(res => {
        if (res.status === 200) {
          //save tenant
          this.signupService.saveTenant(this.tenantData)
            .subscribe(response => {
              if (response.status === 200) {
                // redirect to login
                console.log('success');
              }
            })
        }
      });
    // window.location.href = "http://localhost:4200/login";
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