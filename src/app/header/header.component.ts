import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = {
    name: "",
    picture: ""
  };
  constructor(private userService: UserService) {
    this.cities = [];
    this.userService.getUserData().subscribe(res => {
      this.user = res;
      this.userService.setUserName(this.user.name);
      this.cities.push({ label: this.user.name, value: { id: 1, name: this.user.name, code: 'NY' } });
    });

    this.cities.push({ label: 'Settings', value: { id: 1, name: 'Settings', code: 'Settings' } });
    this.cities.push({ label: 'Logout', value: { id: 2, name: 'Logout', code: 'Logout' } });
  }

  cities: SelectItem[];
  selectedCity: string;


  ngOnInit() {
    console.log(this.user);
  }

}
