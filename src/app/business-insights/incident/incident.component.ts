import { Component, OnInit } from '@angular/core';
import { SnowAggsService } from '../../services/snow-aggs.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {

  public snowData;
  private snowErr = false;
  loadingWheel = "<i class='fa fa-spinner fa-pulse fa-fw'></i>";

  duration: SelectItem[];
  selectedDur = 1440;

  constructor(private _snowSvc: SnowAggsService) {
      this.duration = [
        {label:'Daily', value:1440},
        {label:'Weekly', value:10080},
        {label:'Monthly', value:44640}
      ];

      setInterval(() => {
        this.getSnowAggs();
      }, 60000);
  }

  ngOnInit() {
    this.getSnowAggs();
  }

  getSnowAggs() {
    this._snowSvc.getSnowAggs(this.selectedDur).subscribe(
      data => { this.snowData = data},
      err => { this.snowErr = true }
    );
  }

  changeDuration(){
    this.snowData = null;

    this.getSnowAggs();
  }

}
