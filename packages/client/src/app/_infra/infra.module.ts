import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDateStructTodateDirective, StarNameDirective } from '@core/directives';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { VgBufferingModule } from 'ngx-videogular';
import { VgControlsModule } from 'ngx-videogular';
import { VgCoreModule } from 'ngx-videogular';
import { VgOverlayPlayModule } from 'ngx-videogular';

import { BaseBgProcessComponent } from './core/models';
import {
  AboutDanskillModalComponent,
  AlertsComponent,
  BackgroundProcessesComponent,
  HeaderComponent,
  ImageFilePickerComponent,
  InpageErrorComponent,
  LogoComponent,
  NavigationComponent,
  NotificationsPageComponent,
  PageNotFoundComponent,
  PlayerControlsComponent,
  PlayerSpeedControlsComponent,
  PreloaderIconComponent,
  PreloaderInappComponent,
  TagsHolderComponent,
  ToggleSwitchDirective,
  UploadPracticeBgProcessComponent,
  VideoFilePickerComponent,
  VideoPlayerModalComponent,
  VideoPlayerWrapperComponent,
  VideoPreviewComponent,
  CustomLabControlsComponent
} from './ui';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ImageCropperModule
  ],
  declarations: [
    AlertsComponent, PageNotFoundComponent, NotificationsPageComponent,
    NavigationComponent, HeaderComponent, AboutDanskillModalComponent, VideoPlayerModalComponent,
    LogoComponent, PreloaderIconComponent, PreloaderInappComponent,
    VideoPlayerWrapperComponent, StarNameDirective, NgbDateStructTodateDirective, InpageErrorComponent,
    TagsHolderComponent, ImageFilePickerComponent, VideoFilePickerComponent, PlayerSpeedControlsComponent,
    PlayerControlsComponent, BackgroundProcessesComponent, UploadPracticeBgProcessComponent, BaseBgProcessComponent,
    ToggleSwitchDirective, VideoPreviewComponent, CustomLabControlsComponent
  ],
  exports: [
    AlertsComponent, PageNotFoundComponent, NotificationsPageComponent,
    NavigationComponent, HeaderComponent, AboutDanskillModalComponent, VideoPlayerModalComponent,
    LogoComponent, PreloaderIconComponent, PreloaderInappComponent,
    VideoPlayerWrapperComponent, StarNameDirective, NgbDateStructTodateDirective, InpageErrorComponent,
    TagsHolderComponent, ImageFilePickerComponent, VideoFilePickerComponent, PlayerSpeedControlsComponent,
    PlayerControlsComponent, BackgroundProcessesComponent, UploadPracticeBgProcessComponent,
    ToggleSwitchDirective, VideoPreviewComponent, CustomLabControlsComponent
  ]
})
export class InfraModule { }
