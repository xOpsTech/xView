import { Component, OnInit } from '@angular/core';
import { PerfIndicator } from './PerfIndicator'
import { Items } from './Items'
import { PerfIndicatorService } from '../services/perf-indicator.service';
import { ItemService } from '../services/item.service';
import { SelectItem } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { UserDetails } from '../models/userDetails';

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
  items1: Items[] = [];
  items2: Items[] = [];
  typevalue: SelectItem[];
  selected_item = [];
  selectedtype = 'item';
  payload: any;
  val1: any;
  payload2: any;
  isBoolean: boolean = false;;
  showSubmit = false;

  userDetails: UserDetails = {
    id: "",
    tenantId: ""
  }

  tenantId: String;

  postItem(perfind) {

    this.tenantId = this.userDetails.tenantId;

    this.itemsService.getItem(this.tenantId,perfind)
    .subscribe(res => {
  

      var itemJson = {
        "id": perfind.id,
        "importance":perfind.impt,
        "isBoolean":perfind.isBoolean,
        "perfIndicators":res.perfIndicators
      }
      console.log(itemJson)
      this.itemsService.updateItem(this.tenantId,itemJson)
      .subscribe(response => {

        console.log(response)
      })
  })
      
    }


  saveItem() {
    this.tenantId = this.userDetails.tenantId;
    if (this.selectedtype == "pindicator") {

      this.payload = {
        "id": this.item_name,
        "perfIndicators": this.selectedperfs
      }
      this.itemsService.saveItem(this.tenantId, this.payload)
        .subscribe(response => {
        })
    }


    if (this.selectedtype == "item") {
      this.payload2 = {
        "id": this.item_name,
        "perfIndicators": this.selecteditems,
      }
  
      this.itemsService.saveItem(this.tenantId, this.payload2)
        .subscribe(response => {
        })
    }

  }


  constructor(private perfIndicatorsService: PerfIndicatorService, private itemsService: ItemService) {

    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    this.typevalue = [
      { label: '--Select Type--', value: null },
      { label: 'Item', value: 'item' },
      { label: 'Performance Indicator', value: 'pindicator' },
    ];
  }


  loadPerfIndicators() {


    this.tenantId = this.userDetails.tenantId;
    this.perfIndicators = [];
    this.perfIndicatorsService.getPerfIndicators(this.tenantId)
      .subscribe(res => {

        for (var i = 0; i < res.result["perfs"].length; i++) {
          this.perfIndicators.push(
            {
              "id": res.result["perfs"][i],

              "thresholdGreen": 0,
              "thresholdBlue": 0,
              "thresholdYellow": 0,
              "thresholdOrange": 0,
              "thresholdRed": 0,
              "importance": 0
            }
          );
        }
    
      });
    console.log("2" + this.perfIndicators)
    this.itemsService.getItems(this.tenantId)
      .subscribe(res => {
        for (var i = 0; i < res.result["items"].length; i++) {
          this.perfIndicators.push(
            {
              "id": res.result["items"][i].id,

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
      
      });
    this.itemsService.getItems(this.tenantId)
      .subscribe(res => {
        for (var i = 0; i < res.result["items"].length; i++) {

          this.items1.push(
            {
              "id": res.result["items"][i].id,
              "importance": 0
            }
          );
          this.items1 = [...this.items1];

          this.items2.push(
            {
              "id": res.result["items"][i].id,
              "importance": res.result["items"][i].importance
            }
          );


        }
        this.items2 = [...this.items2];
        console.log(" this.items2"+ this.items2)
      })
  }


  ngOnInit() {
    this.loadPerfIndicators();
  }

}
