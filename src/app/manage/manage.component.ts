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
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

//define the constant url we would be uploading to.
const URL = 'http://localhost:4200/api/upload';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [SignupService, MessageService,ConfirmationService]
})
export class ManageComponent implements OnInit {

  configureServicesForm: FormGroup;
  twitterConfigForm: FormGroup;
  serviceNowConfigForm: FormGroup;
  newRelicConfigForm: FormGroup;
  selectedService: string = 'Select';
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

  showDialog() {
    this.display = true;
  }
  msgs: Message[] = [];
  msgs2: Message[] = [];
  constructor(private confirmationService: ConfirmationService,private messageService: MessageService, private tenantService: TenantService, private signupService: SignupService, private userService: UserService, private fb3: FormBuilder) {
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
            this.msgs2 = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
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
            this.msgs2 = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}

  ngOnInit() {

    this.userService.getUserData().subscribe(res => {
      console.log(res);
      this.tenant_id = res.message[0].tenantId;
      var email = res.message[0].id;

      this.tenantService.getTenantDetails(email).subscribe(res2 => {
        for (var service of res2["result"].tenant["services"]) {
          this.existingtenantData.services.push(service);
        }

        for (var service1 of this.existingtenantData.services) {
          console.log(service1)
        }
      });
    });

    this.services = [];
    this.services.push({ label: 'Select Services--', value: 'Select' });
    this.services.push({ label: 'Twitter', value: 'twitter' });
    this.services.push({ label: 'ServiceNow', value: 'servicenow' });
    this.services.push({ label: 'New relic', value: 'newrelic' });

  }

  addAccountService(service) {
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