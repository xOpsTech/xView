import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import {Settings} from "app/settings/Settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
  usersets: any = [];

  constructor(private SettingsService: SettingsService) {
  }

  ngOnInit() {
        this.SettingsService.UsersettingsMapped().then(usersets => {
      this.usersets = usersets;
      console.log(usersets);
    });
  }
 ;
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  setting = new Settings('kemindasamaraweera', 'Keminda Samaraweera');

  submitted = false;

  onSubmit(settingForm) {


  }
  // Reset the form with a new setting AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  addsetting() {
    this.setting = new Settings('', '');

    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}

