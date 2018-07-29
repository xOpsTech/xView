import { Injectable } from "../../../node_modules/@angular/core";
import { Http, Response, RequestOptions ,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config/config';
import 'rxjs';
import { Server, Cloud, Application, Storage, Database } from '../business-insights/Server';

@Injectable()
export class TechInsightsService {
  constructor(private http: Http) { }

  getServerDetails(): Observable<Server[]> {
    var token = localStorage.getItem('token');
    let headers = new Headers({token});
     console.log(token)
    return this.http.get(config.XOPSAPI + '/tech/servers/',{ headers })
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
    var token = localStorage.getItem('token');
    let headers = new Headers({token});

    return this.http.get(config.XOPSAPI + '/tech/clouds/',{ headers })
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


}