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
widgetss:any [];
 public widget: string[];

public exampleData: Array<Select2OptionData>;
public options: Select2Options;
public value: string[];
public current: string;
public personalization = {};
public selectedItems: string[] = [];
public widgets =  [];
public widget_true =  [];

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

      // this.personalizationService.getWidgets().subscribe(res => {
        
              this.widgetss = [
        {
        "_id": "59392259b66f024194ea8c3d",
        "name": "loadtime",
        "label": "Load Time"
        },
        {
        "_id": "59392261b66f024194ea8c3e",
        "name": "ttfb",
        "label": "TTFB and Load Time"
        },
        {
        "_id": "59392267b66f024194ea8c3f",
        "name": "dom_elements",
        "label": "DOM Elements"
        }
        ];

      for(var d of this.widgetss)
      {
          this.widgets.push({'id':d.name,'text':d.label})
      }
        this.loadPersonalizations();
      this.value = ['loadtime', 'ttfb'];
      // });

    this.options = {
      multiple: true
    }

  }

   clicked = false;
   submitted = false;
   
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
   this.personalizationService.savePersonalization2(settingForm.value.name,
   settingForm.value.fullname,settingForm.value.themes,settingForm.value.timezone,settingForm.value.widgets,this.widgets);

  }
  active = true;



}

