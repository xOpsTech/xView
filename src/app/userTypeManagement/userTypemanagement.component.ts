import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, FormBuilder, Validators, NgForm} from '@angular/forms';
import {UserService} from "../services/user.service";
import {UserType} from '../userManager/userType';
import {SignupService} from '../services/signup.service';

@Component({

  selector: 'userTypemanagement',
  templateUrl: './userTypemanagement.component.html',
  styleUrls: ['./userTypemanagement.component.scss'],
  providers:[UserService,SignupService]
})
export class UserTypemanagementComponent implements OnInit {

  createUserTypeForm: FormGroup;

  userType:UserType;

  name: String = '';
  management: Boolean = false;
  develop: Boolean = false;
  userTypeManager: Boolean = false;
  profileManager: Boolean = false;
  userManager: Boolean = false;
  inputSourceManager: Boolean = false;
  userAccountData: {};

  useTypes:UserType[];


  editUserTypes:{};


  tenantId: String = '';

  constructor(private userService: UserService,private signupService:SignupService) {

    this.createUserTypeForm = new FormGroup(
      {
        name: new FormControl(),
        management: new FormControl(),
        develop: new FormControl(),
        userTypeManager: new FormControl(),
        profileManager:new FormControl(),
        userManager:new FormControl(),
        inputSourceManager:new FormControl(),
        tenantId:new FormControl({disabled:true})
      });

  }


  ngOnInit() {
    this.userAccountData = this.userService.getUserData().subscribe(res => {
  
      this.tenantId = res.message[0].tenantId;
  
      this.editUserTypes=this.userService.getUserTypeByTenantId(this.tenantId).subscribe(res=>{
        this.useTypes=res.data;
      });

    });


  }

  createNewTenant(createUserTypeForm){

    this.userType=createUserTypeForm;

    this.userService.saveUserType(this.userType).subscribe(res=>{

      this.createUserTypeForm.reset();
      location.reload();

    });
  }
}
