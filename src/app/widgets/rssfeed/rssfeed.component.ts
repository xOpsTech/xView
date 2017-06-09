import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rssfeed',
  templateUrl: './rssfeed.component.html',
  styleUrls: ['./rssfeed.component.css']
})
export class RssfeedComponent implements OnInit {
  servicesSet = [
    {
        name: "test1",
        status: "ok"
    },
    {
        name: "test2",
        status: "blocked"
    },
    {
        name: "test3",
        status: "unknown"
    },
    {
        name: "test4",
        status: "ok"
    },
    {
        name: "test5",
        status: "ok"
    },
    {
        name: "test6",
        status: "ok"
    },
    {
        name: "test6",
        status: "blocked"
    },
    {
        name: "test4",
        status: "ok"
    },
    {
        name: "test5",
        status: "ok"
    },
    {
        name: "test6",
        status: "ok"
    },
    {
        name: "test6",
        status: "blocked"
    }
  ]

  //initialising values
  services = this.servicesSet.slice(0, 11);
  currentSelectedPageNumber = 1;
  prevButtonDisabled = true;
  recordsPerPage = 10;
  totalCount = this.servicesSet.length;
  numberOfPages = Math.ceil(this.totalCount / Number(this.recordsPerPage));
  numberOfPagesArray = []
  nextButtonDisabled = (this.totalCount === this.currentSelectedPageNumber) ? true : false;


  constructor() {
      for (var i = 0; i < (this.numberOfPages); i++) {
          this.numberOfPagesArray.push({index : i + 1});
      }

  }

  setRecordsPerPage(number) {

      if (number  === 'all') {
          this.services = this.servicesSet;
          this.recordsPerPage = this.servicesSet.length;
          this.numberOfPages = 1;
      } else {
          var totalCount = this.servicesSet.length;
          this.numberOfPages = Math.ceil(totalCount / Number(number));
          this.recordsPerPage = number;
      }

      this.numberOfPagesArray = [];
      for (var i = 0; i < (this.numberOfPages); i++) {
          this.numberOfPagesArray.push({index : i + 1});
      }
  }

  selectPage(page) {

      if (page === -1) {
          this.currentSelectedPageNumber = this.currentSelectedPageNumber - 1;
      } else if (page === +1) {
          this.currentSelectedPageNumber = this.currentSelectedPageNumber + 1;
      } else {
          this.currentSelectedPageNumber = page;
      }

      if (this.currentSelectedPageNumber === 1) {
          this.prevButtonDisabled = true;
      }

      if (this.currentSelectedPageNumber === this.numberOfPages) {
          this.nextButtonDisabled = true;
      }

      this.services = this.servicesSet.slice(((page - 1) * (this.recordsPerPage)), ((page) * (this.recordsPerPage)));
  }

  ngOnInit() {
  }

}
