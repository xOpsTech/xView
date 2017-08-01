import { StepsModule, MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
    console.log(this.activeIndex);
    console.log(CreateAccountForm.value);
  }

  OnStage2Completion(OrginizationInfoForm: NgForm) {
    this.activeIndex = 2;
    this.setDiv();
    console.log(this.activeIndex);
    console.log(OrginizationInfoForm.value);
  }

  OnStage3Completion(ConfigurationServicesForm: NgForm) {
    this.setDiv();
    console.log(ConfigurationServicesForm.value);
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
