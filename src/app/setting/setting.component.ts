import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  twitter = false;
  service_now = false;
  newrelic = false;

  service: string;
  apiKey: any[];
  consumerkey: any[];
  active: boolean;
  servicestarted: boolean;
  password: any[];
  url: any[];
  username: any[];

  tenantData = {
    "id": "tenant_c",
    "tenant": "holmes",
    "address": "221B Baker Street",
    "phone": "94776666868",
    "services": [
      {
        "serviceId": "s3",
        "service": "twitter",
        "consumer_key": "QVhBEkpOIlyogRyl7IxDPEodC",
        "consumer_secret": "MHYnqIMe26QodxSaqV7haJSHfPz4WjtlSqfflOTRxuD0Exctdl",
        "access_token": "905887188167966720-JBNFzwipYqgF6Zkc8MKMn4yZDdccouA",
        "active": true,
        "service_started": false
      },
      {
        "serviceId": "s1",
        "service": "service_now",
        "url": "https://dev15347.service-now.com/api/now/table/incident",
        "apiKey": "key1",
        "username": "admin",
        "password": "RootAdmin1!",
        "active": true,
        "service_started": false
      },
      {
        "serviceId": "s2",
        "service": "newrelic",
        "url": "https://synthetics.newrelic.com/synthetics/api/v3/monitors",
        "apiKey": "key1",
        "active": true,
        "service_started": false
      }
    ]
  }
  constructor() {
  }

  services: SelectItem[] = [];

  ngOnInit() {

    this.services = [];
    this.services.push({ label: '--Select Services--', value: '' });
    for (var i = 0; i < (this.tenantData['services'].length); i++) {
      this.services.push({ label: this.tenantData['services'][i]['service'], value: this.tenantData['services'][i]['service'] });
      if (this.tenantData['services'][i]['service'] == "twitter") {

        this.service = this.tenantData['services'][i]['service'];
        this.consumerkey = this.tenantData['services'][i]['consumer_key'];
        this.active = this.tenantData['services'][i]['active'];
        this.servicestarted = this.tenantData['services'][i]['service_started'];
      }
      if (this.tenantData['services'][i]['service'] == "service_now") {

        this.service = this.tenantData['services'][i]['service'];
        this.url = this.tenantData['services'][i]['url'];
        this.apiKey = this.tenantData['services'][i]['apiKey'];
        this.username = this.tenantData['services'][i]['username'];
        this.password = this.tenantData['services'][i]['password'];
        this.active = this.tenantData['services'][i]['active'];
        this.servicestarted = this.tenantData['services'][i]['service_started'];

      }
      if (this.tenantData['services'][i]['service'] == "newrelic") {

        this.url = this.tenantData['services'][i]['url'];
        this.apiKey = this.tenantData['services'][i]['apiKey'];
        this.active = this.tenantData['services'][i]['active'];
        this.servicestarted = this.tenantData['services'][i]['service_started'];

      }

    }
  }

  onchange(event) {
    if (event.value == "twitter") {
      this.twitter = true;
      this.newrelic = false;
      this.service_now = false;

    }
    if (event.value == "service_now") {
      this.twitter = false;
      this.newrelic = false;
      this.service_now = true;
    }
    if (event.value == "newrelic") {
      this.twitter = false;
      this.newrelic = true;
      this.service_now = false;
    }
  }


}
