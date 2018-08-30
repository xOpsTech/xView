import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
  
@Injectable()
export class HighchartService {
  count = 4;
  charts = [];
  defaultOptions = {
    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },
    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },
    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            pointStart: 2010
        }
    },
    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }]
  }

  constructor() {
  }
  
  createChart(container, options?: Object) {

    this.count= this.count +1;

    let opts = !!options ? options : this.defaultOptions;
    let e = document.createElement("div");
    e.className="col-md-6"
    e.setAttribute( 'style', 'margin-top:10px' );
    e.setAttribute("id", "draggable"+this.count);


    container.appendChild(e);
   
    $('[id^=draggable]').draggable();
 

    if(!!opts["chart"]) {
        opts["chart"]['renderTo'] = e;
    }
    else {
    opts["chart"]= {
        'renderTo': e
      }
    }
    this.charts.push(new Highcharts.Chart(opts));
  }
  
  removeFirst() {
    this.charts.shift();
  }
  
  removeLast() {
    this.charts.pop();
  }
  
  getChartInstances(): number {
    return this.charts.length;
  }

  getCharts() {
    return this.charts;
  }
}
