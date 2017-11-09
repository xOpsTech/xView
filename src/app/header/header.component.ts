import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute ,Router}     from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
 
})
export class HeaderComponent implements OnInit {
  user = {
    name: "",
    picture: "",
    tenantId: ""
  };
  toggleicon = "/assets/img/nav-expand.png";
   selected : boolean;
  constructor( private userService:UserService,private router: Router ,private route: ActivatedRoute) {
    this.selected = false;
  }

  ngOnInit() {
      this.userService.getUserData().subscribe(res => {

        this.user = res.message[0];       
        // this.userService.setUserName(this.user.name);
        // this.userService.setTenant(this.user.tenantId);
      });
  }

  toggleimg()
  {
    if(this.toggleicon =="/assets/img/nav-expand.png")
    { this.toggleicon = "/assets/img/nav-collapse.png";}
    else{
      this.toggleicon ="/assets/img/nav-expand.png"
    }
   
  }
  toggledropDown(){
        this.selected = !this.selected;
    }
    removedropDown(){
      this.selected = !this.selected;
    }

    logout():void{     
      window.localStorage.removeItem("token");
      this.router.navigate(['/login'],{relativeTo: this.route});  
    //  window.location.reload();    
    }
   

}
