import { Component, OnInit } from '@angular/core';
import { DashboardLinks } from '../services/dashboardlinks.service';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { LeftnavComponent } from '../leftnav/leftnav.component';
import { SharedService } from '../services/shared.service';
import { UserDetails } from '../models/userDetails';
import { ConfirmationService } from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';


@Component({
  selector: 'app-kibana-boards',
  templateUrl: './kibana-boards.component.html',
  styleUrls: ['./kibana-boards.component.scss'],
  providers: [DashboardLinks, SharedService,ConfirmationService]
})
export class KibanaBoardsComponent implements OnInit {

  constructor(private kibanadboardlinks: DashboardLinks, private ss: SharedService,private confirmationService: ConfirmationService) { 
    this.authorizedOpt = [
      {label:'Management', value:'management'},
      {label:'Develop', value:'develop'},
      {label:'User Type Manager', value:'userTypeManager'},
      {label:'Profile Manager', value:'profileManager'},
      {label:'Input Source Manager', value:'inputSourceManager'}

  ];

  this.upauthorizedOpt = [
    {label:'Management', value:'management'},
    {label:'Develop', value:'develop'},
    {label:'User Type Manager', value:'userTypeManager'},
    {label:'Profile Manager', value:'profileManager'},
    {label:'Input Source Manager', value:'inputSourceManager'}

];
  }
  authorizedOpt: SelectItem[];
  upauthorizedOpt: SelectItem[];
  dashboards = ["dashboard1"];
  links = ["links1"];
  uplinks = [];
  userDetails: UserDetails = {
    id: "",
    tenantId:""
  }
  
  tenant_id = "";
  kibanadashboards = {
    id: "",
    active: Boolean,
    tenantId: "",
    topic: String,
    link: [
      { name: String, href: String }],
      permission:[]
  }

  updatekibanadashboards = {
    id: "",
    active: Boolean,
    tenantId: "",
    topic: String,
    link: [
      { name: String, href: String }],
      permission:[]
  }

  upselectedState : boolean = false;
  upDashboardName = "";
  linkCount=0;
  dashboardlinks = [];

  countdashboards = 1;
  countlinks = 1;
  countupvalue = 1;
  countuplinks = 1;
  qtd: any[] = [];
  qtd2: any[] = [];
  qtd3: any[] = [];

  dNamesDropDown: SelectItem[] = [];

  submitKibanaDashboards(formvalues: NgForm) {
    this.kibanadashboards.topic = formvalues.value.dashboardname;
    this.kibanadashboards.link = [];
    for (var i = 0; i < this.countlinks; i++) {
      formvalues.value["linkname" + i]
      this.kibanadashboards.link.push({ name: formvalues.value["linkname" + i], href: formvalues.value["linkhref" + i] })
      console.log(this.kibanadashboards)
    }
    console.log(formvalues.value.authorizedset)
    this.kibanadashboards.tenantId =  this.tenant_id

    this.kibanadashboards.active = formvalues.value.selectedstate;
    this.kibanadashboards.permission = formvalues.value.authorizedset;
    console.log(formvalues.value)
    this.kibanadboardlinks.postDashboardLinks(this.kibanadashboards).subscribe(res => {

    })
    window.location.reload();

  }

  addLink() {
    this.countlinks = this.countlinks + 1;
    let linkname = "links" + this.countlinks
    this.links.push(linkname);

    console.log(this.links)
  }

  removeLink()
  {
    this.countlinks = this.countlinks -1;
    this.links.pop();
  }


  upaddLink() {
    this.dashboardlinks.push({ name: "", href: "" });
    this.linkCount = this.dashboardlinks.length;
    console.log(this.dashboardlinks)
  }

  upremoveLink()
  {
    this.dashboardlinks.pop();
    this.linkCount = this.dashboardlinks.length;
    console.log(this.dashboardlinks)
  }

  

  ngOnInit() {
    if (localStorage.getItem("userDetails") && localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
      console.log(this.userDetails)
      this.tenant_id = this.userDetails.tenantId.toString();
    }

    this.dNamesDropDown.push({ label: 'Select Value', value: null });
    
    this.kibanadboardlinks.getDashboardLinks(this.tenant_id).subscribe(res => {
      for (var msg of res['message']) {
        this.dNamesDropDown.push({ label: msg.topic, value: msg.id })
      }
      console.log(res)
    });

  }

  onChange(event) {
    this.dashboardlinks=[];
    var dashboardid = event.value;
    if (event.value != null) {
      this.kibanadboardlinks.getDashboardById(dashboardid).subscribe(res => {
        if(res.message[0]!="undefined")
        {
          this.upselectedState = res.message[0].active;
          this.upDashboardName= res.message[0].topic;

          for (var link of res.message[0].link) {
            this.dashboardlinks.push({ name: link.name, href: link.href })
          }

     
          this.linkCount = this.dashboardlinks.length;
          console.log(this.dashboardlinks)
        }
   
      });
    }

  }

  deleteDashboard(formvalues)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        var did = formvalues.value.upextdashboards;
        this.kibanadboardlinks.deleteDashboard(did).subscribe(res => {
        })
        window.location.reload();
      }
    })
 
  }

  updateKibanaDashboards(formvalues: NgForm)
  {
    var dashboardid = formvalues.value.upextdashboards;

      var linklength= formvalues.value.linkcount;
    this.updatekibanadashboards.link = [];
    for (var i = 0; i < linklength; i++) {
      formvalues.value["linkname" + i]
      this.updatekibanadashboards.link.push({ name: formvalues.value["uplinkname" + i], href: formvalues.value["uplinkhref" + i] })
      
    }

    this.countupvalue = linklength-1;
    console.log(this.countupvalue);
    this.updatekibanadashboards.id = dashboardid;
    this.updatekibanadashboards.active =  formvalues.value.upselectedstate;
    this.updatekibanadashboards.tenantId =  this.tenant_id
    this.updatekibanadashboards.permission = formvalues.value.upauthorizedset;

    this.kibanadboardlinks.updateDashboardLinks(this.updatekibanadashboards,dashboardid).subscribe(res => {
      console.log(res)
    }
    
    );

 window.location.reload();
}
}
