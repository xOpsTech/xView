import { Component, OnInit } from '@angular/core';
import { UserService, } from '../services/user.service';
import {PersonalizationService } from '../services/personalization.service';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//define the constant url we would be uploading to.
const URL = 'http://localhost:4200/api/upload';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [PersonalizationService, UserService]
})
export class SettingsComponent implements OnInit {
  putUserSetting = {};
  theme = "";
  timezone = "";
  fullnameval = "";
  username = "";
  widgetval: any[];
  userpicture = "";
  profilepicture = "";

  public widget: string[];

  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  public current: string;
  public personalization = <any>{};
  public selectedItems: string[] = [];
  public widget_array = [];
  public widgets = [];
  public bannerimage: any;
  public profileimage: any;
  user = [];
  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.

  //This is the default title property created by the angular cli. Its responsible for the app works 
  public uploader = new FileUploader({ url: URL, itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png'] });
  public uploader_2 = new FileUploader({ url: URL, itemAlias: 'photo', allowedMimeType: ['image/jpeg', 'image/png'] });

  constructor(private userService: UserService, ) {

  }

  changed(data: { value: string[] }) {
    this.current = data.value.join(' | ');
  }

  ngOnInit() {

    this.userService.getUserData().subscribe(res => {
      this.user = res.message[0];
      this.fullnameval = res.message[0].name;
      this.username = res.message[0].name.id;
      this.timezone = res.message[0].timezone;
      this.userpicture = res.message[0].picture;
      this.profilepicture = '/assets/img/profilepics/' + res.message[0].picture;
    });


    //-----------banner uploader-------------------
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('type', "banner");
      form.append('id', this.username);
    };
    //override the onAfterAddingfile property
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.bannerimage = response;
    };

    //-----------profile uploader-------------------
    this.uploader_2.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('type', "profilepic");
      form.append('id', this.username);
    };
    //override the onAfterAddingfile property
    this.uploader_2.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader to deal with the server response.
    this.uploader_2.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.profileimage = response;
    };


    // this.userService.getUserData().subscribe(res => {
    // this.usersets = res;

    // this.fullnameval =this.usersets.name;
    // this.username = this.usersets.email;
    // this.theme = this.usersets.personalization.theme;
    // this.timezone = this.usersets.personalization.timezone;
    //     });
    //  this.loadWidgetsList();
    this.value = ['loadtime', 'ttfb', 'dom_elements'];
    this.options = {
      multiple: true
    }

  }

  clicked = false;
  submitted = false;

  //  loadWidgetsList() {
  //   this.personalizationService.getWidgets()
  //     .subscribe(res => {

  //      for(var d of res.message)
  //       {
  //           this.widget_array.push({'id':d.name,'text':d.label})
  //       }
  //       this.widgets= this.widget_array;

  //     });
  // }

  // loadPersonalizations() {
  //   this.personalizationService.getPersonalization(this.username)
  //     .subscribe(res => {
  //       if(res.message[0].personalization) {
  //         this.personalization = res.message[0].personalization.dashboard;

  //         this.selectedItems = [];
  //         for (var opt in this.personalization) {
  //           if (this.personalization[opt]) {
  //             this.selectedItems.push(opt);
  //           }
  //         }
  //         this.selectedItems = [...this.selectedItems];
  //       }
  //       console.log( this.selectedItems);
  //     })
  // }

  onSubmit(settingForm: NgForm) {

    this.clicked = true;
    console.log(settingForm.value);
    this.putUserSetting = {
      "userId": settingForm.value.name,
      "name": settingForm.value.fullname,
      "timezone": settingForm.value.timezone,
      "banner": this.bannerimage,
      "picture": this.profileimage

    }
    this.userService.updateSettings(this.putUserSetting).subscribe(res => { },
      err => { console.log(err); });
    this.submitted = true;

  }
  active = true;


}
