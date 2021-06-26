import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Configuration } from '../models';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private config: Configuration;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  load(url: string) {
    return new Promise((resolve) => {
      this.httpClient.get<Configuration>(url).subscribe((result) => {
        this.config = result;
        resolve();
      });
    });
  }

  getConfiguration(): Configuration {
    return this.config;
  }

  getRestApiURL(): string {
    return this.config.restURL;
  }

  getAboutVideoURL(): string {
    return this.config.aboutVideoURL;
  }

  getVersionString(): string {
    return `${this.config.buildType}:${this.config.majorVersion}.${this.config.minorVersion}.${this.config.buildVersion}`;
  }

  getGlobalHttpHeaders(): HttpHeaders {
    const storedToken = this.tokenService.getStoredAccessToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .set('Authorization', `Bearer${storedToken}`);

    return headers;
  }
}
