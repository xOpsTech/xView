import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { CircleProgressComponent } from '../../shared/circle-progress.component';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  providers: [AlertService]
})


export class BusinessComponent implements OnInit  {


  public alert_trend;
  public data;
  public sgopt;
  public svcWidgets = [];
  public dashboardurl;
  public tenant_id;
  user = {
    name: "",
    picture: "",
    tenantId: ""
  };

  constructor(private userService: UserService,private alertsService: AlertService, private sanitizer: DomSanitizer) {


    this.alertsService.getAlertTrends('12')
      .subscribe((data: any) => {
        this.alert_trend = data;
        //console.log(this.alert_trend);
      });

  
  
    this.svcWidgets = [
  {
    data: {
      labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      datasets: [
        {
          label: 'Svc 1',
          data: [65, 59, 80, 81, 56, 80, 95],
          borderColor: '#555'
        }
      ]
    },
    title: "Service 1",
    latency: "22ms",
    svcload: 95
  },

  {
    data: {
      labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      datasets: [
        {
          label: 'Svc 1',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#555'
        }
      ]
    },
    title: "Service 2",
    latency: "8ms",
    svcload: 40
  },

  {
    data: {
      labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      datasets: [
        {
          label: 'Svc 1',
          data: [25, 30, 10, 45, 18, 65, 80],
          borderColor: '#555'
        }
      ]
    },
    title: "Service 3",
    latency: "28ms",
    svcload: 80
  }
]

//this.svcWidgets[0].push(this.data);

this.sgopt = {
  scales: {
    xAxes: [{ display: false }],
    yAxes: [{
      display: false,
      ticks: {
        beginAtZero: true
      }
    }]
  },
  tooltips: {
    enabled: false
  },
  legend: {
    display: false
  }
}
  }



ngOnInit() {
  this.userService.getUserData().subscribe(res => {
    
          console.log(res.id);
          this.user = res;
          this.userService.setUserName(this.user.name);
         this.tenant_id = this.user.tenantId;
         console.log(this.tenant_id);
         console.log("http://35.196.113.225:5601/app/kibana#/dashboard/416945a0-a2e8-11e7-9c2c-d9d631a7609a?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-24h,mode:quick,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:'xops',disabled:!f,index:'metrics*',key:monitorName.keyword,negate:!t,type:phrase,value:xops),query:(match:(monitorName.keyword:(query:xops,type:phrase)))),('$state':(store:appState),meta:(alias:xops-app,disabled:!t,index:'metrics-*',key:monitorName.keyword,negate:!f,type:phrase,value:xops-app),query:(match:(monitorName.keyword:(query:xops-app,type:phrase)))),('$state':(store:appState),meta:(alias:xops-fb,disabled:!t,index:'metrics-*',key:monitorName.keyword,negate:!f,type:phrase,value:xops-fb),query:(match:(monitorName.keyword:(query:xops-fb,type:phrase))))),options:(darkTheme:!f),panels:!((col:1,id:'51f42150-a2df-11e7-aff1-89e2d800af41',panelIndex:1,row:1,size_x:5,size_y:3,type:visualization),(col:6,id:'1727ce10-a2e3-11e7-a303-3125a8904cb8',panelIndex:2,row:1,size_x:7,size_y:3,type:visualization),(col:1,id:de847db0-a2d8-11e7-a1f4-538c469e6dc7,panelIndex:4,row:7,size_x:12,size_y:4,type:visualization),(col:1,id:'615ff340-a2e8-11e7-8395-035f5eaddf20',panelIndex:5,row:4,size_x:12,size_y:3,type:visualization)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22"+this.tenant_id+"%22')),timeRestore:!t,title:'Newrelic+Dashboard',uiState:(P-1:(spy:(mode:(fill:!f,name:!n)),vis:(defaultColors:('0+-+500':'rgb(0,104,55)','1500+-+10000':'rgb(165,0,38)','500+-+1500':'rgb(255,255,190)'))),P-3:(vis:(defaultColors:('0+-+500':'rgb(0,104,55)','1500+-+10000':'rgb(165,0,38)','500+-+1500':'rgb(255,255,190)'))),P-4:(vis:(legendOpen:!f))),viewMode:view)");
         this.dashboardurl = this.sanitizer.bypassSecurityTrustResourceUrl("http://35.196.113.225:5601/app/kibana#/dashboard/416945a0-a2e8-11e7-9c2c-d9d631a7609a?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-24h,mode:quick,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:'xops',disabled:!f,index:'metrics*',key:monitorName.keyword,negate:!t,type:phrase,value:xops),query:(match:(monitorName.keyword:(query:xops,type:phrase)))),('$state':(store:appState),meta:(alias:xops-app,disabled:!t,index:'metrics-*',key:monitorName.keyword,negate:!f,type:phrase,value:xops-app),query:(match:(monitorName.keyword:(query:xops-app,type:phrase)))),('$state':(store:appState),meta:(alias:xops-fb,disabled:!t,index:'metrics-*',key:monitorName.keyword,negate:!f,type:phrase,value:xops-fb),query:(match:(monitorName.keyword:(query:xops-fb,type:phrase))))),options:(darkTheme:!f),panels:!((col:1,id:'51f42150-a2df-11e7-aff1-89e2d800af41',panelIndex:1,row:1,size_x:5,size_y:3,type:visualization),(col:6,id:'1727ce10-a2e3-11e7-a303-3125a8904cb8',panelIndex:2,row:1,size_x:7,size_y:3,type:visualization),(col:1,id:de847db0-a2d8-11e7-a1f4-538c469e6dc7,panelIndex:4,row:7,size_x:12,size_y:4,type:visualization),(col:1,id:'615ff340-a2e8-11e7-8395-035f5eaddf20',panelIndex:5,row:4,size_x:12,size_y:3,type:visualization)),query:(query_string:(analyze_wildcard:!t,query:'_index:%22"+this.tenant_id+"%22')),timeRestore:!t,title:'Newrelic+Dashboard',uiState:(P-1:(spy:(mode:(fill:!f,name:!n)),vis:(defaultColors:('0+-+500':'rgb(0,104,55)','1500+-+10000':'rgb(165,0,38)','500+-+1500':'rgb(255,255,190)'))),P-3:(vis:(defaultColors:('0+-+500':'rgb(0,104,55)','1500+-+10000':'rgb(165,0,38)','500+-+1500':'rgb(255,255,190)'))),P-4:(vis:(legendOpen:!f))),viewMode:view)");
       
});

}

}
