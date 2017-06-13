import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],

})
export class SettingsComponent implements OnInit {
putUserSetting = {};
usersets = {
    "email" :"",
      "name" : "",
      "personalization": {
        "dashboard": {
          "loadtime": "",
          "ttfb": "",
          "dom_elements": "",
          "timezone":"",
          "theme":""
        }
 }
}

theme = "";
timezone = "";
fullnameval ="";
username = "";
widgetss: string[];

public exampleData: Array<Select2OptionData>;
public options: Select2Options;
public value: string[];
public current: string;


  constructor(private userService:UserService) {
  }

    public widgets = [
    { id: 'widget1', text: 'widget 1' },
    { id: 'widget2', text: 'widget 2' },
    { id: 'widget3', text: 'widget 3' },
  ];


  changed(data: {value: string[]}) {
    this.current = data.value.join(' | ');
  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
    this.usersets = res;
    this.fullnameval =this.usersets.name;
    this.username = this.usersets.email;
    this.widgetss = [this.widgets[1].text]
    this.theme = this.usersets.personalization.dashboard.theme;
    this.timezone = this.usersets.personalization.dashboard.timezone;

      });


    this.options = {
      multiple: true
    }

  }

   clicked = false;
   submitted = false;

  onSubmit(settingForm: NgForm) {
   this.clicked = true;
   console.log(JSON.stringify(settingForm.value));
   this.putUserSetting = {
     "email" :settingForm.value.name,
      "name" : settingForm.value.fullname,
      "personalization": {
        "dashboard": {
          "loadtime": false,
          "ttfb": true,
          "dom_elements": true,
          "timezone": settingForm.value.timezone,
          "theme": settingForm.value.themes
        }
    }

	}
   this.userService.updateSettings( this.putUserSetting).subscribe(res => {},
             err => {console.log(err); });
   this.submitted = true;
  }
  active = true;

  addsetting() {
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }


}
