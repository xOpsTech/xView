import { Injectable } from "../../../node_modules/@angular/core";
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config/config';
import 'rxjs';
import { Server, Cloud, Application, Storage, Database } from '../business-insights/Server';

@Injectable()
export class TechInsightsService {
  constructor(private http: Http) { }

  getServerDetails(): Observable<Server[]> {

    return this.http.get(config.XOPSAPI + '/getServers/')
      .map(res => {
        console.log(res.json())
        return res.json().Servers.map(serverD => {

          return new Server(
            serverD.name,
            serverD.strength,
            serverD.color,
          );
        });
      });
  }

  getCloudDetails(): Observable<Cloud[]> {

    return this.http.get(config.XOPSAPI + '/getCloud/')
      .map(res => {
        console.log(res.json())
        return res.json().Clouds.map(CloudD => {

          return new Server(
            CloudD.name,
            CloudD.strength,
            CloudD.color,
          );
        });
      });
  }

  getApplicationDetails(): Observable<Application[]> {

    //return this.http.get(config.XOPSAPI + '/tech/applications/')
    return this.http.get(config.XOPSAPI + '/getApplication/')
      .map(res => {
        console.log(res.json())
        return res.json().Applications.map(ApplicationD => {

          return new Server(
            ApplicationD.name,
            ApplicationD.strength,
            ApplicationD.color,
          );
        });
      });
  }

  getStorageDetails(): Observable<Storage[]> {

    return this.http.get(config.XOPSAPI + '/getStorage/')
      .map(res => {
        console.log(res.json())
        return res.json().Storages.map(StorageD => {

          return new Server(
            StorageD.name,
            StorageD.strength,
            StorageD.color,
          );
        });
      });
  }

  getDatabaseDetails(): Observable<Database[]> {

    //return this.http.get(config.XOPSAPI + '/tech/applications/')
    return this.http.get(config.XOPSAPI + '/getDatabase/')
      .map(res => {
        console.log(res.json())
        return res.json().Databases.map(DatabaseD => {

          return new Server(
            DatabaseD.name,
            DatabaseD.strength,
            DatabaseD.color,
          );
        });
      });
  }

}