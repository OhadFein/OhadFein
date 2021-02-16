import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseRestService} from '@core/services/base-rest.service';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {CreatePracticeData, Practice, PracticeItemsRestResponse, UpdatePracticeItemsRestResponse} from '../models';

@Injectable({
    providedIn: 'root'
})
export class PracticesService {


    constructor(private baseRestService: BaseRestService) {
    }

    getPractices(): Observable<Practice[]> {
        return this.baseRestService.get<PracticeItemsRestResponse>('account/practices/all').pipe(map(res => {
            return res.data ? res.data : [];
        }));
    }

    uploadPractice(data: any): Observable<any> {
        const httpHeadersObj = new HttpHeaders()
            .set('Accept', 'application/json')
            .set('Cache-Control', 'no-cache')
            .set('Pragma', 'no-cache');

        return this.baseRestService.post('account/practices', data, httpHeadersObj, true);
    }

    updatePractice(practice: Practice): Observable<Practice> {
        return this.baseRestService.patch<UpdatePracticeItemsRestResponse>(`account/practices/${practice._id}`, {name: practice.name, notes: practice.notes}).pipe(
            map(
                res => {
                    if (res.success) {
                        return res.data;
                    } else {
                        throwError([res.message]); // TODO: add real error here
                    }
                },
                error => {
                    throwError(['ERRORS.GeneralBackendError']);
                }
            )
        )
    }


}
