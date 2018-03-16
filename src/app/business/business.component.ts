import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { PerfIndicatorService } from '../services/perf-indicator.service';
import { CircleProgressComponent } from '../../shared/circle-progress.component';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantService, } from '../services/tenant.service';
import { WidgetStats } from './WidgetStats';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
PerfIndicatorService
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  providers: [AlertService, PerfIndicatorService, ConfirmationService]
})


export class BusinessComponent implements OnInit {
  tenantid = "";
  putTenantSetting = {};
  tenant_items_all: SelectItem[];
  classname = "";
  WidgetStats: WidgetStats[] = [];;
  display = false;
  tenants_items = [];

  user = {
    name: "",
    picture: "",
    tenantId: ""
  };

  selectedItem1 = "";
  selectedItem2 = ""
  selectedItem3 = "";
  health_items = [];
  health_items_top3 = [];

  public alert_trend;
  public data;
  public sgopt;
  public svcWidgets = [];
  public dashboardurl;
  public tenant_id;

  constructor(private userService: UserService, private tenantService: TenantService, private confirmationService: ConfirmationService, private perfIndicatorsService: PerfIndicatorService, private alertsService: AlertService, private sanitizer: DomSanitizer) {

    this.alertsService.getAlertTrends('12')
      .subscribe((data: any) => {
        this.alert_trend = data;
        //console.log(this.alert_trend);
      });

    this.sgopt = {
      scales: {
        xAxes: [{ display: false }],
        yAxes: [{
          display: false,
          ticks: {
            beginAtZero: true
          }
        }]
      },
      tooltips: {
        enabled: false
      },
      legend: {
        display: false
      }
    }
  }
  confirm() {
    this.display = true;
  }

  onSubmit() {
    this.putTenantSetting = {

      "healthitems": [this.selectedItem1, this.selectedItem2, this.selectedItem3],
    }
    console.log(this.putTenantSetting)
    this.tenantService.updateTenant(this.tenantid, this.putTenantSetting).subscribe(res => { },
      err => { console.log(err); });

  }

  ngOnInit() {

    this.userService.getUserData().subscribe(res0 => {
      var email = res0.message[0].id;

      this.tenantService.getTenantDetails(email).subscribe(res => {
        this.tenantid = res.result.tenant.id;

        for (var item in res.result.tenant.healthitems) {
          this.health_items_top3.push(res.result.tenant.healthitems[item]);
        }
        console.log("asdasdassdad" + this.health_items_top3)
      });
    });
    this.perfIndicatorsService.getHealth()
      .subscribe(res => {
        for (var array_top3 of this.health_items_top3) {
 
          
          for (var array of res["metrics"]) {
            console.log(array.id)
            console.log(array_top3)
            if ( array.id == array_top3) {
              this.svcWidgets.push(array);
           
          }
        }
      }

        for (var title of this.svcWidgets) {
          var classv = "c100 p100 " + title.status
          this.WidgetStats.push({
            "name": title.id,
            "class_name": classv,
            "color": title.status,
            "health_value": title.health_value
          });

        }
      });
    this.classname = "c100 p95 green big";

    this.tenant_items_all = [];
    this.tenant_items_all.push({ label: "Select Item", value: "Select_Item" });
    this.perfIndicatorsService.getHealth()
      .subscribe(res => {

        for (var arr of res["metrics"]) {
          this.tenant_items_all.push({ label: arr.id, value:arr.id });

        }
      }
      );
  }

}
