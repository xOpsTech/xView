import { Component, OnInit } from '@angular/core';
import { PersonalizationService } from 'app/personalization.service';
import { UserService } from 'app/user.service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [PersonalizationService, UserService]
})
export class DashboardComponent implements OnInit {
  display: boolean = false;
  personalization = {};
  selectedItems: string[] = [];
  msgs: Message[] = [];
  widgets: any[];

  user = {
    name: "",
    email: ""
  };

  constructor(private personalizationService : PersonalizationService, private userService : UserService) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
      this.user = res;
      this.loadPersonalizations();
      this.loadWidgetsList();
    });
  }

  personalize() {
    // Save personalization.
    this.personalizationService.savePersonalization(this.user.email, this.selectedItems, this.widgets)
      .subscribe(res => {
        if (!res.error) {
          this.msgs.push({severity:'info', summary:'Success!', detail:'Your settings have been saved.'});
          this.msgs = [...this.msgs];
          this.display = false;
          this.loadPersonalizations();
        } else {
          this.msgs.push({severity:'error', summary:'Error!', detail:'Failed to save settings.'});
          this.msgs = [...this.msgs];
        }
      })
  }

  showDialog() {
    this.loadPersonalizations();
    this.display = true;
  }

  loadPersonalizations() {
    this.personalizationService.getPersonalization(this.user.email)
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
      })
  }

  loadWidgetsList() {
    this.personalizationService.getWidgets()
      .subscribe(res => {
        this.widgets = res.message;
      })
  }
}
