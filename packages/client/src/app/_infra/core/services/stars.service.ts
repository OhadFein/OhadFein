import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StarDto } from '@danskill/contract';

import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  constructor(private baseRestService: BaseRestService) {}

  getStars(): Observable<StarDto[]> {
    return this.baseRestService.get<StarDto[]>('users/all/stars');
  }
}
