import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-ttfb-loadtime',
  templateUrl: './ttfb-loadtime.component.html',
  styleUrls: ['./ttfb-loadtime.component.scss'],
  providers: [DashboardService]
})
export class TtfbLoadtimeComponent implements OnInit {
  timestamps: number[] = [];
  ttfb: number[] = [];
  loadTimes: number[] = [];

  constructor(private dashboardService: DashboardService) { }

  getTestResults() {
    this.dashboardService.getLoadTimes()
      .subscribe(res => {
        for (let test_result of res) {
          this.timestamps.push(test_result._source.date);
          this.loadTimes.push(test_result._source.loadTime);
          this.ttfb.push(test_result._source.TTFB);
        }

        this.barChartLabels = this.timestamps;
      });
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'TTFB & LoadTime',
      fontSize: 24
    },
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: false,
        }
      }],
    }
  };
  public barChartLabels:number[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: this.ttfb, label: 'TTFB'},
    {data: this.loadTimes, label: 'LoadTime'}
  ];



  ngOnInit() {
    this.getTestResults();
  }

}
