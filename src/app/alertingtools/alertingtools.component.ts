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
import { config } from '../config/config';
import { ToggleButtonModule } from 'primeng/primeng';
import { UserDetails } from '../models/userDetails';
import { MessageModule } from 'primeng/primeng';
import { isArray } from 'util';

@Component({
  selector: 'app-alertingtools',
  templateUrl: './alertingtools.component.html',
  styleUrls: ['./alertingtools.component.scss'],
  providers: [SignupService, MessageService, ConfirmationService],
})
export class AlertingtoolsComponent implements OnInit {

  //Genric form group
  configureServicesForm: FormGroup;
  //Each Services Configgroup
  twitterConfigForm: FormGroup;
  serviceNowConfigForm: FormGroup;
  newRelicConfigForm: FormGroup;

  editlogConfigForm: FormGroup;

  selectedAlertSource: string = 'Select';
  selectedAlertSourceToEdit: string = 'Select';
  emailAddress = "";
  smtpServer = "";


  pagerDutyServiceKey = "";
  pagerDutyClientName = ""
  pagerDutyIncidentKey = ""
  incKeyArgs1 = "";
  incKeyArgs2 = "";

  existingtenantDataEmail = {
    email: [],
  };
  existingtenantDataPagerduty = {
    pagerduty: []
  };
  updatingTenantData = {

  };
  tenant_id = ""
  servicestable = [];
  services: SelectItem[];
  banners: SelectItem[];
  existingtenant: String = '';
  activeIndex: number = 0;


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
  submitbuttonpd = true;
  editbuttonspd = false;
  submitbuttonem = true;
  editbuttonsem = false;
  alertkessonexistornot = ""
  day: any;
  month: any;
  today_fo: any;
  alert_tool_exists_msg: Message[] = [];
  hostip = config.elasticsearchurl;
  ngOnInit() {
    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    this.tenant_id = this.userDetails.tenantId.toString();

    this.services = [];
    this.services.push({ label: 'Select Services--', value: 'Select' });
    this.services.push({ label: 'Pager Duty', value: 'pagerduty' });
    this.services.push({ label: 'Email', value: 'email' });
  }

  showDialog(selectedServiceObj) {
    console.log(selectedServiceObj);
  }

  userDetails: UserDetails = {
    id: "",
    tenantId: ""
  }

  msgs: Message[] = [];
  msgs2: Message[] = [];
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private tenantService: TenantService, private signupService: SignupService, private userService: UserService, private fb3: FormBuilder) {


  }

  onAlertSourceSelect(value) {
    if (value == "email") {
      this.selectedAlertSource = 'email';
      this.tenantService.getTenantDetails().subscribe(res => {
        console.log(res.message[0]["email"])
        if (res.message[0]["email"] != undefined) {
          this.msgs = [];
          this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'Email Already Configured' });
          this.emailAddress = res.message[0]["email"].emailaddress;
          this.smtpServer = res.message[0]["email"].smtpserver;
          this.submitbuttonem = false;
          this.editbuttonsem = true;
        }


      })


    }
    if (value == "pagerduty") {

      this.selectedAlertSource = 'pagerduty';
      this.tenantService.getTenantDetails().subscribe(res => {
        console.log(res.message[0]["pagerduty"])
        if (res.message[0]["pagerduty"] != undefined) {
          this.msgs = [];
          this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'PagerDuty Already Configured' });
          this.pagerDutyServiceKey = res.message[0]["pagerduty"].pagerdutyservicekey;
          this.pagerDutyClientName = res.message[0]["pagerduty"].pagerdutyclientname;
          this.submitbuttonpd = false;
          this.editbuttonspd = true;
        }
      });

    }

  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: '', detail: 'Alerting Tool added Sucessfully' });
  }

  showSuccess2() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: '', detail: 'Logging status Updated Sucessfully' });
  }

  deleteTool(tool) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {

        this.tenantService.getTenantDetails().subscribe(res => {

          if (tool == 'pagerduty') {
            this.updatingTenantData = { tool: 'pagerduty' }
            this.tenantService.deletetool(this.tenant_id, this.updatingTenantData)
              .subscribe(res2 => {
                console.log(res2)
              });
              window.location.reload();
          }
          else if (tool == 'email') {
            this.updatingTenantData = { tool: 'email' }
            this.tenantService.deletetool(this.tenant_id, this.updatingTenantData)
              .subscribe(res2 => {
                console.log(res2)
              });
              window.location.reload();
          }

        })
      },
      reject: () => {
        this.msgs2 = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  editService(serviceobj) {

  }

  addLogging(logform) {


  }

  addAlertingToolEmail(service) {
    service.alerttool = "email"
    this.existingtenantDataEmail.email = [];
    this.existingtenantDataEmail.email = service;
    console.log(this.existingtenantDataEmail.email)

    this.signupService.updateTenant(this.tenant_id, this.existingtenantDataEmail)
      .subscribe(res2 => {
        this.tenantService.createElastAlertEmail(this.tenant_id, this.existingtenantDataEmail).subscribe(res3 => {

          this.showSuccess();
          window.location.reload();
        });
      });
    
  }
  addAlertingToolPagerduty(service) {
    service.alerttool = "pagerduty"
    this.existingtenantDataPagerduty.pagerduty = [];
    this.existingtenantDataPagerduty.pagerduty = service;

    this.signupService.updateTenant(this.tenant_id, this.existingtenantDataPagerduty)
      .subscribe(res2 => {
        this.tenantService.createElastAlertPagerduty(this.tenant_id, this.existingtenantDataPagerduty).subscribe(res3 => {

          this.showSuccess();
          window.location.reload();
        });
      });
  }


}







