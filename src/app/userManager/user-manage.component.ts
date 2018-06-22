import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SignupComponent} from "../signup/signup.component";
import {SignupService} from "../services/signup.service";
import {FormGroup, FormControl, FormBuilder, Validators, NgForm} from '@angular/forms';
import {UserService} from "../services/user.service";
import {createRouterState} from "@angular/router/src/create_router_state";
import {UserType} from './userType';

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
  userType:{
    name:"Select User Type";
    management:false;
    develop:false;
    userTypeManager:false;
    profileManager:false;
    userManager:false;
    inputSourceManager:false;
  };
  userAccountData: {};
  editable:boolean=false;

  userAccountsCount=0;

  userAccounts:any[];
  useTypes:{
    name:"";
    management:false;
    develop:false;
    userTypeManager:false;
    profileManager:false;
    userManager:false;
    inputSourceManager:false;
  }[];

  editUsersAccountData:{};
  editUserTypes:{};

  editUserAccountForm:FormGroup;
  editUsername:String='';
  editEmailAddress:String='';
  editPassword:String='';
  tenantIds:String='';

  constructor(private signupService: SignupService,private userService:UserService) {
    this.createAccountForm = new FormGroup(
      {
        username: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        cnfmpassword: new FormControl(),
        userType:new FormControl(),
      tenantId:new FormControl({disabled:true})
    });

    this.editUserAccountForm=new FormGroup(
      {
        editUsername:new FormControl(),
        editEmailAddress:new FormControl(),
        editPassword:new FormControl(),
        tenantIds:new FormControl()

      });


  }

  ngOnInit() {

    this.userAccountData=this.userService.getUserData().subscribe(res=>{
      console.log(res)

      this.tenantId=res.message[0].tenantId;

      console.log("tenant Id  "+this.tenantId);


      this.editUsersAccountData=this.userService.getUserByTenantId(this.tenantId).subscribe(res=>{
        console.log("This is the object returning");
        console.log("The username is "+res.data[0].name);
        console.log("The email is "+res.data[0].id);

        this.userAccounts=res.data;

      });

      // this.useTypes[0]="Select UserType";

      this.editUserTypes=this.userService.getUserTypeByTenantId(this.tenantId).subscribe(res=>{



        if(res.data.length!=0){
          this.useTypes=res.data;
        }
        console.log(this.useTypes);
      });
    });



  }



createUser(CreateAccountForm){
    // console.log("type CreateAccountForm"+ typeof CreateAccountForm);
    console.log( CreateAccountForm);
    console.log(CreateAccountForm.userType);


    // delete CreateAccountForm['cnfmpassword'];

  this.userAccountData=CreateAccountForm;



  console.log("type userAccountData "+ typeof this.userAccountData);


    this.signupService.saveUser(this.userAccountData).subscribe(res=>{
    console.log(res);
      this.createAccountForm.reset();
    });

   location.reload();


  console.log(CreateAccountForm);




}

editUser(){
  this.editable=true;
  console.log("It is editable"+this.editable)
}



}
