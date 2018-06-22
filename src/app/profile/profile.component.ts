import { Component, OnInit } from '@angular/core';
import { UserService, } from '../services/user.service';
import { TenantService, } from '../services/tenant.service';
//import { PersonalizationService } from '../services/personalization.service';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
//define the constant url we would be uploading to.
const URL = 'http://localhost:4200/api/upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],

})
export class ProfileComponent implements OnInit {
  putTenantSetting = {};
  tenantname = "";
  phonenumber = "";
  address = "";
  username = "";
  tenantid = "";
  public profileimage: any;
  public bannerimage: any;
  public logoimage: any;

  user = [];
  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.

  //This is the default title property created by the angular cli. Its responsible for the app works 
  public uploader_profile = new FileUploader({ url: URL, itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png'] });
  public uploader_banner = new FileUploader({ url: URL, itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png'] });
  public uploader_logo = new FileUploader({ url: URL, itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png'] });
  


  constructor(private userService: UserService, private tenantService: TenantService) {
  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res0 => {
      var email = res0.message[0].id;
      console.log(email)
      this.tenantService.getTenantDetails(email).subscribe(res => {
        this.tenantid = res.result.tenant.id;
        this.tenantname = res.result.tenant.tenant;
        this.phonenumber = res.result.tenant.phone;
        this.address = res.result.tenant.address;

      });
    });
    //-----------profile picture uploader-------------------
    this.uploader_logo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('type', "profile");
      form.append('id', this.tenantid);
    };
     //override the onAfterAddingfile property
    this.uploader_logo.onAfterAddingFile = (file) => { file.withCredentials = false; };
     //overide the onCompleteItem property of the uploader to deal with the server response.
    this.uploader_logo.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.profileimage = response;
    };

    //-----------banner uploader-------------------
    this.uploader_banner.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('type', "banner");
      form.append('id', this.tenantid);
    };
    //override the onAfterAddingfile property
    this.uploader_banner.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader to deal with the server response.
    this.uploader_banner.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.bannerimage = response;
    };

    //-----------logo uploader-------------------
    this.uploader_logo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('type', "logo");
      form.append('id', this.tenantid);
    };
    //override the onAfterAddingfile property
    this.uploader_logo.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader to deal with the server response.
    this.uploader_logo.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.logoimage = response;
    };


  }

  clicked = false;
  submitted = false;


  onSubmit(settingForm: NgForm) {

    this.clicked = true;
    console.log(settingForm.value);

    this.putTenantSetting = {
      "address": this.address,
      "phone": this.phonenumber,
      "banner": this.bannerimage,
      "tenant": this.tenantname,
      "logo": this.logoimage
    }

    this.tenantService.updateTenant(this.tenantid, this.putTenantSetting).subscribe(res => { },
      err => { console.log(err); });
    this.submitted = true;

  }
  active = true;


}
