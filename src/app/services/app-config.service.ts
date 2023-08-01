import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConstants } from '../shared/app.constants';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig : any;
  path = 'assets/data/appConfig.json';

  constructor(private http: HttpClient) {
  }

  loadAppConfig() {
  console.log("this.path======" + this.path);
    return this.http.get(this.path).pipe(shareReplay(1))
    .toPromise()
    .then(data => {
      this.appConfig = data;
    });
  }

  getConfig() {
    this.setEnvironmentVariables(this.appConfig);
    return this.appConfig;
  }

    setEnvironmentVariables(environment: any) {
    //  alert("environment" + environment.apiUrl);
      AppConstants.ENVIRONMENT_NAME = environment.envName;
      AppConstants.SERVICES_API_ENDPOINT = environment.apiUrl;
    }
}
