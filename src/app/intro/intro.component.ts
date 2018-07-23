import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})

//localStorage.getItem("UserDetails",JSON.stringify(res.message[0])); 

export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
