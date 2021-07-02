import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginModule } from '@app/login/login.module';
import { StudentModule } from '@app/student/student.module';
import { InfraModule } from '@infra/infra.module';
import {
  FiguresReducer,
  GlobalReducer,
  LabReducer,
  PracticesReducer,
  StarsContentReducer,
  StarsReducer,
  UserReducer,
  NotificationsReducer
} from '@infra/store/reducers';
import { AboutDanskillModalComponent, VideoPlayerModalComponent } from '@infra/ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocialLoginModule } from 'angularx-social-login';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { environment } from '../environments/environment';
import { FiguresEffects, PracticesEffects, StarsContentEffects, StarsEffects, UserEffects, NotificationsEffects } from './_infra/store/effects';
import { APP_PROVIDERS } from './app-providers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Amplify from 'aws-amplify';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json?ob=' + new Date().getTime());
}

Amplify.configure({
  Auth: {

      // REQUIRED - Amazon Cognito Region
      region: 'eu-west-1',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'eu-west-1_Xb86k2ih2',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '6i8231msqr1lrmj3pf2qjfa102',

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: true,

      // OPTIONAL - customized storage object
      storage: localStorage,

      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_PASSWORD_AUTH',

      // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
      clientMetadata: { myCustomKey: 'myCustomValue' },

      // OPTIONAL - Hosted UI configuration
      oauth: {
          domain: 'danskill.auth.eu-west-1.amazoncognito.com',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn: 'http://localhost:4200/student',
          redirectSignOut: 'http://localhost:4200/',
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
  }
});


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({
      user: UserReducer,
      stars: StarsReducer,
      starsContent: StarsContentReducer,
      practices: PracticesReducer,
      labItem: LabReducer,
      figures: FiguresReducer,
      notifications: NotificationsReducer
    }, { metaReducers: [GlobalReducer] }),
    EffectsModule.forRoot([UserEffects, StarsEffects, StarsContentEffects, PracticesEffects, FiguresEffects, NotificationsEffects]),
    HammerModule,
    SocialLoginModule,
    NgbModule,
    DeviceDetectorModule,
    AppRoutingModule,
    InfraModule,
    LoginModule,
    StudentModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false })
  ],
  entryComponents: [
    AboutDanskillModalComponent,
    VideoPlayerModalComponent
  ],
  providers: [...APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
