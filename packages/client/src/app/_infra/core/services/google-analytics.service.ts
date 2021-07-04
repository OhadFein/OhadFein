import { Injectable } from '@angular/core';
import { GoogleAnalyticsEventData } from '@core/models';

declare let gtag: (...any) => void;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  public sendGAEvent(data: GoogleAnalyticsEventData): void {
    const { eventName, eventCategory, eventLabel } = data;
    const eventAction = data.eventAction ? data.eventAction : null;
    const eventValue = data.eventValue ? data.eventValue : null;

    gtag('event', eventName, {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue
    });
  }
}
