import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { PerfIndicatorService } from '../services/perf-indicator.service';
import { CircleProgressComponent } from '../../shared/circle-progress.component';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantService, } from '../services/tenant.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {Server, Cloud, Application, Storage, Database} from '../business-insights/Server';


// For json import------------------------------------
// import { Http, Response } from "@angular/http";
// export type Server = { name:string , color:string };
// import 'rxjs/add/operator/map'

@Component({
  selector: 'app-business-insights',
  templateUrl: './business-insights.component.html',
  styleUrls: ['./business-insights.component.scss']
})
export class BusinessInsightsComponent implements OnInit {

          Servers= [  new Server('Server 01', 1,'green'),   
                      new Server('Server 02', 2, 'red'),   
                      new Server('Server 03', 3, 'green'), 
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),  
                      new Server('Server 03', 3, 'amber'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),  
                      new Server('Server 03', 3, 'amber'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),  
                      new Server('Server 03', 3, 'amber'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'amber'),
                      new Server('Server 03', 3, 'amber'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 03', 3, 'green'),
                      new Server('Server 04', 4, 'green') ];

           Clouds= [  new Cloud('Cloud 01', 1,'green'),   
                      new Cloud('Cloud 02', 2, 'red'),   
                      new Cloud('Cloud 03', 3, 'green'), 
                      new Cloud('Cloud 03', 3, 'green'),
                      new Cloud('Cloud 03', 3, 'green'),
                      new Cloud('Cloud 03', 3, 'green'),
                      new Cloud('Cloud 03', 3, 'green'),
                      new Cloud('Cloud 04', 4, 'green') ];
          
     Applications= [  new Application('Application 01', 1,'amber'),   
                      new Application('Application 02', 2, 'green'),   
                      new Application('Application 03', 3, 'green'), 
                      new Application('Application 03', 3, 'green'),
                      new Application('Application 04', 4, 'red') ];           
    
         Storages= [  new Storage('Storage 01', 1,'green'),   
                      new Storage('Storage 02', 2, 'amber'),   
                      new Storage('Storage 03', 3, 'green'), 
                      new Storage('Storage 03', 3, 'green'),
                      new Storage('Storage 04', 4, 'green'),
                      new Storage('Storage 03', 3, 'green'), 
                      new Storage('Storage 03', 3, 'red'),
                      new Storage('Storage 04', 4, 'green') ]; 
        
          Databases= [new Database('Database 01', 1,'green'),   
                      new Database('Database 02', 2, 'amber'),   
                      new Database('Database 03', 3, 'green'), 
                      new Database('Database 03', 3, 'green'),
                      new Database('Database 04', 4, 'green'),
                      new Database('Database 03', 3, 'green'), 
                      new Database('Database 03', 3, 'green'),
                      new Database('Database 01', 1,'green'),   
                      new Database('Database 02', 2, 'green'),   
                      new Database('Database 03', 3, 'green'), 
                      new Database('Database 03', 3, 'green'),
                      new Database('Database 04', 4, 'green'),
                      new Database('Database 03', 3, 'green'), 
                      new Database('Database 03', 3, 'red'),
                      new Database('Database 04', 4, 'green'),
                      new Database('Database 03', 3, 'green'), 
                      new Database('Database 03', 3, 'amber'),
                      new Database('Database 04', 4, 'green') ];               

             


constructor() { }

  
ngOnInit() {


}

}

