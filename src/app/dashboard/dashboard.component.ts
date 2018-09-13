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
import { ConfirmDialogModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

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
  providers: [PersonalizationService, UserService, HighchartService, ChartSourceService, ConfirmationService]
})

export class DashboardComponent implements AfterViewInit, OnDestroy, OnInit {
  display: boolean = false;
  display2: boolean = false;
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
  itemsDropdown: SelectItem[] = [];
  metricsDropdown: SelectItem[] = [];
  xAxisDropDown: SelectItem[] = [];
  yAxisDropDown: SelectItem[] = [];
  dashboardTypesDropdown: SelectItem[] = [];
  updataSourceDropDown: SelectItem[] = [];
  upashboardTypesDropdown: SelectItem[] = [];
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

  dataSource = ""
  itemName = ""
  metricName = ""

  displayxy = false;
  myHtml = ""

  @ViewChild('charts') public chartEl: ElementRef;

  chartsList;

  chartPostJson = {
    chid: "",
    tenant: "",
    chartTitle: "",
    chartType: "",
    datasource: "",
    item: "",
    metric: "",
    yAxisName: "",
    xAxis: [],
    series: [],
  }

  //Update variables
  dashboardId = ""
  upDashboardName = ""
  upDashboardType = ""
  updataSource = ""
  upyAxisName = ""
  upyAxis = ""
  upxAxisName = ""
  upxAxis = ""
  piechart = {}

