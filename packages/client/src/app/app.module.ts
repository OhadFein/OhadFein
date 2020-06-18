import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from '@app/login/login.module';
import { StudentModule } from '@app/student/student.module';
import { InfraModule } from '@infra/infra.module';
import { PracticesEffects, StarsContentEffects, StarsEffects, UserEffects } from '@infra/store/effects';
import { PracticesReducer, StarsContentReducer, StarsReducer, UserReducer } from '@infra/store/reducers';
import { AboutDanskillModalComponent, VideoPlayerModalComponent } from '@infra/ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocialLoginModule } from 'angularx-social-login';

import { APP_PROVIDERS } from './app-providers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json?ob=' + new Date().getTime());
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({ user: UserReducer, stars: StarsReducer, starsContent: StarsContentReducer, practices: PracticesReducer }),
    EffectsModule.forRoot([UserEffects, StarsEffects, StarsContentEffects, PracticesEffects]),
    SocialLoginModule,
    NgbModule,
    AppRoutingModule,
    InfraModule,
    LoginModule,
    StudentModule
  ],
  entryComponents: [
    AboutDanskillModalComponent,
    VideoPlayerModalComponent
  ],
  providers: [...APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
