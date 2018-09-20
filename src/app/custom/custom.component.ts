import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from '../config/config';
import { UserDetails } from '../models/userDetails';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  public dashboardurl;

  userDetails: UserDetails = {
    id: "",
    tenantId:""
  }

  tenantId : String;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {


    if (localStorage.getItem("userDetails")!==null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    this.tenantId = this.userDetails.tenantId;
 
      console.log("tenantid is  :" +  this.tenantId)
   this.dashboardurl = this.sanitizer.bypassSecurityTrustResourceUrl("http://elastic.xops.it:5601/app/kibana#/dashboard/6300a4b0-bc8c-11e8-a9b2-0772b75a29a0?_g=()&_a=(description:'',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:3,i:'1',w:6,x:0,y:0),id:e4e662e0-bc8b-11e8-a9b2-0772b75a29a0,panelIndex:'1',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'2',w:6,x:6,y:0),id:'3ae15790-bc8c-11e8-a9b2-0772b75a29a0',panelIndex:'2',type:visualization,version:'6.2.3')),query:(language:lucene,query:''),timeRestore:!f,title:Custom_dashboard,viewMode:view)");

//      this.dashboardurl = this.sanitizer.bypassSecurityTrustResourceUrl(config.elasticsearchurl+":5601/app/kibana#/dashboard/416945a0-a2e8-11e7-9c2c-d9d631a7609a?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-24h,mode:quick,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:'xops',disabled:!f,index:'metrics*',key:monitorName.keyword,negate:!t,type:phrase,value:xops),query:(match:(monitorName.keyword:(query:xops,type:phrase)))),('$state':(store:appState),meta:(alias:xops-app,disabled:!t,index:'metrics-*',key:monitorName.keyword,negate:!f,type:phrase,value:xops-app),query:(match:(monitorName.keyword:(query:xops-app,type:phrase)))),('$state':(store:appState),meta:(alias:xops-fb,disabled:!t,index:'metrics-*',key:monitorName.keyword,negate:!f,type:phrase,value:xops-fb),query:(match:(monitorName.keyword:(query:xops-fb,type:phrase))))),options:(darkTheme:!f),panels:!((col:1,id:'51f42150-a2df-11e7-aff1-89e2d800af41',panelIndex:1,row:1,size_x:5,size_y:3,type:visualization),(col:6,id:'1727ce10-a2e3-11e7-a303-3125a8904cb8',panelIndex:2,row:1,size_x:7,size_y:3,type:visualization),(col:1,id:de847db0-a2d8-11e7-a1f4-538c469e6dc7,panelIndex:4,row:7,size_x:12,size_y:4,type:visualization),(col:1,id:'615ff340-a2e8-11e7-8395-035f5eaddf20',panelIndex:5,row:4,size_x:12,size_y:3,type:visualization)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22metrics-" + tenant_id + "%22')),timeRestore:!t,title:'Newrelic+Dashboard',uiState:(P-1:(spy:(mode:(fill:!f,name:!n)),vis:(defaultColors:('0+-+500':'rgb(0,104,55)','1500+-+10000':'rgb(165,0,38)','500+-+1500':'rgb(255,255,190)'))),P-3:(vis:(defaultColors:('0+-+500':'rgb(0,104,55)','1500+-+10000':'rgb(165,0,38)','500+-+1500':'rgb(255,255,190)'))),P-4:(vis:(legendOpen:!f))),viewMode:view)");

  }

}
