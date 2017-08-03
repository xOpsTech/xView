import { StepsModule, MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import {SignupService} from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})

export class SignupComponent implements OnInit {

  items: MenuItem[];
  stage1 = true;
  stage2 = false;
  stage3 = false;

  services: SelectItem[];
  servers: SelectItem[];
  numberofemployees: SelectItem[];
  activeIndex: number = 0;

  userAccountData: {};
  tenantData = {
    tenant: "",
    services: []
  };

  constructor(private signupService : SignupService) {}

  ngOnInit() {

    this.services = [];
    this.services.push({ label: '--Select Services--', value: '--Select Services--' });
    this.services.push({ label: 'Apica', value: 'Apica' });
    this.services.push({ label: 'CloudTest', value: 'CloudTest' });
    this.services.push({ label: 'Loadrunner ', value: 'Loadrunner ' });
    this.services.push({ label: 'blitz', value: 'blitz' });

    this.servers = [];
    this.servers.push({ label: '1-3 Servers', value: '1-3 Servers' });
    this.servers.push({ label: '3-10 Servers', value: '3-10 Servers' });
    this.servers.push({ label: '11-20 Servers', value: '11-20 Servers' });
    this.servers.push({ label: '21+ Servers  ', value: '1-3 Servers' });

    this.numberofemployees = [];
    this.numberofemployees.push({ label: '2-20 ', value: '2-20' });
    this.numberofemployees.push({ label: '21-100 ', value: '21-100' });
    this.numberofemployees.push({ label: '101-1000 ', value: '101-1000' });
    this.numberofemployees.push({ label: '1001-5000   ', value: '1001-5000' });
    this.numberofemployees.push({ label: '5000+', value: '5000+' });
    this.numberofemployees.push({ label: 'Just Me', value: 'Just Me' });
 

    this.setDiv();
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

  OnStage1Completion(CreateAccountForm: NgForm) {
    this.activeIndex = 1;
    this.setDiv();
    // console.log(this.activeIndex);
    // console.log(CreateAccountForm.value);

    this.userAccountData = CreateAccountForm.value;
    console.log ( this.userAccountData );
    // this.signupService.createUserAccount(CreateAccountForm.value)
    // .subscribe(res => {
    //   if (res.status === 200) {

    //   }
    // });
  }

  OnStage2Completion(OrginizationInfoForm: NgForm) {
    this.activeIndex = 2;
    this.setDiv();
    // console.log(this.activeIndex);
    // console.log(OrginizationInfoForm.value);
    this.tenantData.tenant = OrginizationInfoForm.value.tenant;
  }

  OnStage3Completion(ConfigurationServicesForm: NgForm) {
    this.setDiv();

    var servicesData = {
      "service": "",
      "url": "",
      "username": "",
      "password": ""
    };

    console.log(ConfigurationServicesForm.value);

    servicesData.service = ConfigurationServicesForm.value.servicename;
    servicesData.url = ConfigurationServicesForm.value.serviceurl;
    servicesData.username = ConfigurationServicesForm.value.srusername;
    servicesData.password = ConfigurationServicesForm.value.srpassword;

    this.tenantData.services.push(servicesData);

    console.log(servicesData)

    delete this.userAccountData['cnfrmpassword'];

    var payload = {
      "tenant": this.tenantData,
      "user": this.userAccountData
    };

    // create user account
    this.signupService.createUserAccount(this.userAccountData)
    .subscribe(res => {
      if (res.status === 200) {
        // save tenant
        this.signupService.saveTenant(this.tenantData)
          .subscribe(response => {
            if (response.status === 200) {
              // redirect to login
              console.log('success');
            }
          })
      }
    });
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
