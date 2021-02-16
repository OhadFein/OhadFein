import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BackgroundProcess, BackgroundProcessType, CreatePracticeData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackgroundProcessesService {

  private subject = new Subject<BackgroundProcess>();

  constructor() { }

  // enable subscribing to processes observable
  onBackgroundProcess(processtId?: string): Observable<BackgroundProcess> {
    return this.subject.asObservable();
  }

  // convenience methods
  uploadPractice(data: CreatePracticeData, processtId?: string) {
    this.startBackgroundProcess(new BackgroundProcess({ type: BackgroundProcessType.UPLOAD_PRACTICE, processtId, data }));
  }

  // main process method
  startBackgroundProcess(process: BackgroundProcess) {
    this.subject.next(process);
  }

  // clear processes
  clear(processtId?: string) {
    this.subject.next(new BackgroundProcess({ processtId }));
  }

}
