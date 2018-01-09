import { Component, OnInit } from '@angular/core';
import { PerfIndicator } from './PerfIndicator'
import { Item } from './Items'
import { PerfIndicatorService } from '../services/perf-indicator.service';
import { ItemService } from '../services/item.service';
import { SelectItem } from 'primeng/primeng';
@Component({
  selector: 'app-item-settings',
  templateUrl: './item-settings.component.html',
  styleUrls: ['./item-settings.component.scss'],
  providers: [PerfIndicatorService, ItemService]
})
export class ItemSettingsComponent implements OnInit {

  threshold_green: number = 0;
  threshold_blue: number = 0;
  threshold_yellow: number = 0;
  threshold_orange: number = 0;
  threshold_red: number = 0;
  importance: number = 0;

  item_name: string;
  perfIndicators: PerfIndicator[] = [];
  items: Item[] = [];
  typevalue: SelectItem[];
  selectedtype = 'item';

  payload: any;

  saveItem() {

      // this.payload = {
      //   "id": this.item_name,
      //   "thresholdGreen": this.threshold_green,
      //   "thresholdBlue": this.threshold_blue,
      //   "thresholdYellow": this.threshold_yellow,
      //   "thresholdOrange": this.threshold_orange,
      //   "thresholdRed": this.threshold_red,
      //   "importance": this.importance
      // }

      console.log(this.perfIndicators);


    // this.itemsService.saveItem(this.payload)
    //   .subscribe(response => {
    //     this.clearForm();
    //     this.loadPerfIndicators();
    //   })
  }

  clearForm() {
    this.threshold_red = 20;
    this.item_name = '';
  }

  constructor(private perfIndicatorsService: PerfIndicatorService, private itemsService: ItemService) {
    this.typevalue = [
      { label: '--Select Type--', value: null },
      { label: 'Item', value: 'item' },
      { label: 'Performance Indicator', value: 'pindicator' },
    ];
  }

  loadPerfIndicators() {
    this.perfIndicatorsService.getPerfIndicators()
      .subscribe(res => {
        console.log(res.perf)
        // var perfIndicatorNames: any[] = res;
        this.perfIndicators = [];

        for (var i = 0; i < res.perf.length; i++) {
          this.perfIndicators.push(
            {
              "id": res.perf[i],
              "thresholdGreen": 0,
              "thresholdBlue": 0,
              "thresholdYellow": 0,
              "thresholdOrange": 0,
              "thresholdRed": 0,
              "importance": 0
            }
          );
        }
        this.perfIndicators = [...this.perfIndicators];


        for (var i = 0; i < res.items.length; i++) {
          this.items.push(
            {
              "id": res.items[i],
              "importance": 0
            }
          );
        }
        this.items = [...this.items];
      })
  }


  ngOnInit() {
    this.loadPerfIndicators();
  }

}
