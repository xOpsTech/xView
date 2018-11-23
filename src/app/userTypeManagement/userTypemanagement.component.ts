import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from "../services/user.service";
import { UserType } from '../userManager/userType';
import { SignupService } from '../services/signup.service';
import { AutoCompleteModule } from 'primeng/primeng';
import { UserDetails } from '../models/userDetails';
import { MultiSelectModule } from 'primeng/primeng';
@Component({

  selector: 'userTypemanagement',
  templateUrl: './userTypemanagement.component.html',
  styleUrls: ['./userTypemanagement.component.scss'],
  providers: [UserService, SignupService]
})
export class UserTypemanagementComponent implements OnInit {

  createUserTypeForm: FormGroup;

  userType: UserType;


  management: Boolean = false;
  develop: Boolean = false;
  userTypeManager: Boolean = false;
  profileManager: Boolean = false;
  userManager: Boolean = false;
  inputSourceManager: Boolean = false;
  userAccountData: {};

  useTypes: UserType[];
  userDetails: UserDetails = {
    id: "",
    tenantId: ""
  }



  editUserTypes: {};
  filteredBrands: any[];
  usernames: string[] = [];
  tenantId: String = '';

  selectedCities: string[] = [];

  selectedCategories: string[] = [];

  checked: boolean = false;
  constructor(private userService: UserService, private signupService: SignupService) {
    if (localStorage.getItem("userDetails") && localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }
    this.createUserTypeForm = new FormGroup(
      {
        name: new FormControl(),
        management: new FormControl(),
        develop: new FormControl(),
        userTypeManager: new FormControl(),
        profileManager: new FormControl(),
        userManager: new FormControl(),
        inputSourceManager: new FormControl(),
        tenantId: new FormControl({ disabled: true })
      });

  }
  filterBrands(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.usernames.length; i++) {
      let user = this.usernames[i];
      if (user.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrands.push(user);
      }
    }
  }
  onSelectUserName(event) {
    this.selectedCategories = [];
    if (event != null && event != undefined) {
      var userid = event;
      this.userAccountData = this.userService.getUserById(userid).subscribe(res => {
       var usertyps = Object.keys(res.message[0].userType);
        var usertypesvalues =[];
        for (let v of usertyps )
        {
          usertypesvalues.push(res.message[0].userType[v])
        }
        console.log(usertypesvalues);

        for(let i=0; i< usertypesvalues.length; i++)
        {
          if(usertypesvalues[i].toString()=="true")
          {
            console.log("giya")
            this.selectedCategories.push(usertyps[i])
           
          }
        }

        console.log(this.selectedCategories)
      });
    }


  }
  ngOnInit() {

    var tenantId = this.userDetails.tenantId.toString();
    this.userAccountData = this.userService.getUserList(tenantId).subscribe(res => {
      for (var nameVal of res.data) {
        this.usernames.push(nameVal["id"].toString())
      }

    });


  }

  createNewTenant(createUserTypeForm) {

    var id = createUserTypeForm.name;
    delete createUserTypeForm.name
    this.userAccountData['userType'] = createUserTypeForm
    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }
    this.userService.updateUsertype(id, this.userAccountData).subscribe(res => {

    });
  }

  updateUserTypes(createUserTypeForm) {

    var id = createUserTypeForm.name;
   
    delete createUserTypeForm.name
   
    this.userAccountData['userType'] = createUserTypeForm
    if (localStorage.getItem("userDetails") !== null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    }
    this.userService.updateUsertype(id, this.userAccountData).subscribe(res => {
    

    });
  }


}
