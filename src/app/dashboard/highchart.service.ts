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


        if (!!opts["chart"]) {
            opts["chart"]['renderTo'] = e;
        }
        else {
            opts["chart"] = {
                'renderTo': e
            }
        }
        this.charts.push(new Highcharts.Chart(opts));


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

    removeAll(number) {
        this.charts.splice(number, 1);
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
