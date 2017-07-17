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
  providers: [RssfeedService, ProgrammeService, SnowAggsService]
})
export class WidgetHomeComponent implements OnInit {

  public snowData;
  open_p1: number[] = [];
  open_tickets: number[] = [];
  closed_tickets: number[] = [];
  about_to_miss_sla: number[] = [];
  missed_sla: number[] = [];

  sn_stats_labels: string[] = [];
  
  public snowStats = {
    open_p1_tickets: [
      {
        data: this.open_p1
      }
    ],
    open_tickets: [
      {
        data: this.open_tickets
      }
    ],
    closed_tickets: [
      {
        data: this.closed_tickets
      }
    ],
    about_to_miss_sla: [
      {
        data: this.about_to_miss_sla
      }
    ],
    missed_sla: [
      {
        data: this.missed_sla
      }
    ]
  };

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

  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  constructor(private _snowSvc: SnowAggsService, private rssfeed: RssfeedService, private programalerts: ProgrammeService) {
    this.duration = [
      { label: 'Daily', value: 1440 },
      { label: 'Weekly', value: 10080 },
      { label: 'Monthly', value: 44640 }
    ];
    setInterval(() => {
      this.getSnowAggs();
      this.getSnowStats();
    }, 60000);
  }

  scrollopts: ISlimScrollOptions;

  ngOnInit() {
    this.getSnowStats();

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

  getSnowStats() {
    this._snowSvc.getSnowStats(this.selectedDur)
      .subscribe(res => {
        this.open_p1.push(...res.data.open_p1);
        this.open_tickets.push(...res.data.open);
        this.closed_tickets.push(...res.data.closed);
        this.about_to_miss_sla.push(...res.data.about_to_miss_sla);
        this.missed_sla.push(...res.data.missed_sla);
        this.updateChartLabels();
      });
  }

  updateChartLabels() {
    this.sn_stats_labels = [...this.sn_stats_labels];
    var daily_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var weekly_labels = ['Week 01', 'Week 02', 'Week 03', 'Week 04'];
    var monthly_labels = ['January', 'February', 'March', 'April', 'May', 
                          'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (this.selectedDur == 44640) {
      // monthly
      this.sn_stats_labels = [...monthly_labels];
    } else if (this.selectedDur == 10080) {
      // weekly
      this.sn_stats_labels = [...weekly_labels];
    } else if (this.selectedDur == 1440) {
      // daily
      this.sn_stats_labels = [...daily_labels];
    }
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
    this.getSnowStats();
  }

}
