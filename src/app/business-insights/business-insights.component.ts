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
import { PanelModule } from 'primeng/primeng';
import { Server, Cloud, Application, Storage, Database } from '../business-insights/Server';
import { TechInsightsService } from '../services/techinsights.service'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-business-insights',
  templateUrl: './business-insights.component.html',
  styleUrls: ['./business-insights.component.scss'],
  providers: [TechInsightsService]
})

export class BusinessInsightsComponent implements OnInit {

  private serverData: Observable<Server[]>
  private cloudData: Cloud[];
  private applicationData: Application[];
  private storageData: Storage[];
  private databaseData: Database[];
  constructor(private techInsightsService: TechInsightsService) {
  }
  fireEvent(server){
    console.log(server);
    var popup = document.getElementById(server.name);
    popup.classList.toggle("show");
    popup.innerHTML = server.name + " " + server.strength + " " + server.color;
  }

  Applications = [new Application('Application 01', 1, 'amber'),
  new Application('Application 02', 2, 'green'),
  new Application('Application 03', 3, 'green'),
  new Application('Application 03', 3, 'green'),
  new Application('Application 04', 4, 'red')];

  Storages = [new Storage('Storage 01', 1, 'green'),
  new Storage('Storage 02', 2, 'amber'),
  new Storage('Storage 03', 3, 'green'),
  new Storage('Storage 03', 3, 'green'),
  new Storage('Storage 04', 4, 'green'),
  new Storage('Storage 03', 3, 'green'),
  new Storage('Storage 03', 3, 'red'),
  new Storage('Storage 04', 4, 'green')];

  Databases = [new Database('Database 01', 1, 'green'),
  new Database('Database 02', 2, 'amber'),
  new Database('Database 03', 3, 'green'),
  new Database('Database 03', 3, 'green'),
  new Database('Database 04', 4, 'green'),
  new Database('Database 03', 3, 'green'),
  new Database('Database 03', 3, 'green'),
  new Database('Database 01', 1, 'green'),
  new Database('Database 02', 2, 'green'),
  new Database('Database 03', 3, 'green'),
  new Database('Database 03', 3, 'green'),
  new Database('Database 04', 4, 'green'),
  new Database('Database 03', 3, 'green'),
  new Database('Database 03', 3, 'red'),
  new Database('Database 04', 4, 'green'),
  new Database('Database 03', 3, 'green'),
  new Database('Database 03', 3, 'amber'),
  new Database('Database 04', 4, 'green')];



  ngOnInit() {

    // this.techInsightsService.getServerDetails().subscribe(serverData => {
    //   this.serverData = this.techInsightsService.getServerDetails()
    // });
    this.serverData =this.techInsightsService.getServerDetails();
    this.techInsightsService.getCloudDetails().subscribe(cloudData => {
      this.cloudData = cloudData
    });

    this.techInsightsService.getApplicationDetails().subscribe(applicationData => {
      this.applicationData = applicationData
    });

    this.techInsightsService.getStorageDetails().subscribe(storageData => {
      this.storageData = storageData
    });

    this.techInsightsService.getDatabaseDetails().subscribe(databaseData => {
      this.databaseData = databaseData
    });
  }

}

