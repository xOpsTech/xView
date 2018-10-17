import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from '../config/config';
import { UserDetails } from '../models/userDetails';

@Component({
  selector: 'app-logsearch',
  templateUrl: './logsearch.component.html',
  styleUrls: ['./logsearch.component.scss'],
  providers: [AlertService]
})

export class LogsearchComponent implements OnInit {

  public logsearchurl;
  public searchq = "";
  tenant_id : String;
  tenant_id1 : String;
  // toggle iframe 
  private search: boolean = true;

  user = {
    name: "",
    picture: "",
    tenantId: ""
  };

  userDetails: UserDetails = {
    id: "",
    tenantId:""
  }

  constructor(private userService: UserService, private alertsService: AlertService, private sanitizer: DomSanitizer) {
  }

  onSearch(searchLogsForm) {
    if (localStorage.getItem("userDetails")!==null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    this.tenant_id = this.userDetails.tenantId;

      this.searchq = '';
      this.logsearchurl = '';

      // hide iframe
      if (this.search == true) {

        this.searchq = encodeURI(searchLogsForm.value.searchq);
        this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl(config.elasticsearchurl+":5601/app/kibana#/dashboard/4e1fb650-bc8a-11e8-a9b2-0772b75a29a0?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now%2Fw,mode:quick,to:now%2Fw))&_a=(description:'',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:10,i:'1',w:12,x:0,y:0),id:'2e8e8140-bc8a-11e8-a9b2-0772b75a29a0',panelIndex:'1',type:search,version:'6.2.3')),query:(language:lucene,query:\""+this.searchq+"\"),timeRestore:!f,title:Logs,viewMode:view)");
        this.search = false;
      }
      else {
        this.searchq = encodeURI(searchLogsForm.value.searchq);
        //this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl(config.elasticsearchurl+":5601/app/kibana#/dashboard/d7b3ea70-89d2-11e8-af0b-83353d84732f?embed=true&embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-7d,mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(_source),id:'51173b40-89d0-11e8-875c-893ed1ecf74b',panelIndex:1,row:1,size_x:20,size_y:10,sort:!('@timestamp',desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22logs-" + this.tenant_id + "-%22*+AND+" + this.searchq + "')),timeRestore:!f,title:'Logs+Dashboard',uiState:(),viewMode:view)");
        this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl(config.elasticsearchurl+":5601/app/kibana#/dashboard/4e1fb650-bc8a-11e8-a9b2-0772b75a29a0?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now%2Fw,mode:quick,to:now%2Fw))&_a=(description:'',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:10,i:'1',w:12,x:0,y:0),id:'2e8e8140-bc8a-11e8-a9b2-0772b75a29a0',panelIndex:'1',type:search,version:'6.2.3')),query:(language:lucene,query:\""+this.searchq+"\"),timeRestore:!f,title:Logs,viewMode:view)");

        this.search = true;
      }
     // this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl(config.elasticsearchurl+":5601/app/kibana#/dashboard/d7b3ea70-89d2-11e8-af0b-83353d84732f?embed=true&_g=()&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(_source),id:'51173b40-89d0-11e8-875c-893ed1ecf74b',panelIndex:1,row:1,size_x:6,size_y:3,sort:!('@timestamp',desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22logs-" + this.tenant_id1 + "-%22*')),timeRestore:!f,title:'Logs+Dashboard',uiState:(),viewMode:view)");
 
  }
  ngOnInit() {
    if (localStorage.getItem("userDetails")!==null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    this.tenant_id1 = this.userDetails.tenantId;
      this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl(config.elasticsearchurl+":5601/app/kibana#/dashboard/4e1fb650-bc8a-11e8-a9b2-0772b75a29a0?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now%2Fw,mode:quick,to:now%2Fw))&_a=(description:'',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:10,i:'1',w:12,x:0,y:0),id:'2e8e8140-bc8a-11e8-a9b2-0772b75a29a0',panelIndex:'1',type:search,version:'6.2.3')),query:(language:lucene,query:''),timeRestore:!f,title:Logs,viewMode:view)");
 
  }




}

