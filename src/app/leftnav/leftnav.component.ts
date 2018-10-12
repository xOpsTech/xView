import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDetails } from '../models/userDetails';
import { TenantDetails } from '../models/tenantDetails';
import { DashboardLinks } from '../services/dashboardlinks.service';
import { Observable } from 'rxjs';
import { DashboardDetails } from '../models/dashboardDetails';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  providers: [DashboardLinks, UserService]
})
export class LeftnavComponent implements OnInit {
  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  public nav_gap = 135;

  public manager: boolean = false;

  public userManager: boolean = false;
  public management: boolean = false;
  public develop: boolean = false;
  public userTypeManager: boolean = false;
  public profileManager: boolean = false;
  public inputSourceManager: boolean = false;
  userObservable = [];
  userTypes = [];
  loguserTypes = [];
  perobj = [];
  userAccountData: {};
  userDetails: UserDetails = {
    userType: {
      management: false,
      develop: false,
      userTypeManager: false,
      profileManager: false,
      userManager: false,
      inputSourceManager: false
    }
  }
  valueis = false;
  cdashboard: any[] = [];
  tenantDetails: TenantDetails = {
    banner: "",
    logo: "",
    id: ""
  }

  tenant_id = "";
  private observableDashboards: Observable<DashboardDetails[]>

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(): void {
    if (window.pageYOffset < 100) {
      this.nav_gap = 135 - window.pageYOffset;
    }
    else {
      this.nav_gap = 35;
    }
  }

  constructor(private dboardlinks: DashboardLinks, private userService: UserService) {

  }

  onMain: Boolean;



  ngOnInit() {

    this.cdashboard = [];
    this.valueis = true;

      this.userService.getUserById().subscribe(res => { 
        console.log(res.message[0].userType)
        this.userDetails.userType = res.message[0].userType;
        this.perobj = Object.keys(this.userDetails.userType)

        for (var i = 0; i < this.perobj.length; i++) {
          console.log(this.userDetails.userType[this.perobj[i]])
          if (this.userDetails.userType[this.perobj[i]] == true) {
            this.loguserTypes.push(this.perobj[i])
          }
        }

        this.dboardlinks.getDashboardLinksByPermission(this.loguserTypes).subscribe(res => {
          for (var msg of res['message']) {
            this.cdashboard.push({ "topic": msg.topic, "link": msg.link })
          }
        });


    this.userObservable == [1, 2, 3, 4]

    this.userManager = this.userDetails.userType.userManager;
    this.profileManager = this.userDetails.userType.profileManager;
    this.userTypeManager = this.userDetails.userType.userTypeManager;
    this.inputSourceManager = this.userDetails.userType.inputSourceManager;
    this.develop = this.userDetails.userType.develop;

    if (this.userManager == false && this.profileManager == false && this.userTypeManager == false && this.inputSourceManager == false && this.develop == false) {
      this.manager = false;
    } else {
      this.manager = true;

    }
  });


  }

}
