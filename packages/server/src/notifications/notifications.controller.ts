import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { Types } from 'mongoose';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from '../../../contract/src/notifications/notification.dto';
import { Notification } from './schemas/notification.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(NotificationDto))
  findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Post('/markRead/:id')
  async markRead(@RequestUser() user: User, @Param('id') id: Types.ObjectId): Promise<void> {
    await this.notificationsService.markRead(user, id);
  }
}
