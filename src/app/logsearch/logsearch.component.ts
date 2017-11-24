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
  public searchq = "";
  // toggle iframe 
  private search: boolean = true;

  user = {
    name: "",
    picture: "",
    tenantId: ""
  };

  constructor(private userService: UserService, private alertsService: AlertService, private sanitizer: DomSanitizer) {
  }

  onSearch(searchLogsForm) {
    this.userService.getUserData().subscribe(res => {
      this.user = res.message[0];
      var tenant_id =  this.user.tenantId

      this.searchq = '';
      this.logsearchurl = '';

      // hide iframe
      if (this.search == true) {

        this.searchq = encodeURI(searchLogsForm.value.searchq);
        this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl("http://35.196.179.182:5601/app/kibana#/dashboard/33587930-bb30-11e7-82db-656a82ab6465?embed=true&embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-7d,mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(_source),id:'022a9960-bb30-11e7-8c86-41e12d00fa7f',panelIndex:1,row:1,size_x:12,size_y:5,sort:!('@timestamp',desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22logs-"+tenant_id+"-%22*+AND+"+this.searchq+"')),timeRestore:!f,title:'Logs+Dashboard',uiState:(),viewMode:view)");
        this.search = false;
      }
      else {
        this.searchq = encodeURI(searchLogsForm.value.searchq);
        this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl("http://35.196.179.182:5601/app/kibana#/dashboard/33587930-bb30-11e7-82db-656a82ab6465?embed=true&embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-7d,mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(_source),id:'022a9960-bb30-11e7-8c86-41e12d00fa7f',panelIndex:1,row:1,size_x:12,size_y:5,sort:!('@timestamp',desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22logs-"+tenant_id+"-%22*+AND+"+this.searchq+"')),timeRestore:!f,title:'Logs+Dashboard',uiState:(),viewMode:view)");
        
        this.search = true;
      }
    });
  }
  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
      this.user = res.message[0];
      var tenant_id1 = this.user.tenantId
      this.logsearchurl = this.sanitizer.bypassSecurityTrustResourceUrl("http://35.196.242.246:5601/app/kibana#/dashboard/33587930-bb30-11e7-82db-656a82ab6465?embed=true&embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-7d,mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(_source),id:'022a9960-bb30-11e7-8c86-41e12d00fa7f',panelIndex:1,row:1,size_x:12,size_y:5,sort:!('@timestamp',desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22logs-"+tenant_id1+"-%22*')),timeRestore:!f,title:'Logs+Dashboard',uiState:(),viewMode:view)");
    });
  }

}

