import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StarDto } from '@danskill/contract';
import { IStarContent, IRestResponse } from '@core/models';

import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  constructor(private baseRestService: BaseRestService) {}

  getStarContent(starId: string): Observable<IStarContent> {
    return this.baseRestService
      .get<IRestResponse>(`stars/${starId}`)
      .pipe(map((response) => response.data ?? []));
  }

  getStars(): Observable<StarDto[]> {
    return this.baseRestService.get<StarDto[]>('users/all/stars');
  }
}
