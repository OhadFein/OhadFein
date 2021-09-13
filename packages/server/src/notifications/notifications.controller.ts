import { Controller, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
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
  async findAll(@RequestUser() user: User): Promise<Notification[]> {
    const notifications = await this.notificationsService.findAll(user);

    /* eslint-disable no-param-reassign */
    notifications.forEach((notification) => {
      const found = notification.readBy.find((readBy) => readBy.readerId.equals(user._id));

      notification.isRead = !!found;
      if (found) notification.readAt = found.readAt;

      // readBy array shouldn't be exposed to FE (because it contains the IDs of all users)
      notification.readBy = null;
    });
    /* eslint-enable no-param-reassign */

    return notifications;
  }

  @Post('/markRead/:id')
  @HttpCode(200)
  async markRead(@RequestUser() user: User, @Param('id') id: Types.ObjectId): Promise<void> {
    await this.notificationsService.markRead(user, id);
  }
}
