import { Component, OnInit } from '@angular/core';
import { indicaters } from '../status/indicaters';
import { DataGridModule } from 'primeng/primeng';
import { items } from '../status/items';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  metric: any;
  items: any;
  status: string;
  selectedItem: items;
  itemtitle: string;
  indicater: indicaters[];


  selectedindicaters: indicaters;

  constructor() { }

  ngOnInit() {

    this.metric =
      [
        {
          "_index": "item_status_tenant_a",
          "_type": "metrics",
          "_id": "AV4K9oTKzonvsBDZ_5jx",
          "_score": 1,
          "_source": {
            "result": [
              {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
              {
                "id": "xCompany",
                "status": "amber",
                "perfIndicators": [
                  {
                    "id": "xNews",
                    "status": "red"
                  },
                  {
                    "id": "xFinance",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              },
                {
                "id": "xFinance",
                "status": "red",
                "perfIndicators": [
                  {
                    "id": "cpu:10.90.123.2",
                    "status": "red"
                  },
                  {
                    "id": "freeMemory:10.90.123.12",
                    "status": "green"
                  }
                ]
              }
            ]
          }
        }
      ];
    this.items = this.metric[0]["_source"]["result"];
  }

  show(event) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == event) {
        this.indicater = this.metric[0]["_source"]["result"][i].perfIndicators;
        this.itemtitle = event;
      }
    }
  }

}
