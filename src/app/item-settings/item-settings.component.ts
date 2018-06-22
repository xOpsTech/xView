import { Component, OnInit } from '@angular/core';
import { PerfIndicator } from './PerfIndicator'
import { Items } from './Items'
import { PerfIndicatorService } from '../services/perf-indicator.service';
import { ItemService } from '../services/item.service';
import { SelectItem } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
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
  selectedperfs: PerfIndicator[];
  selecteditems: Items[];
  items: Items[] = [];
  typevalue: SelectItem[];
  selected_item = [];
  selectedtype = 'item';
  payload: any;
  val1:any;
  payload2: any;
  isBoolean : boolean = false;;


  saveItem() {

    console.log(JSON.stringify("selected pref = " + JSON.stringify(this.selectedperfs)));
    console.log(JSON.stringify("selected items = " +  JSON.stringify(this.selecteditems)));

    console.log("type is " + this.selectedtype);
    if (this.selectedtype == "pindicator") {

      this.payload = {
        "id": this.item_name,
        "perfIndicators": this.selectedperfs
      }
      console.log(JSON.stringify(this.payload));

      console.log("went inside pindicator" + this.payload);
      this.itemsService.saveItem(this.payload)
        .subscribe(response => {
          window.location.reload();
        })
    }


    if (this.selectedtype == "item") {

      this.isBoolean = this.selecteditems[0]["isBoolean"];
      delete this.selecteditems[0].isBoolean;
      console.log(JSON.stringify(this.selecteditems));
      this.payload2 = {
        "id": this.item_name,
        "perfIndicators": this.selecteditems,
        "isBoolean": this.isBoolean
      }

      console.log(JSON.stringify(this.payload2));
      console.log(this.isBoolean); 
      this.itemsService.saveItem(this.payload2)
        .subscribe(response => {
     // window.location.reload();
        })
    }

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

        console.log(res.result)
        // var perfIndicatorNames: any[] = res;
        this.perfIndicators = [];

        for (var i = 0; i < res.result["perf"].length; i++) {
          this.perfIndicators.push(
            {
              "id": res.result["perf"][i],

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



        for (var i = 0; i < res.result["items"].length; i++) {
          this.items.push(
            {
              "id": res.result["items"][i],

              "isBoolean":false,

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
