import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';

import { SignupService } from '../services/signup.service';
import { UserService } from '../services/user.service';
import { TenantService } from '../services/tenant.service';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'
import { config } from '../config/config';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [SignupService, MessageService, ConfirmationService],
  animations: [

    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])

  ]
})
export class ManageComponent implements OnInit {
  //Genric form group
  configureServicesForm: FormGroup;
  //Each Services Configgroup
  twitterConfigForm: FormGroup;
  serviceNowConfigForm: FormGroup;
  newRelicConfigForm: FormGroup;

  editlogConfigForm: FormGroup;

  selectedService: string = 'Select';
  selectedServiceToEdit: string = 'Select';
  account_name = "";

  consumer_key = "";
  consumer_secret = "";
  access_token = "";
  access_token_secret = "";
  tenant_id = "";
  apiKey = "";
  url = "";
  username = "";
  password = "";

  edit_account_name = "";
  edit_account_name_bkp = "";
  edit_consumer_key = "";
  edit_consumer_secret = "";
  edit_access_token = "";
  edit_access_token_secret = "";
  edit_log_account_name = ""
  edit_log_key=""
  edit_url = "";
  edit_apiKey = "";
  edit_username = "";
  edit_password = "";

  edit_api_key = "";
  edit_query_key = "";

  email = "";

  api_key = "";
  query_key = "";
  servicename = "";
  servicestable = [];
  services: SelectItem[];
  banners: SelectItem[];
  existingtenant: String = '';
  activeIndex: number = 0;
  existingtenantData = {
    services: []
  };

  tenantData = {
    services: []
  };

  user = {
    name: "",
    picture: "",
    tenantId: ""
  };

  display: boolean = false;
  display_logs: boolean = false;
  log_service_started: boolean = false;
  log_config_visibility: boolean = false;

  logindex = ""
  log_path1 = ""
  log_path2 = ""
  hosts = "";

  day: any;
  month: any;
  today_fo: any;

  hostip = config.elasticsearchurl;
  ngOnInit() {

    this.services = [];
    this.services.push({ label: 'Select Services--', value: 'Select' });
    this.services.push({ label: 'Twitter', value: 'twitter' });
    this.services.push({ label: 'ServiceNow', value: 'servicenow' });
    this.services.push({ label: 'New relic', value: 'newrelic' });
    this.services.push({ label: 'Log Configs', value: 'logconfs' });


    this.userService.getUserById().subscribe(res => {
      this.tenant_id = res.message[0].tenantId;
      this.email = res.message[0].id;
      this.log_path1 = "/opt/elasticsearch-5.5.0/logs/*.log";
      this.log_path2 = "/var/log/*.log";
      this.logindex = this.tenant_id + "%{" + this.getTodaysDate() + "}";
      this.hosts = "['" + this.hostip + "']";
    });

      this.tenantService.getTenantDetails().subscribe(res2 => {
        for (var service of res2["message"][0].services) {
          this.existingtenantData.services.push(service);
        }
      });

  
  }

  showDialog(selectedServiceObj) {
    console.log(selectedServiceObj);

    if (selectedServiceObj.service == 'twitter') {
      this.selectedServiceToEdit = 'twitter';
      this.edit_account_name = selectedServiceObj.account_name;
      this.edit_account_name_bkp = selectedServiceObj.account_name;
      this.edit_consumer_key = selectedServiceObj.consumer_key;
      this.edit_consumer_secret = selectedServiceObj.consumer_secret;
      this.edit_access_token = selectedServiceObj.access_token;
      this.edit_access_token_secret = selectedServiceObj.access_token_secret;
    }
    else if (selectedServiceObj.service == 'servicenow') {
      this.selectedServiceToEdit = 'servicenow';
      this.edit_account_name = selectedServiceObj.account_name;
      this.edit_account_name_bkp = selectedServiceObj.account_name;
      this.edit_url = selectedServiceObj.url;
      this.edit_apiKey = selectedServiceObj.apiKey;
      this.edit_username = selectedServiceObj.username;
      this.edit_password = selectedServiceObj.password;
    }
    else if (selectedServiceObj.service == 'newrelic') {
      this.selectedServiceToEdit = 'newrelic';
      this.edit_account_name = selectedServiceObj.account_name;
      this.edit_account_name_bkp = selectedServiceObj.account_name;
      this.edit_api_key = selectedServiceObj.api_key;
      this.edit_query_key = selectedServiceObj.query_key;
    }

    else if (selectedServiceObj.service == 'log') {
      this.selectedServiceToEdit = 'log';
      this.edit_log_account_name = selectedServiceObj.account_name;
      this.edit_account_name_bkp = selectedServiceObj.account_name;
      this.edit_log_key = selectedServiceObj.log_key;
   
    }
    this.display = true;
  }

