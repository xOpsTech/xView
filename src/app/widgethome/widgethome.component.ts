import { Component, OnInit } from '@angular/core';
import { ISlimScrollOptions } from 'ng2-slimscroll';
import { SelectItem } from 'primeng/primeng'
import { SnowAggsService } from '../services/snow-aggs.service';
import { RssfeedService } from '../rssfeed.service';


@Component({
  selector: 'app-widgethome',
  templateUrl: './widgethome.component.html',
  styleUrls: ['./widgethome.component.scss'],
  providers :[RssfeedService]
})
export class WidgetHomeComponent implements OnInit {

  public snowData;
  private snowErr = false;
  duration: SelectItem[];
  selectedDur = 5000000;
  rssAlerts1 = [];
  constructor(private _snowSvc: SnowAggsService,private rssfeed: RssfeedService) {
    this.duration = [
      {label:'Daily', value:250},
      {label:'Weekly', value:500},
      {label:'Monthly', value:5000000}
    ];

    setInterval(() => {
      this.getSnowAggs();
    }, 10000);
  }

  scrollopts: ISlimScrollOptions;

  ngOnInit() {
    this.scrollopts = {
      position: 'right',
      barBackground: '#888',
      barWidth: '3',
      gridWidth: '3',
      gridMargin: '0px',
      gridBackground: '#ddd'
    }

    this.getSnowAggs();

 this.rssfeed.getRssFeed().subscribe(rssAlerts2 => {
    

        for(var dv of rssAlerts2.data.services)
        {  
          if(dv.status=="good")
            this.rssAlerts1.push({'service':dv.service,'colr':'green'})
          if(dv.status=="critical")
            this.rssAlerts1.push({'service':dv.service,'colr':'red'})
             if(dv.status=="warning")
            this.rssAlerts1.push({'service':dv.service,'colr':'amber'})
        }
      console.log( this.rssAlerts1)
});
  }

  programAlerts = [
    {name:'Program 1',status:'green'},
    {name:'Program 2',status:'red'},
    {name:'Program 3',status:'red'},
    {name:'Program 4',status:'green'},
    {name:'Program 5',status:'amber'},
    {name:'Program 6',status:'green'},
    {name:'Program 7',status:'green'},
    {name:'Program 8',status:'green'},
    {name:'Program 9',status:'green'},
    {name:'Program 10',status:'green'},
    {name:'Program 11',status:'green'},
    {name:'Program 12',status:'green'},
    {name:'Program 13',status:'green'},
    {name:'Program 14',status:'green'},
    {name:'Program 15',status:'amber'},
    {name:'Program 16',status:'amber'},
    {name:'Program 17',status:'red'},
    {name:'Program 18',status:'green'}
  ];

  // rssAlerts = [
  //   {name:'Third Party Provider 1',status:'green'},
  //   {name:'Third Party Provider 2',status:'red'},
  //   {name:'Third Party Provider 3',status:'red'},
  //   {name:'Third Party Provider 4',status:'green'},
  //   {name:'Third Party Provider 5',status:'amber'},
  //   {name:'Third Party Provider 6',status:'green'},
  //   {name:'Third Party Provider 7',status:'green'}
  // ];

  // SNowDashboard
  getSnowAggs() {
    this._snowSvc.getSnowAggs(this.selectedDur).subscribe(
      data => { this.snowData = data},
      err => { this.snowErr = true }
    );
  }

  changeDuration(){
    this.snowData = {
    "data": [
        {"aggs_by_active": { "closed": "<i class='fa fa-spinner fa-pulse fa-fw'></i>", "open": "<i class='fa fa-spinner fa-pulse fa-fw'></i>", "total": "<i class='fa fa-spinner fa-pulse fa-fw'></i>"}},
        {"aggs_by_priority": {}},
        {"p1_incidents": [],"total": "<i class='fa fa-spinner fa-pulse fa-fw'></i>"}
    ]};

    this.getSnowAggs();
  }

}
