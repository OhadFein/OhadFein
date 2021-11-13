import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject = new Subject<boolean>();

  public isLoading = this.isLoadingSubject.asObservable();

  setIsLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }
}
