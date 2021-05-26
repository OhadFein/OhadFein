import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFigure, SingleFigureRestResponse } from '../models';
import { BaseRestService } from './base-rest.service';

@Injectable({
  providedIn: 'root'
})
export class FiguresService {

  constructor(private baseRestService: BaseRestService) {}

  getFigure(figureId): Observable<IFigure> {
	return this.baseRestService.get<SingleFigureRestResponse>(`figures/${figureId}`)
	  .pipe(
		map((response) => {
		  return response.data ? response.data : null;
		})
	  );
  }
}

