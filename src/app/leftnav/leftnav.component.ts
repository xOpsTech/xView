import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent implements OnInit {
  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public nav_gap = 115;

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
    if(window.pageYOffset<50) {
      this.nav_gap = 115 - window.pageYOffset;
    }
    else {
      this.nav_gap = 55;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
