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
    const token = await Auth.currentSession()
    return token.getAccessToken() !== null
  }

  deleteStoredTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expired_at');
  }

  async addToken(request: HttpRequest<any>): Promise<HttpRequest<any>> {
    const token = await Auth.currentSession();
    const id_token = token.getIdToken()

    if (id_token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${id_token.getJwtToken()}`
        }
      });
    } else {
      return request;
    }
  }

}