  constructor(private confirmationService: ConfirmationService, private hcs: HighchartService, private changeDetectionRef: ChangeDetectorRef, private chartSourcesService: ChartSourceService, private cdRef: ChangeDetectorRef, private elref: ElementRef) {
    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }
  }

  newChartFormSubmit(settingForm: NgForm) {

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

    };

    this.piechart = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in January, 2018'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'dne03prod1',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'dne03prod2',
          y: 11.84
        }, {
          name: 'dne03prod3',
          y: 10.85
        }, {
          name: 'dne03prod4',
          y: 4.67
        }, {
          name: 'dne03prod5',
          y: 4.18
        }, {
          name: 'dne03prod6',
          y: 1.64
        }
          , {
          name: 'Other',
          y: 2.61
        }]
      }]
    };


    if (this.dtype != 'Pie') {
      for (var series in settingForm.value.yaxis) {
        this.myCustomOptions["series"].push({ name: series, data: settingForm.value.yaxis[series] })
      }
    }


    var timestamp = Math.floor(Date.now() / 1000);
    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    var tenantid = this.userDetails.tenantId.toString();
    var specialid = tenantid + timestamp;
    console.log(this.dtype)
    if (this.dtype == 'Pie') {
      this.piechart["title"]['text'] = settingForm.value.dname;
      this.hcs.createChart(this.chartEl.nativeElement, specialid, this.piechart);
      this.display = false
    }
    else {


      this.addCharttoDb(this.myCustomOptions, specialid, settingForm.value);

      this.hcs.createChart(this.chartEl.nativeElement, specialid, this.myCustomOptions);
      this.display = false
    }

    console.log(this.hcs.getCharts());

    var elems = document.querySelectorAll(".highcharts-credits");
    Array.prototype.forEach.call(elems, function (node) {
      node.parentNode.removeChild(node);

    });

  }

  updateChartFormSubmit(settingForm: NgForm) {
    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    var tenant = this.userDetails.tenantId.toString();

    var upchartPostJson = {
      chid: "",
      tenant: "",
      chartTitle: "",
      chartType: "",
      datasource: "",
      item: "",
      metric: "",
      yAxisName: "",
      xAxis: [],
      series: [],

    }

    var chid = settingForm.value.dboardid;

    upchartPostJson.chid = settingForm.value.dboardid;
    upchartPostJson.tenant = tenant;
    upchartPostJson.chartTitle = settingForm.value.updname;
    upchartPostJson.chartType = settingForm.value.updashboardtype;
    upchartPostJson.datasource = settingForm.value.updatasource;
    upchartPostJson.item = settingForm.value.upitemname;
    upchartPostJson.metric = settingForm.value.upmetricname;
    upchartPostJson.yAxisName = settingForm.value.upyaxisname;
    upchartPostJson.xAxis = settingForm.value.upxaxis;

    for (var series in settingForm.value.upyaxis) {
      upchartPostJson["series"].push({ name: series, data: settingForm.value.upyaxis[series] })
    }
    console.log(upchartPostJson);
    var selectableId = "selectable" + chid
    this.removeAllCharts();
    this.chartSourcesService.updateCharts(upchartPostJson, chid).subscribe(res => {

      
    }, err => {
      console.log(err)
    })

    this.ngOnInit();


  }

  addCharttoDb(myCustomOptions, specialid, chartformvalue) {

    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }
    this.chartPostJson.chid = specialid;
    this.chartPostJson.tenant = this.userDetails.tenantId.toString();
    this.chartPostJson.chartType = myCustomOptions.chart.type;
    this.chartPostJson.chartTitle = myCustomOptions.title.text;
    this.chartPostJson.xAxis = myCustomOptions.xAxis.categories;
    this.chartPostJson.yAxisName = myCustomOptions.yAxis.title.text;
    this.chartPostJson.series = myCustomOptions.series;
    this.chartPostJson.datasource = chartformvalue.datasource;
    this.chartPostJson.item = chartformvalue.itemname;
    this.chartPostJson.metric = chartformvalue.metricname;

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

  showUpdateDialog() {
    var test = $("[id^='editbut']");

    for (var i = 0; i < test.length; i++) {
      if (test[i].className.endsWith("active")) {
        var radioId = test[i].id;
      }
    }

    var uniquepart = radioId.substring(7, radioId.length)
    console.log(uniquepart);

    // this.dashboardTypesDropdown =
    //   [
    //     { label: 'Select Value', value: null },
    //     { label: 'Bar', value: 'bar' },
    //     { label: 'Column', value: 'column' },
    //     { label: 'Pie', value: 'pie' }
    //   ]

    this.updataSourceDropDown.push({ label: 'Select Value', value: null });
    this.chartSourcesService.getServerDetails().subscribe(res => {
      for (var names in res.DataSources) {
        this.updataSourceDropDown.push({ label: names, value: names })
      }
    });

    var chartId = uniquepart;
    this.chartSourcesService.getChartById(chartId).subscribe(res => {
      this.dashboardId = res[0].chid;
    });

    this.display2 = true;
  }

  public ngAfterViewInit() {

    // this.removeAllHighcartMarks()

  }

  onClick(event) {
    console.log(event);
  }

  public ngOnDestroy() {
  }

  ngOnInit() {



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
    this.dashboardTypesDropdown = [];
    this.dataSourceDropDown = [];

    this.dashboardTypesDropdown =
      [{ label: 'Select Value', value: null },
      { label: 'Bar', value: 'bar' },
      { label: 'Column', value: 'column' },
      { label: 'Pie', value: 'Pie' }

      ]


    this.dataSourceDropDown.push({ label: 'Select Value', value: null });

    this.chartSourcesService.getServerDetails().subscribe(res => {

      for (var names in res.DataSources.Tools) {
        console.log
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
        var specialid = chartDetails[v].chid
        barandcolumn.chart.type = chartDetails[v].chartType;
        barandcolumn.title.text = chartDetails[v].chartTitle;
        barandcolumn.xAxis.categories = chartDetails[v].xAxis;
        barandcolumn.yAxis.title.text = chartDetails[v].yAxisName;
        barandcolumn.series = chartDetails[v].series;
        this.hcs.removeAll();
        this.hcs.createChart(this.chartEl.nativeElement, specialid, barandcolumn);
      }

    }, err => {
      console.log(err)
    })

    // this.removeAllHighcartMarks()
  }


  deleteChart() {

    var test = $("[id^='deletebut']");

    for (var i = 0; i < test.length; i++) {
      if (test[i].className.endsWith("active")) {
        var radioId = test[i].id;
      }
    }

    var uniquepart = radioId.substring(9, radioId.length)
    console.log(uniquepart)
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.chartSourcesService.deleteChartById(uniquepart).subscribe(res => {
          var selectableId = "selectable" + uniquepart
          this.removeChart(selectableId);
        });


      }
    });
    // this.removeAllHighcartMarks()
  }

  onDataSourceSelect(selectedVal) {

    this.itemsDropdown = [];
    this.displayxy = true;
    this.itemsDropdown.push({ label: 'Select Value', value: null });

    this.chartSourcesService.getServerDetails().subscribe(res => {
      this.dataArea = JSON.stringify(res.DataSources.Tools[selectedVal], undefined, 4)

      for (var names in res.DataSources.Tools[selectedVal].Items) {
        this.itemsDropdown.push({ label: names, value: names })
      }
    });

  }

  onItemSelect(selectedVal) {

    this.metricsDropdown = [];
    this.metricsDropdown.push({ label: 'Select Value', value: null });

    this.chartSourcesService.getServerDetails().subscribe(res => {
      for (var names in res.DataSources.Tools[this.dataSource].Items[selectedVal].Metrics) {

        this.metricsDropdown.push({ label: names, value: names })
      }
    });
  }

  onMetricSelect(selectedMetric) {
    this.xAxisDropDown = [];
    this.yAxisDropDown = [];

    this.xAxisDropDown.push({ label: 'Select Value', value: null });
    this.yAxisDropDown.push({ label: 'Select Value', value: null });

    this.chartSourcesService.getServerDetails().subscribe(res => {
      for (var names in res.DataSources.Tools[this.dataSource].Items[this.itemName].Metrics[selectedMetric]) {
        console.log(res.DataSources.Tools[this.dataSource].Items[this.itemName].Metrics[selectedMetric])
        console.log(names)
        this.xAxisDropDown.push({ label: names, value: res.DataSources.Tools[this.dataSource].Items[this.itemName].Metrics[selectedMetric][names] });
        this.yAxisDropDown.push({ label: names, value: res.DataSources.Tools[this.dataSource].Items[this.itemName].Metrics[selectedMetric][names] });

      }
    });
  }

  removeChart(chartId) {
    let firstContainer = <HTMLElement>document.getElementById(chartId);
    firstContainer.outerHTML = '';
    console.log("-------"+firstContainer)
  }

  removeAllCharts()
  {var elements  = document.querySelectorAll('[id^="selectable"');
  for (var i =0; i<elements.length; i++)
  {
    elements[i].outerHTML = '';
  }

  }

  // removeAllHighcartMarks()
  // {
  //   var elems = document.querySelectorAll(".highcharts-credits");
  //   console.log("sdasd" +elems)
  //   Array.prototype.forEach.call(elems, function (node) {
  //     node.parentNode.removeChild(node);
  //   });
  // }


}
