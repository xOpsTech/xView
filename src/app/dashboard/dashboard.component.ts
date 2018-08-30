import { OnInit } from '@angular/core';
import { PersonalizationService } from '../services/personalization.service';
import { UserService } from '../services/user.service';
import { ChartSourceService } from '../services/chartsources.service';
import { Message } from 'primeng/primeng';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { UserDetails } from '../models/userDetails';
import { TenantDetails } from '../models/tenantDetails';

import {
  Component,
  ElementRef,
  TemplateRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { HighchartService } from './highchart.service';

import * as Highcharts from 'highcharts';
import * as $ from 'jquery';
import 'jqueryui';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [PersonalizationService, UserService, HighchartService, ChartSourceService]
})

export class DashboardComponent implements AfterViewInit, OnDestroy, OnInit {
  display: boolean = false;
  personalization = <any>{};
  selectedItems: string[] = [];
  msgs: Message[] = [];
  widgets: any[];
  classvalue = true;
  userDetails: UserDetails = {
    id: "",
    tenantId: ""
  }

  dataSourceDropDown: SelectItem[] = [];
  xAxisDropDown: SelectItem[] = [];
  yAxisDropDown: SelectItem[] = [];
  dashboardTypesDropdown: SelectItem[] = [];

  myCustomOptions: object;
  DataSourceNames = [];
  Datavalues = [];
  xAxis: string;
  stylevalue = true;
  xax = [];
  yax = [];
  dname = "";
  dtype = ""
  dataArea = "";
  yaxisname = "";
  displayxy = false;
  myHtml=""
  @ViewChild('charts') public chartEl: ElementRef;

  chartsList;

  chartPostJson = {

    tenant: "",
    chartType: "",
    chartTitle: "",
    xAxis: [],
    yAxisName: "",
    xAxisName: "",
    series: Object,
  }


  constructor(private hcs: HighchartService, private changeDetectionRef: ChangeDetectorRef, private chartSourcesService: ChartSourceService) {
  }



  newChartFormSubmit(settingForm: NgForm) {
    console.log(settingForm.value)
    this.xax = settingForm.value.xaxis;
    this.yax = settingForm.value.yaxis;
    this.dname = settingForm.value.dname;
    this.dtype = settingForm.value.dashboardtype;
    this.yaxisname = settingForm.value.yaxisname;

    console.log("this.xax :" + this.xax)
    console.log("this.xax :" + this.yax)

    this.myCustomOptions = {
      chart: {
        type: this.dtype
      },
      title: {
        text: this.dname
      },
      xAxis: {
        categories: this.xax
      },
      yAxis: {
        min: 0,
        title: {
          text: this.yaxisname
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [],

      exporting: {
        buttons: {
          customButton: {
            text: 'Custom Button',
            onclick: function () {
              alert('You pressed the button!');
            }
          },
          anotherButton: {
            text: 'Another Button',
            onclick: function () {
              alert('You pressed another button!');
            }
          }
        }
      }


    };

    for (var series in settingForm.value.yaxis) {
      this.myCustomOptions["series"].push({ name: series, data: settingForm.value.yaxis[series] })
    }

    this.addCharttoDb(this.myCustomOptions);


    this.hcs.createChart(this.chartEl.nativeElement, this.myCustomOptions);
    this.display = false
  }


  addCharttoDb(myCustomOptions) {

    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    this.chartPostJson.tenant = this.userDetails.tenantId.toString();
    this.chartPostJson.chartType = myCustomOptions.chart.type;
    this.chartPostJson.chartTitle = myCustomOptions.title.text;
    this.chartPostJson.xAxis = myCustomOptions.xAxis.categories;
    this.chartPostJson.yAxisName = myCustomOptions.yAxis.title.text;
    this.chartPostJson.series = myCustomOptions.series;
    console.log(this.chartPostJson);

    this.chartSourcesService.postChartDetails(this.chartPostJson).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })

  }

  dissapear(event) {
    if (this.classvalue) {
      this.classvalue = false;
    }
    else {
      this.classvalue = true;
    }
  }

  showDialog() {
    this.display = true;
  }

  public ngAfterViewInit() {
  }

  public ngOnDestroy() {
  }

  ngOnInit() {


    this.myHtml = '<div class="box box-primary">' +
      '<div class="box-header with-border">' +
      '<div class="box-tools pull-right">' +
      '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>  </button>' +
      '<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>' +
      '</div> </div></div>'


    this.stylevalue = true;

    var barandcolumn = {
      chart: {
        type: ""
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: ""
      },
      yAxis: {
        min: 0,
        title: {
          text: ""
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [],


    }

    this.dashboardTypesDropdown =
      [
        { label: 'Bar', value: 'bar' },
        { label: 'Column', value: 'column' },
        { label: 'Pie', value: 'Pie' }

      ]
    this.dataSourceDropDown.push({ label: 'Select Value', value: null });

    this.chartSourcesService.getServerDetails().subscribe(res => {

      for (var names in res.DataSources) {
        this.dataSourceDropDown.push({ label: names, value: names })

      }


    });

    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    console.log(this.userDetails.tenantId)
    this.chartSourcesService.getChartDetails(this.userDetails.tenantId).subscribe(chartDetails => {
      console.log(chartDetails);




      for (var v in chartDetails) {

        barandcolumn.chart.type = chartDetails[v].chartType;
        barandcolumn.title.text = chartDetails[v].chartTitle;
        barandcolumn.xAxis.categories = chartDetails[v].xAxis;
        barandcolumn.yAxis.title.text = chartDetails[v].yAxisName;
        barandcolumn.series = chartDetails[v].series;

        this.hcs.createChart(this.chartEl.nativeElement, barandcolumn);
      }
      //this.hcs.createChart(this.chartEl.nativeElement, this.myCustomOptions);
    }, err => {
      console.log(err)
    })



  }

  onDataSourceSelect(selectedVal) {
    console.log(selectedVal);
    this.xAxisDropDown = [];
    this.yAxisDropDown = [];

    this.displayxy = true;
    this.xAxisDropDown.push({ label: 'Select Value', value: null });
    this.yAxisDropDown.push({ label: 'Select Value', value: null });

    this.chartSourcesService.getServerDetails().subscribe(res => {
      this.dataArea = JSON.stringify(res.DataSources[selectedVal], undefined, 4)
      for (var names in res.DataSources[selectedVal]) {

        console.log(typeof res.DataSources[selectedVal][names])
        this.xAxisDropDown.push({ label: names, value: res.DataSources[selectedVal][names] })
        this.yAxisDropDown.push({ label: names, value: res.DataSources[selectedVal][names] })
        console.log(res.DataSources[selectedVal][names])
      }
    });


  }



  rmFirst() {
    this.hcs.removeFirst();
    this.changeDetectionRef.detectChanges();
    // if (!!document.getElementById("test").firstChild) document.getElementById("test").firstChild.outerHTML = '';
    // console.log('rm first', this.hcs.getCharts());
  }

  rmLast() {
    this.hcs.removeLast();
    this.changeDetectionRef.detectChanges();
    // if (!!document.getElementById("test").lastChild) document.getElementById("test").lastChild.outerHTML = '';
    // console.log('rm last', this.hcs.getCharts());
  }

  createChart() {
    this.hcs.createChart(this.chartEl.nativeElement);
  }

  createCustomChart() {

  }





}
