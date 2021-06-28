import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthTokens } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {}

  storeTokens(tokens: AuthTokens) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('expired_at', tokens.expired_at);
  }

  getStoredAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  checkStoredAccessToken(): boolean {
    const exists = localStorage.getItem('access_token') !== null;

    return exists;
  }

  getStoredRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  checkStoredRefreshToken(): boolean {
    const exists = localStorage.getItem('refresh_token') !== null;

    return exists;
  }

  deleteStoredTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expired_at');
  }

  addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.getStoredAccessToken();
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request;
  }
}
