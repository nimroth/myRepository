import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class WebService {
    configUrl = environment.apiUrl;
 constructor(private http: HttpClient) {
 }

  getRequest<T>(urlType: string , params: HttpParams) {
    return this.http.get(this.configUrl + urlType , {params});
  }

  postRequest<T>(urlType: string , req: T, params: HttpParams): Observable<T> {
    return this.http.post<T>(this.configUrl + urlType, req , {params});
  }

  putRequest<T>(urlType: string , req: T, params: HttpParams): Observable<T> {
    return this.http.put<T>(this.configUrl + urlType , req , {params});
  }
}
