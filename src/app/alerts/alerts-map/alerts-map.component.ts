import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts-map',
  templateUrl: './alerts-map.component.html',
  styleUrls: ['./alerts-map.component.css']
})
export class AlertsMapComponent implements OnInit {

  constructor() { }

  SUM: number[] = [2, 5, 8, 1, 7, 4, 2];
  IPM: number[] = [1, 4, 3, 2, 1, 5, 1];
  RUM: number[] = [3, 1, 3, 5, 8, 3, 1];

  public lineChartData: Array<any> = [
    { data: this.SUM, label: 'SUM' },
    { data: this.IPM, label: 'IPM' },
    { data: this.RUM, label: 'RUM' }
  ];
  public lineChartLabels: Array<any> = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Alert Domains',
      fontColor: '#FEC44F',
      fontSize: 32
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
      backgroundColor: 'rgba(54,59,51,0.5)',
      borderColor: 'rgba(178,234,148,1)',
      pointBackgroundColor: 'rgba(217,95,14,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  ngOnInit() {
  }

}
