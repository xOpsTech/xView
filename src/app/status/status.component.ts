import { Component, OnInit } from '@angular/core';
import { DataGridModule } from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  metric: any;
  items: any;
  qtd:any= {};
  status: string;


  
  selectedDashboards: string[] = ['Dashboard1', 'Dashboard2'];
  availableDashboards: string[] = ['Dashboard1', 'Dashboard2','Dashboard1'];
  display: boolean = false;
  
      showDialog() {
          this.display = true;
      }
  

  constructor(private dragulaService: DragulaService) {

    dragulaService.setOptions('third-bag', {
      removeOnSpill: false
    });
  }


  ngOnInit() {
    this.selectedDashboards = ['Dashboard1', 'Dashboard2'];
  

  }
  removeBox(index)
  {
    this.selectedDashboards.splice(index, 1);
  }
 

}
