import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CoachDto, CreateUserDto, UserDto, UpdateUserDto } from '@danskill/contract';

import { tap } from 'rxjs/operators';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  REST_URL = '';

  user: UserDto;

  constructor(private baseRestService: BaseRestService) {}

  getUser(): Observable<UserDto> {
    return this.user
      ? of(this.user)
      : this.baseRestService
          .get<UserDto>('users/single')
          .pipe(tap((user: UserDto) => (this.user = user)));
  }

  getAllCoaches(): Observable<CoachDto[]> {
    return this.baseRestService.get<CoachDto[]>('users/all/coaches');
  }

  userExists(): Observable<boolean> {
    return this.baseRestService.get<boolean>('users/exists');
  }

  createNewUser(
    username: string,
    email: string,
    firstName?: string,
    lastName?: string
  ): Observable<UserDto> {
    const createUserDto = new CreateUserDto(username, email, firstName, lastName);

    return this.baseRestService.post<UserDto>('users', createUserDto);
  }

  updateUserDetails(firstName: string, lastName: string, coach?: string): Observable<void> {
    const updateUserDto = new UpdateUserDto(firstName, lastName, coach);

    return this.baseRestService.patch<void>('users', updateUserDto);
  }
}
