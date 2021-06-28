import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { ErrorInterceptor, JwtInterceptor } from '@core/interceptors';
import { ConfigurationService } from '@core/services/configuration.service';
import { environment } from '@environments/environment';
import { AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { DSAPP_WINDOW, windowFactory } from '@core/global_variables/token';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookAppID)
  }
]);

export function provideConfig() {
  return config;
}

export function ConfigLoader(configService: ConfigurationService) {
  return () => configService.load(environment.configFile);
}

export const APP_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: ConfigLoader,
    deps: [ConfigurationService],
    multi: true
  },
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: DSAPP_WINDOW, useFactory: windowFactory }
];
