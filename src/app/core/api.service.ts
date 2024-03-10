import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }
  BASE_URL = 'https://fronttest.wabcgroup.com';

  get<T>(url: string, options: any = {}): Observable<T>{
    return this.httpClient.get<T>(url,options) as Observable<T>
  }

  post<T>(url: string, body: any, options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}): Observable<T>{
    return this.httpClient.post<T>(url, body, options) as Observable<T>
  }
  
  delete<T>(url: string, options: any = {}): Observable<T>{
    return this.httpClient.delete<T>(url, options) as Observable<T>
  }
}