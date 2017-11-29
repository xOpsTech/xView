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
import { DialogModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [SignupService, MessageService, ConfirmationService],
  animations: [
    
        trigger('goals', [
          transition('* => *', [
    
            query(':enter', style({ opacity: 0 }), {optional: true}),
    
            query(':enter', stagger('300ms', [
              animate('.6s ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
              ]))]), {optional: true})
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
  edit_consumer_key = "";
  edit_consumer_secret = "";
  edit_access_token = "";
  edit_access_token_secret = "";

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

  ngOnInit() {


    this.userService.getUserData().subscribe(res => {
      console.log(res);
      this.tenant_id = res.message[0].tenantId;
      this.email = res.message[0].id;

      this.tenantService.getTenantDetails(this.email).subscribe(res2 => {
        for (var service of res2["result"].tenant["services"]) {
          this.existingtenantData.services.push(service);
        }
      });
    });

    this.services = [];
    this.services.push({ label: 'Select Services--', value: 'Select' });
    this.services.push({ label: 'Twitter', value: 'twitter' });
    this.services.push({ label: 'ServiceNow', value: 'servicenow' });
    this.services.push({ label: 'New relic', value: 'newrelic' });

  }

  showDialog(selectedServiceObj) {
    console.log(selectedServiceObj);

    if (selectedServiceObj.service == 'twitter') {
      this.selectedServiceToEdit = 'twitter';
      this.edit_account_name = selectedServiceObj.account_name;
      this.edit_consumer_key = selectedServiceObj.consumer_key;
      this.edit_consumer_secret = selectedServiceObj.consumer_secret;
      this.edit_access_token = selectedServiceObj.access_token;
      this.edit_access_token_secret = selectedServiceObj.access_token_secret;
    }
    else if (selectedServiceObj.service == 'servicenow') {
      this.selectedServiceToEdit = 'servicenow'
      this.edit_account_name = selectedServiceObj.account_name;
      this.edit_url = selectedServiceObj.url;
      this.edit_apiKey = selectedServiceObj.apiKey;
      this.edit_username = selectedServiceObj.username;
      this.edit_password = selectedServiceObj.password;
    }
    else if (selectedServiceObj.service == 'newrelic') {
      this.selectedServiceToEdit = 'newrelic';
      this.edit_account_name = selectedServiceObj.account_name;
      this.edit_api_key = selectedServiceObj.api_key;
      this.edit_query_key = selectedServiceObj.query_key;
    }
    this.display = true;
  }
  msgs: Message[] = [];
  msgs2: Message[] = [];
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private tenantService: TenantService, private signupService: SignupService, private userService: UserService, private fb3: FormBuilder) {
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: '', detail: 'Account added Sucessfully' });
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
      if (service.account_name == serviceobj.edit_account_name) {
        if (service.service == "twitter") {
          service.consumer_key = serviceobj.edit_consumer_key;
          service.consumer_secret = serviceobj.edit_consumer_secret;
          service.access_token = serviceobj.edit_access_token;
          service.access_token_secret = serviceobj.edit_access_token_secret;
        }
        else if (service.service == "servicenow") {
          service.url = serviceobj.edit_url;
          service.apiKey = serviceobj.edit_apiKey;
          service.username = serviceobj.edit_username;
          service.password = serviceobj.edit_password;
        }

        else if (service.service == 'newrelic') {
          service.api_key = serviceobj.edit_api_key;
          service.query_key = serviceobj.edit_query_key;
        }
      }
    }
    console.log(this.existingtenantData.services)
    this.signupService.updateTenant(this.tenant_id, this.existingtenantData)
      .subscribe(res2 => {

      });
  }


  addAccountService(service) {
    for (var ser of this.existingtenantData.services) {
      if (ser.account_name == service.account_name) {

        this.msgs.push({ severity: 'error', summary: '', detail: 'That account name already exists, Please try a different name' });
        return;
      }
    }
    console.log(this.selectedService)
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


    } else {
      this.existingtenantData.services.push({ "service": service.servicename, "url": service.serviceurl, "username": service.srusername, "password": service.srpassword })

    }

    console.log(this.existingtenantData.services);
    this.signupService.updateTenant(this.tenant_id, this.existingtenantData)
      .subscribe(res2 => {
        this.showSuccess();
      });

  }
}