import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Configuration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private config: Configuration;
  constructor(private httpClient: HttpClient) { }

  load(url: string) {
    return new Promise((resolve) => {
      this.httpClient.get<Configuration>(url).subscribe((result) => {
        this.config = result;
        resolve();
      });
    });
  }

  getConfiguration(): Configuration { return this.config; }

  getRestApiURL(): string { return this.config.restURL; }

  getAboutVideoURL(): string { return this.config.aboutVideoURL; }

  getVersionString(): string {
    const version = `${this.config.buildType}:${this.config.majorVersion}.${this.config.minorVersion}.${this.config.buildVersion}`
    return version;
  }

  getGlobalHttpHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');
    return headers;
  }

}





