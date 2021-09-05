import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FigureBaseDto, StarDto } from '@danskill/contract';

import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {
  constructor(private baseRestService: BaseRestService) {}

  getStars(): Observable<StarDto[]> {
    return this.baseRestService.get<StarDto[]>('users/all/stars');
  }

  getStarBySlug(slug: string): Observable<StarDto> {
    return this.baseRestService.get<StarDto>(`users/single/star/${slug}`);
  }

  getPracticesByType(slug: string, type: string): Observable<FigureBaseDto[]> {
    return this.baseRestService.get<FigureBaseDto[]>(`figures/all/${slug}/${type}`);
  }
}
