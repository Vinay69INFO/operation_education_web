import { Injectable } from '@angular/core';
import {AppConstants } from '../shared/app.constants';
//import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  read<T>(key: string): any {
      let value: string = this.getStorageData(key);

      if(value && value != "undefined" && value != "null") {
        return <T>JSON.parse(value);
      }

      return null;
    }

    getStorageData(key: string): any {
      if(AppConstants.ENVIRONMENT_NAME == "local") {
       // return Cookie.get(key);
      } else {
        return localStorage.getItem(key);
      }
    }

    write(key: string, value: any)  {
      if(value) {
        value = JSON.stringify(value);
      }
      this.setStorageData(key, value);
    }

    setStorageData(key: any, value: any): any {
      if(AppConstants.ENVIRONMENT_NAME == "local") {
//        Cookie.set(key, value, 0, '/');
      } else {
        localStorage.setItem(key, value);
      }
    }

    clearStorage() {
      if(AppConstants.ENVIRONMENT_NAME == "local") {
   //     Cookie.deleteAll(undefined);
      } else {
        localStorage.clear();
      }
    }

}
