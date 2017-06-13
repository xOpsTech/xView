import { Component, OnInit } from '@angular/core';
import { UserService, } from './../user.service';
import {PersonalizationService } from './../personalization.service';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [PersonalizationService, UserService]
})
export class SettingsComponent implements OnInit {
putUserSetting = {}; 
usersets = {
    "email" :"",
      "name" : "",
           "personalization": {
          "timezone":"",
          "theme":"",
        "dashboard": {
          "loadtime": "",
          "ttfb": "",
          "dom_elements": "",
        }
 }
}

theme = "";
timezone = "";
fullnameval ="";
username = "";
widgetval: any [];

 public widget: string[];

public exampleData: Array<Select2OptionData>;
public options: Select2Options;
public value: string[];
public current: string;
public personalization = {};
public selectedItems: string[] = [];
public widget_array =  [];
public widgets =  [];


  constructor(private userService:UserService,private personalizationService:PersonalizationService) {
  }


  changed(data: {value: string[]}) {
    this.current = data.value.join(' | ');
  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
    this.usersets = res;
   
    this.fullnameval =this.usersets.name;
    this.username = this.usersets.email;
    this.theme = this.usersets.personalization.theme;
    this.timezone = this.usersets.personalization.timezone;
        });
       this.loadWidgetsList();
      this.value = ['loadtime', 'ttfb','dom_elements'];
       this.options = {
      multiple: true
    }

  }

   clicked = false;
   submitted = false;
  
   loadWidgetsList() {
    this.personalizationService.getWidgets()
      .subscribe(res => {
      
       for(var d of res.message)
        {  
            this.widget_array.push({'id':d.name,'text':d.label})
        }
        this.widgets= this.widget_array;
 
      });
  }

  loadPersonalizations() {
    this.personalizationService.getPersonalization(this.username)
      .subscribe(res => {
        if(res.message[0].personalization) {
          this.personalization = res.message[0].personalization.dashboard;

          this.selectedItems = [];
          for (var opt in this.personalization) {
            if (this.personalization[opt]) {
              this.selectedItems.push(opt);
            }
          }
          this.selectedItems = [...this.selectedItems];
        }
        console.log( this.selectedItems);
      })
  }

  onSubmit(settingForm: NgForm) {
   this.clicked = true;
 console.log(settingForm.value);
    this.putUserSetting = {
        "email" :settingForm.value.name,
          "name" : settingForm.value.fullname,
          "personalization": {
            "timezone": settingForm.value.timezone,
              "theme": settingForm.value.themes,
            "dashboard": {
              "loadtime": true,
              "ttfb": true,
              "dom_elements": false,
            }
        } 
      
      }
   this.userService.updateSettings( this.putUserSetting).subscribe(res => {},
             err => {console.log(err); });
   this.submitted = true;

  
  }
  active = true;



}

