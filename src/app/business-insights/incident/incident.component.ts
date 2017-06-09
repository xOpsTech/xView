import { Component, OnInit } from '@angular/core';
import { SnowAggsService } from '../../services/snow-aggs.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  public snowData;
  private snowErr = false;

  duration: SelectItem[];
  selectedDur = 5000000;

  constructor(private _snowSvc: SnowAggsService) {
      this.duration = [
        {label:'Daily', value:250},
        {label:'Weekly', value:500},
        {label:'Monthly', value:5000000}
      ];
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

}
