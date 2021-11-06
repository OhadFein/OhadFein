import { Injectable } from '@angular/core';
import { BaseRestService } from '@core/services/base-rest.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PracticeBaseDto, PracticeDto } from '@danskill/contract';
import { Practice, UpdatePracticeItemsRestResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {
  constructor(private baseRestService: BaseRestService) {}

  getPractices(slug: string): Observable<PracticeDto[]> {
    return this.baseRestService.get(`practices/all/${slug}`);
  }

  getPractice(practiceId: string): Observable<PracticeDto> {
    return this.baseRestService.get<PracticeDto>(`practices/single/${practiceId}`);
  }

  uploadPractice(figureId: string, videoFile: File): Observable<PracticeBaseDto> {
    // const httpHeadersObj = new HttpHeaders()
    //   .set('Accept', 'application/json')
    //   .set('Cache-Control', 'no-cache')
    //   .set('Pragma', 'no-cache');

    return this.baseRestService.post<PracticeBaseDto>(`practices/${figureId}`, videoFile);
  }

  updatePractice(practice: Practice): Observable<Practice> {
    return this.baseRestService
      .patch<UpdatePracticeItemsRestResponse>(`account/practices/${practice._id}`, {
        name: practice.name,
        notes: practice.notes
      })
      .pipe(
        map(
          (res) => {
            if (res.success) {
              return res.data;
            }
            throwError([res.message]); // TODO: add real error here
          },
          () => {
            throwError(['ERRORS.GeneralBackendError']); // TODO.sverkunov. throw error message
          }
        )
      );
  }
}
