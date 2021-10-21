import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthTokens } from '../models';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  setUser(slug: string): void {
    localStorage.setItem('user_slug', slug);
  }
  storeTokens(tokens: AuthTokens) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('expired_at', tokens.expired_at);
  }

  getStoredAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  checkStoredAccessToken(): boolean {
    return localStorage.getItem('user_slug') !== null;
  }

  async getCurrentJwtToken(): Promise<string> {
    const token = await Auth.currentSession()
      .then((session) => {
        return session.getIdToken();
      })
      .catch((error) => {
        return null;
      });

    return token ? token.getJwtToken() : null;
  }

  async deleteStoredTokens() {
    localStorage.removeItem('user_slug');
    await Auth.signOut()
      .then((m) => console.log('Logged out'))
      .catch((error) => {
        console.log('Error while logging out');
        console.log(error);
      });
  }

  async addToken(request: HttpRequest<any>): Promise<HttpRequest<any>> {
    const jwt_token = await this.getCurrentJwtToken();

    if (jwt_token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt_token}`
        }
      });
    }

    return request;
  }
}
