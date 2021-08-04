import { UpdateUserDto } from './../../../../../../contract/src/users/update-user.dto';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoachDto, CreateUserDto, UserDto, UserBaseDto } from '@danskill/contract';

import { INotifications, IRestResponse, User, UserRestResponse } from '../models';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  REST_URL = '';

  constructor(private baseRestService: BaseRestService) {}

  getUser(): Observable<UserDto> {
    return this.baseRestService.get<UserDto>('users/single');
  }

  getAllCoaches(): Observable<CoachDto[]> {
    return this.baseRestService.get<CoachDto[]>('users/all/coaches');
  }

  userExists(): Observable<boolean> {
    return this.baseRestService.get<boolean>('users/exists');
  }

  createNewUser(
    username: string,
    sub: string,
    firstName?: string,
    lastName?: string
  ): Observable<UserDto> {
    const createUserDto = new CreateUserDto(username, sub, firstName, lastName);

    return this.baseRestService.post<UserDto>('users', createUserDto);
  }

  updateUserDetails(firstName: string, lastName: string, coach?: string): Observable<void> {
    const updateUserDto = new UpdateUserDto(firstName, lastName, coach);

    return this.baseRestService.patch<void>('users', updateUserDto);
  }
}
