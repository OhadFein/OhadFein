import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FigureBaseDto, FigureDto, FigureVideoDto, StarDto } from '@danskill/contract';

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

  getAllStarFigures(slug: string): Observable<FigureBaseDto[]> {
    return this.baseRestService.get<FigureBaseDto[]>(`figures/all`);
  }

  getPracticesByType(slug: string, type: string): Observable<FigureBaseDto[]> {
    return this.baseRestService.get<FigureBaseDto[]>(`figures/all/${slug}/${type}`);
  }

  getFigureById(figureId: string): Observable<FigureDto> {
    return this.baseRestService.get(`figures/single/${figureId}`);
  }

  getFigureVideoById(figureVideoId: string): Observable<FigureVideoDto> {
    return this.baseRestService.get(`figure-video/${figureVideoId}`);
  }
}
