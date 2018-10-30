import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) {}

  get(url: string, endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (Object.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this.http.get(url + '/' + endpoint, reqOpts);
  }

  post(url: string, endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.post(url + '/' + endpoint, body, reqOpts);
  }

  put(url: string, endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.put(url + '/' + endpoint, body, reqOpts);
  }

  delete(url: string, endpoint: string, reqOpts?: any): Observable<any> {
    return this.http.delete(url + '/' + endpoint, reqOpts);
  }

  patch(url: string, endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.patch(url + '/' + endpoint, body, reqOpts);
  }
}
