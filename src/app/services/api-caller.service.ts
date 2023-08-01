import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataStorageService } from './data-storage.service';
import { Router } from '@angular/router';

import { AppConstants } from '../shared/app.constants';
import { catchError, map, retry } from 'rxjs/operators';
//import { DialogsService } from "../dialogs/dialogs.service";
import { BehaviorSubject, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  constructor(private http: HttpClient,
      private dataStorageService: DataStorageService,
    //  private dialogsService: DialogsService,
      private router: Router) { }

    isNotEmpty(value: string) {
        return value != '' && value.length > 0;
      }

      createAuthorizationHeader() {
          const authToken = this.dataStorageService.read(AppConstants.AUTH_STORAGE_KEY);
          const deviceId = this.dataStorageService.read(AppConstants.DEVICE_STORAGE_KEY);
          let headers = new HttpHeaders();
          headers = headers.append('Content-Type', 'application/json');
          console.log(authToken != '' + "  " + authToken != null);
          if(authToken != '' && authToken != null) {
            headers = headers.append('X-com-contact-device-id', deviceId);
            headers = headers.append('X-com-contact-auth-token', authToken);
          }
          console.log("headers=====>  " + JSON.stringify(headers));
          return headers;
        }

        saveAuthToken(headers: HttpHeaders) {
              let authToken = headers.get("X-com-contact-auth-token");
              let deviceId = headers.get("X-com-contact-device-id");

              if(authToken != '' && authToken != null) {
                    console.log("saveAuthToken if: " + deviceId + "authToken ===> " + authToken );

                this.dataStorageService.write(AppConstants.AUTH_STORAGE_KEY, authToken);
                this.dataStorageService.write(AppConstants.DEVICE_STORAGE_KEY, deviceId);
              }
            }

        displayLoader(value: boolean) {
         // this.loaderStatus.next(value);
        }

        apiPostCaller(url: any, data: any): Observable<any> {
          const headers = this.createAuthorizationHeader();
          this.displayLoader(true);
          return this.http.post(AppConstants.SERVICES_API_ENDPOINT + url, data, {headers, observe: 'response'})
            .pipe(map((res: any) => {
              this.displayLoader(false);
              if(res) {
                this.saveAuthToken(res.headers);
                return res.body;
              }
            }),
            );
        }

          apiPutCaller(url: any, data: any): Observable<any> {
            const headers = this.createAuthorizationHeader();
            this.displayLoader(true);
            return this.http.put(AppConstants.SERVICES_API_ENDPOINT + url, data, {headers, observe: 'response'})
              .pipe(map((res: any) => {
                this.displayLoader(false);
                if(res) {

                  this.saveAuthToken(res.headers);
                  return res.body;
                }
              }),
              );
          }


        apiGetCaller(url: any): Observable<any> {
             const headers = this.createAuthorizationHeader();
               this.displayLoader(true);
                return this.http.get(AppConstants.SERVICES_API_ENDPOINT + url, {headers, observe:'response'})
                  .pipe(map((res: any) => {
                    this.displayLoader(false);
                    if(res) {
                      console.log(JSON.stringify(res)   + " <--------res========> " + res.headers);
                      this.saveAuthToken(res.headers);
                      return res.body;
                    }
                  })
                );
          }

          apiDeleteCaller(url: any): Observable<any> {
                       const headers = this.createAuthorizationHeader();
                         this.displayLoader(true);
                          return this.http.delete(AppConstants.SERVICES_API_ENDPOINT + url, {headers, observe:'response'})
                            .pipe(map((res: any) => {
                              this.displayLoader(false);
                              if(res) {
                                console.log(JSON.stringify(res)   + " <--------res========> " + res.headers);
                                this.saveAuthToken(res.headers);
                                return res.body;
                              }
                            })
                          );
                    }

        apiErrorHandler(error: any, url: any) {
          this.displayLoader(false);
          let data = error.error;
          switch(error.status) {
            case 400: {
              this.serverErrorMessage(data);
              break;
            }

            case 403: {
              this.serverErrorMessage(data);
              break;
            }
            case 404: {
              this.serverErrorMessage('Unable to connect to server. please refresh and try again');
              break;
            }
            case 500: {
              if(data.appStatusCode == 20) {
                this.serverErrorMessage(data);
              } else {
          //    this.dialogsService.errorMessage("Opps, Something went wrong!!! This problem has been reported to the System Administrator.");
              }
              break;
            }
            alert("throwError: ");
          }
        }

        forceLogout() {
          this.dataStorageService.clearStorage();
          alert("Logout");
        }

        serverErrorMessage(data: any) {
         // this.dialogsService.errorMessage(data.message[0]);
        }

}
