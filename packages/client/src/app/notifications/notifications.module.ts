import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsLayoutComponent } from './notifications-layout/notifications-layout.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    InfraModule,
    FormsModule,
    SharedModule,
    NotificationsRoutingModule
  ],
  declarations: [NotificationsPageComponent, NotificationsLayoutComponent]
})
export class NotificationsModule {}
