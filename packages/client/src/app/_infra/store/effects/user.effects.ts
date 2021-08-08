import { Injectable } from '@angular/core';
import { UserService } from '@infra/core/services';

@Injectable()
export class UserEffects {
  constructor(private userService: UserService) {}
}
