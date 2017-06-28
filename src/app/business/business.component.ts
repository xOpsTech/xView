import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { CircleProgressComponent } from '../../shared/circle-progress.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  providers: [AlertService]
})
export class BusinessComponent implements OnInit {

  public alert_trend;

  constructor(private alertsService: AlertService) {

    this.alertsService.getAlertTrends('12')
    .subscribe((data: any) => {
      this.alert_trend = data;
      //console.log(this.alert_trend);
    });

  }

  ngOnInit() {
  }

}
