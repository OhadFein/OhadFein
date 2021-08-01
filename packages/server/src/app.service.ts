import { MainInfoDto } from '@danskill/contract';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users/schemas/user.schema';
import { UsersService } from './users/users.service';
import { Notification } from './notifications/schemas/notification.schema';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  async getMainInfo(user: UserDocument): Promise<MainInfoDto> {
    // TODO: fix this ugly function
    const mainInfo = new MainInfoDto();
    const userWithNotifications = await user.populate('notifications').execPopulate();

    mainInfo.roles = user.roles;
    mainInfo.notifications = ((user.notifications as unknown) as Notification[]).map(
      (notification) => notification._id
    );
    mainInfo.unreadNotificationsCounter = ((userWithNotifications.notifications as unknown) as Notification[]).filter(
      (notification) => !notification.readBy.find((readBy) => readBy.readerId.equals(user._id))
    ).length;

    return mainInfo;
  }
}
