import { InjectionToken } from '@angular/core';

export const DSAPP_WINDOW = new InjectionToken<Window>('DSAPP_WINDOW');

export function windowFactory(): Window {
  return window;
}