  msgs: Message[] = [];
  msgs2: Message[] = [];
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private tenantService: TenantService, private signupService: SignupService, private userService: UserService, private fb3: FormBuilder) {
  }

onAccountSelect(value)
{
  if(value=="logconfs")
  {
    this.display_logs = true;
  }


}
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: '', detail: 'Account added Sucessfully' });
  }

  showSuccess2() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: '', detail: 'Logging status Updated Sucessfully' });
  }

  deleteService(index) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.msgs2 = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        console.log(this.existingtenantData.services);
        if (index > -1) {
          this.existingtenantData.services.splice(index, 1);
          console.log(JSON.stringify(this.existingtenantData.services));
          this.signupService.updateTenant(this.tenant_id, this.existingtenantData)
            .subscribe(res2 => {

            });
        }
      },
      reject: () => {
        this.msgs2 = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  editService(serviceobj) {
    console.log(serviceobj);
    for (var service of this.existingtenantData.services) {
      console.log()
      if (service.account_name == serviceobj.edit_account_name_bkp) {
        if (service.service == "twitter") {
          service.account_name = serviceobj.edit_account_name;
          service.consumer_key = serviceobj.edit_consumer_key;
          service.consumer_secret = serviceobj.edit_consumer_secret;
          service.access_token = serviceobj.edit_access_token;
          service.access_token_secret = serviceobj.edit_access_token_secret;
        }
        else if (service.service == "servicenow") {
          service.account_name = serviceobj.edit_account_name;
          service.url = serviceobj.edit_url;
          service.apiKey = serviceobj.edit_apiKey;
          service.username = serviceobj.edit_username;
          service.password = serviceobj.edit_password;
        }
        else if (service.service == 'newrelic') {
          service.account_name = serviceobj.edit_account_name;
          service.api_key = serviceobj.edit_api_key;
          service.query_key = serviceobj.edit_query_key;
        }
        else if (service.service == 'log') {
          service.account_name = serviceobj.edit_account_name;
          service.log_key = serviceobj.edit_log_key;
        }
      }
    }
    console.log(this.existingtenantData.services)
    this.signupService.updateTenant(this.tenant_id, this.existingtenantData)
      .subscribe(res2 => {

      });
  }
  addLogging(logform) {
    for (var service of this.existingtenantData.services) {
      if (logform.account_name == service.account_name) {
        this.msgs.push({ severity: 'error', summary: '', detail: 'That account name already exists, Please try a different name' });
        return;
      }
    }
   
    logform.service = 'log';
    logform.active = true;
    logform.service_started = true;
    this.existingtenantData.services.push(logform);

    this.signupService.updateTenant(this.tenant_id, this.existingtenantData)
    .subscribe(res2 => {
      this.showSuccess2();
    });

  }

  addAccountService(service) {
    console.log("service = " + JSON.stringify(service));
    for (var ser of this.existingtenantData.services) {
      if (ser.account_name == service.account_name) {

        this.msgs.push({ severity: 'error', summary: '', detail: 'That account name already exists, Please try a different name' });
        return;
      }

    }
    console.log(this.selectedService)
    console.log(service);

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
      this.existingtenantData.services.push(service);

    } else if (this.selectedService == 'servicenow') {
      service.service = 'servicenow';
      service.serviceId = 's1';
      service.active = true;
      service.service_started = false;
      this.existingtenantData.services.push(service);

    } else if (this.selectedService == 'newrelic') {
      service.service = 'newrelic';
      service.serviceId = 's2';
      service.active = true;
      service.service_started = false;
      console.log(JSON.stringify(service));
      this.existingtenantData.services.push(service);
    }


    else {
      this.existingtenantData.services.push({ "service": service.servicename, "url": service.serviceurl, "username": service.srusername, "password": service.srpassword })

    }

    this.signupService.updateTenant(this.tenant_id, this.existingtenantData)
      .subscribe(res2 => {
        this.showSuccess();
      });
  }
  //TO display Log Configuration Details
  getTodaysDate() {

    var today = new Date();
    var month = '' + (today.getMonth() + 1);
    var day = '' + today.getDate();
    var year = today.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    this.today_fo = year + '.' + month + '.' + day;
    return this.today_fo;
  }


}







