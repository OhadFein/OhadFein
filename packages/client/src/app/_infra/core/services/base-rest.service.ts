import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class BaseRestService {
  REST_URL = '';

  HTTP_HEADERS = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache')
    .set('Pragma', 'no-cache');

  constructor(
    private http: HttpClient,
    private configService: ConfigurationService
  ) {}

  get<T>(endpoint: string, httpHeadersObj?: HttpHeaders): Observable<T> {
    this.getRestUrl();
    const headersObj: HttpHeaders = httpHeadersObj
      ? httpHeadersObj
      : this.HTTP_HEADERS;
    const options = { headers: headersObj, method: 'GET' };

    return this.http.get<T>(`${this.REST_URL}/${endpoint}`, options);
  }

  post<T>(
    endpoint: string,
    body: any,
    httpHeadersObj?: HttpHeaders,
    reportProgress = false
  ): Observable<T> {
    this.getRestUrl();
    const headersObj: HttpHeaders = httpHeadersObj
      ? httpHeadersObj
      : this.HTTP_HEADERS;
    let options = { headers: headersObj, method: 'POST', reportProgress };
    if (reportProgress) {
      options = { ...options, ...{ observe: 'events' } };
    }

    return this.http.post<T>(`${this.REST_URL}/${endpoint}`, body, options);
  }

  patch<T>(
    endpoint: string,
    body: any,
    httpHeadersObj?: HttpHeaders
  ): Observable<T> {
    this.getRestUrl();
    const headersObj: HttpHeaders = httpHeadersObj
      ? httpHeadersObj
      : this.HTTP_HEADERS;
    const options = { headers: headersObj, method: 'PATCH' };

    return this.http.patch<T>(`${this.REST_URL}/${endpoint}`, body, options);
  }

  getRestUrl() {
    const url: string = this.configService.getRestApiURL();
    if (url) {
      this.REST_URL = url;
    }
  }
}
