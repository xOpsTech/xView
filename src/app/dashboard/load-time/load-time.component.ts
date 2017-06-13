import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-load-time',
  templateUrl: './load-time.component.html',
  styleUrls: ['./load-time.component.scss'],
  providers: [DashboardService]
})
export class LoadTimeComponent implements OnInit {
  timestamps: number[] = [];
  loadTimes: number[] = [];
  speedIndexes: number[] = [];

  constructor(private dashboardService: DashboardService) { }

  getLoadTimes() {
    this.dashboardService.getLoadTimes()
      .subscribe(res => {
        for (let test_result of res) {
          this.timestamps.push(test_result._source.date);
          this.loadTimes.push(test_result._source.loadTime);
          this.speedIndexes.push(test_result._source.SpeedIndex);
        }

        this.lineChartLabels = this.timestamps;
      });
  }

  extractField(field:string) {
    let extract = []
  }

  public lineChartData: Array<any> = [
    { data: this.loadTimes, label: 'LoadTime' },
    { data: this.speedIndexes, label: 'SpeedIndex' },
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Load Time & Speed Index',
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

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(76,51,34,0.5)',
      borderColor: 'rgba(217,95,14,1)',
      pointBackgroundColor: 'rgba(217,95,14,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(138,103,60,0.5)',
      borderColor: 'rgba(248,209,136,1)',
      pointBackgroundColor: 'rgba(248,209,136,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      backgroundColor: 'rgba(110,76,40,0.5)',
      borderColor: 'rgba(247,176,45,1)',
      pointBackgroundColor: 'rgba(247,176,45,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  ngOnInit() {
    this.getLoadTimes();
  }

}
