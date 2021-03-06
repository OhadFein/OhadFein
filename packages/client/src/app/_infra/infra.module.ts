import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import {
  VgBufferingModule,
  VgControlsModule,
  VgCoreModule,
  VgOverlayPlayModule
} from 'ngx-videogular';

import { StarNameDirective } from '@core/derectives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  PageNotFoundComponent,
  PlayerControlsComponent,
  PreloaderIconComponent,
  PreloaderInappComponent,
  TagsHolderComponent,
  ToggleSwitchDirective,
  UploadPracticeBgProcessComponent,
  VideoFilePickerComponent,
  VideoPlayerModalComponent,
  VideoPlayerWrapperComponent,
  VideoPreviewComponent,
  CustomLabControlsComponent,
  SideMenuComponent,
  UserAvatarComponent,
  UpperToolbarComponent,
  BottomToolbarComponent,
  FormInputComponent,
  MainSearchBarComponent,
  StarPreviewItemComponent,
  StarPreviewGridComponent,
  FormSelectComponent,
  FormTexareaComponent,
  NotificationListGridComponent,
  NotificationListItemComponent,
  NotificationButtonComponent,
  StarAboutSectionComponent,
  HorizontalPreviewCarouselComponent,
  HorizontalCalendarComponent
} from './ui';
import { MaterialModule } from './material.module';

const components = [
  AlertsComponent,
  PageNotFoundComponent,
  NavigationComponent,
  HeaderComponent,
  AboutDanskillModalComponent,
  VideoPlayerModalComponent,
  LogoComponent,
  PreloaderIconComponent,
  PreloaderInappComponent,
  VideoPlayerWrapperComponent,
  InpageErrorComponent,
  TagsHolderComponent,
  ImageFilePickerComponent,
  VideoFilePickerComponent,
  PlayerControlsComponent,
  BackgroundProcessesComponent,
  UploadPracticeBgProcessComponent,
  BaseBgProcessComponent,
  ToggleSwitchDirective,
  VideoPreviewComponent,
  CustomLabControlsComponent,
  StarNameDirective,
  SideMenuComponent,
  UserAvatarComponent,
  UpperToolbarComponent,
  BottomToolbarComponent,
  FormInputComponent,
  MainSearchBarComponent,
  StarPreviewItemComponent,
  StarPreviewGridComponent,
  FormSelectComponent,
  FormTexareaComponent,
  NotificationListGridComponent,
  NotificationListItemComponent,
  NotificationButtonComponent,
  StarAboutSectionComponent,
  HorizontalPreviewCarouselComponent,
  HorizontalCalendarComponent
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ImageCropperModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule
  ],
  declarations: [components],
  exports: [components]
})
export class InfraModule {}
