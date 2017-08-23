import { Component, OnInit } from '@angular/core';
import { PerfIndicator } from './PerfIndicator'
import { PerfIndicatorService } from '../services/perf-indicator.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-settings',
  templateUrl: './item-settings.component.html',
  styleUrls: ['./item-settings.component.scss'],
  providers: [PerfIndicatorService, ItemService]
})
export class ItemSettingsComponent implements OnInit {

  threshold_red: number;
  threshold_amber: number;
  item_name: string;
  perfIndicators: PerfIndicator[] = [];

  // perfIndicators: PerfIndicator[] = [
  //   {
  //     "id": "cpu:10.90.123.2",
  //     "thresholdRed": 80,
  //     "thresholdAmber": 70,
  //     "importance": 9
  //   },
  //   {
  //     "id": "cpu:10.90.123.25",
  //     "thresholdRed": 70,
  //     "thresholdAmber": 60,
  //     "importance": 1
  //   }
  // ];

  saveItem() {

    var payload = {
      "id": this.item_name,
      "thresholdRed": this.threshold_red,
      "thresholdAmber": this.threshold_amber,
      "perfIndicators": this.perfIndicators
    }

    console.log(payload);

    this.itemsService.saveItem(payload)
    .subscribe(response => {
      console.log(response);
    })
  }

  constructor(private perfIndicatorsService: PerfIndicatorService, private itemsService: ItemService) { }

  loadPerfIndicators() {
    this.perfIndicatorsService.getPerfIndicators()
      .subscribe(res => {
        // var perfIndicatorNames: any[] = res;

        for (var i = 0; i < res.result.length; i++) {
          this.perfIndicators.push(
            {
              "id": res.result[i],
              "thresholdRed": 0,
              "thresholdAmber": 0,
              "importance": 0
            }
          );
        }
        this.perfIndicators = [...this.perfIndicators];
      })
  }

  ngOnInit() {
    this.loadPerfIndicators();
  }

}
