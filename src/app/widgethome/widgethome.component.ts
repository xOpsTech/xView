import { Component, OnInit } from '@angular/core';
import { ISlimScrollOptions } from 'ng2-slimscroll';
import { SelectItem } from 'primeng/primeng'
import { SnowAggsService } from '../services/snow-aggs.service';
import { RssfeedService } from '../services/rssfeed.service';
import { ProgrammeService } from '../services/programme.service';

@Component({
  selector: 'app-widgethome',
  templateUrl: './widgethome.component.html',
  styleUrls: ['./widgethome.component.scss'],
  providers: [RssfeedService, ProgrammeService]
})
export class WidgetHomeComponent implements OnInit {

  public snowData;
  private snowErr = false;
  duration: SelectItem[];
  selectedDur = 44640;
  rssAlerts1 = [];
  programAlerts1 = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales:
    {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  };

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012',
    '2013', '2014', '2015', '2016'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public barChartData: any[] = [
    { 
      data: [65, 59, 80, 81, 56, 55, 70, 65, 59, 80, 81, 56], 
      label: 'Series A' 
    }
  ];

  constructor(private _snowSvc: SnowAggsService, private rssfeed: RssfeedService, private programalerts: ProgrammeService) {
    this.duration = [
      { label: 'Daily', value: 1440 },
      { label: 'Weekly', value: 10080 },
      { label: 'Monthly', value: 44640 }
    ];
    setInterval(() => {
      this.getSnowAggs();
    }, 60000);
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


      for (var dv of rssAlerts2.data.services) {
        if (dv.status == "good")
          this.rssAlerts1.push({ 'service': dv.service, 'colr': 'green' })
        if (dv.status == "critical")
          this.rssAlerts1.push({ 'service': dv.service, 'colr': 'red' })
        if (dv.status == "warning")
          this.rssAlerts1.push({ 'service': dv.service, 'colr': 'amber' })
      }

    });

    this.programalerts.getProgrammes().subscribe(programAlerts => {

      for (var dv2 of programAlerts.data) {
        this.programAlerts1.push({ 'name': dv2.program, 'status': dv2.status })
      }

    });
  }


  getSnowAggs() {
    this._snowSvc.getSnowAggs(this.selectedDur).subscribe(
      data => { this.snowData = data },
      err => { this.snowErr = true }
    );
  }

  changeDuration() {
    this.snowData = {
      "data": [
        { "aggs_by_active": { "closed": "<i class='fa fa-spinner fa-pulse fa-fw'></i>", "open": "<i class='fa fa-spinner fa-pulse fa-fw'></i>", "total": "<i class='fa fa-spinner fa-pulse fa-fw'></i>" } },
        { "aggs_by_priority": {} },
        { "p1_incidents": [], "total": "<i class='fa fa-spinner fa-pulse fa-fw'></i>" },
        { "sla_stats": { "missedSlaCount": "<i class='fa fa-spinner fa-pulse fa-fw'></i>", "aboutToMissSlaCount": "<i class='fa fa-spinner fa-pulse fa-fw'></i>" } }

      ]
    };

    this.getSnowAggs();
  }

}
