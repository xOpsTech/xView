import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-kibana-admin',
  templateUrl: './kibana-admin.component.html',
  styleUrls: ['./kibana-admin.component.scss']
})
export class KibanaAdminComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }
  public dashboardurl;
  ngOnInit() {
    this.dashboardurl = this.sanitizer.bypassSecurityTrustResourceUrl("http://elastic.xops.it:5601/app/kibana#/dashboard/b7b3ea70-89d2-11e8-af0b-83353d84732f?embed=true&embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-7d,mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(_source),id:'51173b40-89d0-11e8-875c-893ed1ecf74b',panelIndex:1,row:1,size_x:20,size_y:10,sort:!('@timestamp',desc),type:search)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22logs-*')),timeRestore:!f,title:'Logs+Dashboard',uiState:(),viewMode:view)");
  }

}
