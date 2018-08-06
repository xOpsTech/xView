import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

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


  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // events
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }


  ngOnInit() {
    this.getLoadTimes();
  }

}
