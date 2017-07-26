import { StepsModule, MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }
        
        .ui-steps.steps-custom {
            margin-bottom: 30px;
        }
         
        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            height: 10px;
            padding: 0 1em;
        }
         
        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            background-color: #0081c2;
            color: #FFFFFF;
            display: inline-block;
            width: 36px;
            border-radius: 50%;
            margin-top: -14px;
            margin-bottom: 10px;
        }
        
        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #555555;
        }
    `]
})

export class SignupComponent implements OnInit {

  items: MenuItem[];
  stage1 = true;
  stage2 = false;
  stage3 = false;

  services: SelectItem[];
  activeIndex: number = 0;

  ngOnInit() {

    this.services = [];
        this.services.push({label:'--Select Services--', value:'--Select Services--'});
        this.services.push({label:'Apica', value:'Apica'});
        this.services.push({label:'CloudTest', value:'CloudTest'});
        this.services.push({label:'Loadrunner ', value:'Loadrunner '});
        this.services.push({label:'blitz', value:'blitz'});


    this.items = [{
      label: 'Step 1  \n Create Account',
      command: (event: any) => {
        this.activeIndex = 0;
        this.setDiv();
      }
    },
    {
      label: 'Step 2 \n Organization info',
      command: (event: any) => {
        this.activeIndex = 1;
        this.setDiv();
      }
    },
    {
      label: 'Step 3 \n Configurations Services',
      command: (event: any) => {
        this.activeIndex = 2;
        this.setDiv();
      }
    },

    ];

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
