import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-ttfb-loadtime',
  templateUrl: './ttfb-loadtime.component.html',
  styleUrls: ['./ttfb-loadtime.component.css'],
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
      fontColor: '#FEC44F',
      fontSize: 24
    },
    legend: {
      display: true,
      labels: {
        fontColor: '#FEC44F'
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: "#F8F8DD", // this here
        },
      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: "#F8F8DD"
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

  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(182,144,218, 0.4)',
      borderColor: 'rgba(54,50,58, 0.8)',
    },
    {
      backgroundColor: 'rgba(231,59,59,0.4)',
      borderColor: 'rgba(248,209,136,1)',
    }
  ];


  ngOnInit() {
    this.getTestResults();
  }

}
