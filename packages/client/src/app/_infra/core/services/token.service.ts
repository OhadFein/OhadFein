import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthTokens } from '../models';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeTokens(tokens: AuthTokens) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('expired_at', tokens.expired_at);
  }

  getStoredAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  async checkStoredAccessToken(): Promise<boolean> {
    return await this.getCurrentJwtToken() !== null
  }

  async getCurrentJwtToken(): Promise<string> {
    const token = await Auth.currentSession().then(session => { return session.getIdToken() }).catch(error => { return null });
    return token ? token.getJwtToken() : null
  }

  deleteStoredTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expired_at');
  }

  async addToken(request: HttpRequest<any>): Promise<HttpRequest<any>> {
    const jwt_token = await this.getCurrentJwtToken()

    if (jwt_token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt_token}`
        }
      });
    } else {
      return request;
    }
  }

}
