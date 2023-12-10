import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(reqParam: Partial<RequestParamters>){    
    return `${reqParam.baseUrl ? reqParam.baseUrl : this.baseUrl}/${reqParam.controller}${reqParam.action ? `/${reqParam.action}` : ""}`;
  }

  get<T>(reqParam: Partial<RequestParamters>, id?: string): Observable<T>{
    let url: string = "";
    
    if(reqParam.fullEndPoint)
      url = reqParam.fullEndPoint;
    else      
      url = `${this.url(reqParam)}${id ? `/${id}` : ""}${reqParam.queryString ? `?${reqParam.queryString}` : ""}`;
    
    return this.httpClient.get<T>(url, {headers: reqParam.headers});
  }
  
  post<T>(reqParam: Partial<RequestParamters>, body: Partial<T>): Observable<T>{
    let url: string = "";

    if(reqParam.fullEndPoint)
      url = reqParam.fullEndPoint;
    else
      url = `${this.url(reqParam)}${reqParam.queryString ? `?${reqParam.queryString}` : ""}`;

    return this.httpClient.post<T>(url, body, {headers: reqParam.headers});
  }

  put<T>(reqParam: Partial<RequestParamters>, body: Partial<T>): Observable<T>{
    let url: string = "";

    if(reqParam.fullEndPoint)
      url = reqParam.fullEndPoint;
    else
      url = `${this.url(reqParam)}${reqParam.queryString ? `?${reqParam.queryString}` : ""}`;

    return this.httpClient.put<T>(url, body, {headers: reqParam.headers});
  }

  delete(reqParam: Partial<RequestParamters>, id: string){
    let url: string = "";
    if(reqParam.fullEndPoint)
      url = reqParam.fullEndPoint;
    else
      url = `${this.url(reqParam)}/${id}${reqParam.queryString ? `?${reqParam.queryString}` : ""}`;

  return this.httpClient.delete(url, {headers: reqParam.headers});
  }
}

export class RequestParamters{
  controller?: string;
  action?: string;
  queryString?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}