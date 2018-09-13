import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

@Injectable()
export class HighchartService {
    count = 0;
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

    default2 = {chart: {
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
                    color: ('green'&& 'yellow') || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
    }]
}

    constructor() {
    }

    createChart(container, specialid, options?: Object) {

      

        let opts = !!options ? options : this.defaultOptions;
        let eparent = document.createElement("div");
        eparent.className = "col-md-6"
        eparent.setAttribute('style', 'margin-top:10px');
        eparent.setAttribute("id", "selectable" + specialid);


        let e = document.createElement("div");
        e.setAttribute("id", "chartcontainer" + specialid);


        let but = document.createElement("a");
        but.setAttribute('style', 'float:right');
        but.setAttribute('id', "deletebut" + specialid);
        but.className = "btn btn-primary";

        let liclose = document.createElement("li");
        liclose.className = "fa fa-close";
        but.appendChild(liclose);


        let editbutton = document.createElement("a");
        editbutton.setAttribute('style', 'float:right');
        editbutton.setAttribute('id', "editbut" + specialid);
        editbutton.className = "btn btn-info";

        var radio = document.createElement("INPUT");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "chartradio");
        radio.setAttribute("id", "chartradio" + specialid);
        radio.setAttribute('style', 'float:right');

        let ligear = document.createElement("li");
        ligear.className = "fa fa-gear";
        editbutton.appendChild(ligear);


        eparent.appendChild(editbutton);
        eparent.appendChild(but);
        eparent.appendChild(e);

        container.appendChild(eparent);
      $("[id^='selectable']").draggable();

        if (!!opts["chart"]) {
            opts["chart"]['renderTo'] = e;
        }
        else {
            opts["chart"] = {
                'renderTo': e
            }
        }
        this.charts.push(new Highcharts.Chart(opts));
        var elems = document.querySelectorAll(".highcharts-credits");
        console.log("sdasd" +elems)
        Array.prototype.forEach.call(elems, function (node) {
          node.parentNode.removeChild(node);
        });

        $("#deletebut" + specialid).bind("click",
            function (event) {
                var elmid = event.target.id;
                var special = elmid.substring(9, elmid.length);
                $(".active").removeClass("active");
                $(this).addClass("active");
                document.getElementById("deletebuttonid").click();
                // let firstContainer = <HTMLElement>document.getElementById("selectable" + special);
                // firstContainer.outerHTML = '';
            }

        );

        $("#editbut" + specialid).bind("click",
            function (event) {
                $(".active").removeClass("active");
                $(this).addClass("active");
                document.getElementById("updatebuttonid").click();
            });


    }

    removeAll() {
        this.charts = [];
    }


    updateGraphEvent() {

    }
    getChartInstances(): number {
        return this.charts.length;
    }

    getCharts() {
        return this.charts;
    }
}
