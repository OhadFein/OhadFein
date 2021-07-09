import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().populate('sourceUser performedActionUser').exec();
  }

  async markRead(user: User, id: Types.ObjectId): Promise<Notification> {
    const notifcation = await this.notificationModel.findById(id).exec();
    if (!notifcation) {
      throw new HttpException('Notifcation not found', HttpStatus.NOT_FOUND);
    }
    if (!notifcation.sourceUser.equals(user._id)) {
      throw new HttpException('Notifcation not found', HttpStatus.UNAUTHORIZED); // Invalid permissions
    }

    return notifcation;
  }
}
