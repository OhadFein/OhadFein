import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { INotifications, IRestResponse, User, UserRestResponse } from '../models';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  REST_URL = '';

  constructor(private baseRestService: BaseRestService) {}

  getUser(): Observable<User> {
    return this.baseRestService.get<UserRestResponse>('account/profile').pipe(
      map(
        (res) => {
          if (res.success) {
            return res.data;
          }
          throwError([res.message]); // TODO: add real error here
        },
        () => {
          throwError(['ERRORS.GeneralBackendError']); //TODO: sverkunov.
        }
      )
    );
  }

  getGeneralInfo(): Observable<INotifications[]> {
    return this.baseRestService.get<IRestResponse>('').pipe(
      map(
        (res) => {
          if (res.success) {
            return res.data;
          }
          throwError([res.message]); // TODO: add real error here
        },
        () => {
          throwError(['ERRORS.GeneralBackendError']);
        }
      )
    );
  }

  updateUser(user: User): Observable<User> {
    return this.baseRestService.patch<UserRestResponse>('account/profile', user.profile).pipe(
      map(
        (res) => {
          if (res.success) {
            return user;
          }
          throwError([res.message]); // TODO: add real error here
        },
        () => {
          throwError(['ERRORS.GeneralBackendError']);
        }
      )
    );
  }
}
