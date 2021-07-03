import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BuildType, Configuration } from '../models';
import { TokenService } from './token.service';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private config: Configuration;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  load(url: string): Promise<void>{
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

  getBuildType(): BuildType { return this.config.buildType; }

  getVersionString(): string {
    const version = `${this.config.buildType}:${this.config.majorVersion}.${this.config.minorVersion}.${this.config.buildVersion}`
    return version;
  }

}





