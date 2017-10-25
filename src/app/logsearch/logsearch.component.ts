import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-logsearch',
  templateUrl: './logsearch.component.html',
  styleUrls: ['./logsearch.component.scss'],
  providers: [AlertService]
})

export class LogsearchComponent implements OnInit {

  public logsearchurl;
  public tenant_id;
  public searchq = "";
      // toggle iframe 
private search:boolean = true;

  user = {
    name: "",
    picture: "",
    tenantId: ""
  };

  constructor(private userService: UserService, private alertsService: AlertService, private sanitizer: DomSanitizer) {
  }


  onSearch(searchLogsForm) {
    this.searchq='';
    this.logsearchurl = '';
    console.log(searchLogsForm.value)
    
    console.log(this.searchq);
    // hide iframe
    if(this.search == true){  
      this.searchq = encodeURI(searchLogsForm.value.searchq);
      this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl("http://35.196.242.246:5601/app/kibana#/dashboard/dc3ccc90-add9-11e7-b735-1d7e32f6ffa5?embed=true&_g=()&_a=(description:%27%27,filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(_source),id:%273c9776f0-add8-11e7-8cb5-cd6bd3193b0e%27,panelIndex:1,row:1,size_x:12,size_y:7,sort:!(timestamp,desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:%27_index:%22metrics-fvowgm8%22%20AND%20" + this.searchq + "%27)),timeRestore:!f,title:%27Search%20Dashboard%27,uiState:(),viewMode:view)");
      this.search = false; 
  }
    else{
      this.searchq = encodeURI(searchLogsForm.value.searchq);
      this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl("http://35.196.242.246:5601/app/kibana#/dashboard/dc3ccc90-add9-11e7-b735-1d7e32f6ffa5?embed=true&_g=()&_a=(description:%27%27,filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(_source),id:%273c9776f0-add8-11e7-8cb5-cd6bd3193b0e%27,panelIndex:1,row:1,size_x:12,size_y:7,sort:!(timestamp,desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:%27_index:%22metrics-fvowgm8%22%20AND%20" + this.searchq + "%27)),timeRestore:!f,title:%27Search%20Dashboard%27,uiState:(),viewMode:view)");
      this.search = true;
    }
    console.log(this.logsearchurl);
   // show iframe



  }
  ngOnInit() {

    this.userService.getUserData().subscribe(res => {
      console.log(res.id);
      this.user = res;
      this.userService.setUserName(this.user.name);
      this.tenant_id = this.user.tenantId;
      console.log(this.tenant_id);
    });

  }

}

