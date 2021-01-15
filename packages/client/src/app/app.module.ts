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
import { FiguresEffects, PracticesEffects, StarsContentEffects, StarsEffects, UserEffects } from './_infra/store/effects';
import { APP_PROVIDERS } from './app-providers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json?ob=' + new Date().getTime());
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SwiperModule,
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
      figures: FiguresReducer
    }, { metaReducers: [GlobalReducer] }),
    EffectsModule.forRoot([UserEffects, StarsEffects, StarsContentEffects, PracticesEffects, FiguresEffects]),
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
