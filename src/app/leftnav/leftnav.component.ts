import { Component, OnInit, HostListener } from '@angular/core';
import {UserService} from '../services/user.service';
import {UserType} from '../userManager/userType';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent implements OnInit {
  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public nav_gap = 135;

  public manager:boolean = false;

  public userManager:boolean=false;
  public management:boolean=false;
  public develop:boolean=false;
  public userTypeManager:boolean=false;
  public profileManager:boolean=false;
  public inputSourceManager:boolean=false;

  userAccountData: {};
  userType:UserType;

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
    if(window.pageYOffset<100) {
      this.nav_gap = 135 - window.pageYOffset;
    }
    else {
      this.nav_gap = 35;
    }
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userAccountData = this.userService.getUserData().subscribe(res => {
      console.log(res);

      this.userType=res.message[0].userType;

      console.log(this.userType);




      this.userManager=this.userType.userManager;
      this.profileManager=this.userType.profileManager;
      this.userTypeManager=this.userType.userTypeManager;
      this.inputSourceManager=this.userType.inputSourceManager;
      this.develop=this.userType.develop;

      if(this.userManager==false&&this.profileManager==false&&this.userTypeManager==false&&this.inputSourceManager==false&&this.develop==false){
        this.manager=false;
      }else {
        this.manager=true;
      }


    });

  }

}
