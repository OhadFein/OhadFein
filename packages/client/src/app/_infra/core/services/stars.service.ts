import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser, StarsRestResponse, IStarContent, IRestResponse } from '../models';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  constructor(private baseRestService: BaseRestService) { }

  getStarContent(starId): Observable<IStarContent> {
    return this.baseRestService.get<IRestResponse>(`stars/${starId}`)
      .pipe(
        map((response) => {
          return response.data ? response.data : [];
        })
      );
  }

  getStars(): Observable<IUser[]> {
    return this.baseRestService.get<StarsRestResponse>('stars').pipe(map(res => {
      return res.data ? res.data : [];
    }));
  }

  

}
