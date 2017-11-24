import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SignupComponent} from "../signup/signup.component";
import {SignupService} from "../services/signup.service";
import {FormGroup, FormControl, FormBuilder, Validators, NgForm} from '@angular/forms';
import {UserService} from "../services/user.service";
import {createRouterState} from "@angular/router/src/create_router_state";

@Component({

  selector: 'user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
  providers:[SignupService,UserService]


})
export class UserManageComponent implements OnInit {

  createAccountForm: FormGroup;
  username: String = '';
  email: String = '';
  password: String = '';
  cnfmpassword: String = '';
  tenantId: any = '';
  userAccountData: {};




  constructor(private signupService: SignupService,private userService:UserService) {
    this.createAccountForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      cnfmpassword: new FormControl(),
      tenantId:new FormControl({disabled:true})
    });
  }

  ngOnInit() {

    this.userAccountData=this.userService.getUserData().subscribe(res=>{
      console.log(res)

      this.tenantId=res.message[0].tenantId;

      console.log("tenant Id  "+this.tenantId)
    });


  }



createUser(CreateAccountForm){
    console.log("type CreateAccountForm"+ typeof CreateAccountForm);

    // delete CreateAccountForm['cnfmpassword'];

  this.userAccountData=CreateAccountForm;


  console.log("type userAccountData"+ typeof this.userAccountData);


    this.signupService.saveUser(this.userAccountData).subscribe(res=>{
    console.log(res)
      this.createAccountForm.reset();
    });


  location.reload();


  console.log(CreateAccountForm);




}



}
