import { Component, OnInit } from '@angular/core';
import { DashboardLinks } from '../services/dashboardlinks.service';
import { NgForm } from '../../../node_modules/@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { LeftnavComponent } from '../leftnav/leftnav.component';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-kibana-boards',
  templateUrl: './kibana-boards.component.html',
  styleUrls: ['./kibana-boards.component.scss'],
  providers: [DashboardLinks,SharedService]
})
export class KibanaBoardsComponent implements OnInit {

  constructor(private dboardlinks: DashboardLinks,private ss: SharedService) { }

  dashboards = ["dashboard1"];
  links = ["links1"];

  dashboardlinks = {
    id:"",
    active:Boolean,
    tenantId :"",
    topic: String,
    link: [
      { name: String, href: String }]
  }

  countdashboards = 1;
  countlinks = 1;

  qtd: any[] = [];
  qtd2: any[] = [];
  qtd3: any[] = [];

  dNamesDropDown: SelectItem[] = [];

  submitKibanaDashboards(formvalues: NgForm) {
    this.dashboardlinks.topic  = formvalues.value.dashboardname;
    this.dashboardlinks.link = [];
    for(var i=0; i<this.countlinks; i++)
    {
      formvalues.value["linkname"+i]
      this.dashboardlinks.link.push({name : formvalues.value["linkname"+i],href : formvalues.value["linkhref"+i]})
      console.log(this.dashboardlinks)
    }
    this.dashboardlinks.tenantId = "j3dv1y0"

    this.dashboardlinks.active = formvalues.value.selectedstate;
    console.log(formvalues.value)
    this.dboardlinks.postDashboardLinks(this.dashboardlinks).subscribe(res=>{
     
    })
    this.ss.change();
  }

  addLink() {
    this.countlinks = this.countlinks + 1;
    let linkname = "links" + this.countlinks
    this.links.push(linkname);
    console.log(this.links)
  }


  ngOnInit() {
    this.dNamesDropDown.push({ label: 'Select Value', value: null });

    this.dboardlinks.getDashboardLinks("j3dv1y0").subscribe(res=>{
      for (var msg of res.message){
    console.log(msg._id)
            this.dNamesDropDown.push({ label: msg.topic, value: msg._id })
    
          }
      });
    console.log(this.dashboards)
    console.log(this.links)
  }

  onChange(event)
  {
    console.log(event)
  }

}
