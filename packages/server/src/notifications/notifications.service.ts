import { EnumNotificationType } from '@danskill/contract';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EnumNotificationLinkedModel } from 'src/common/enums/notification-linked-model.enum';
import { User } from 'src/users/schemas/user.schema';

import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>
  ) {}

  async findAll(user: User): Promise<Notification[]> {
    return this.notificationModel.find().populate('senders').exec();
  }

  async markRead(user: User, id: Types.ObjectId): Promise<Notification> {
    const notifcation = await this.notificationModel.findById(id).exec();
    if (!notifcation) {
      throw new HttpException('Notifcation not found', HttpStatus.NOT_FOUND);
    }
    // TODO: fix this
    // if (!notifcation.sourceUser.equals(user._id)) {
    //   throw new HttpException('Notifcation not found', HttpStatus.UNAUTHORIZED); // Invalid permissions
    // }

    return notifcation;
  }

  async build(
    sendersIds: Types.ObjectId[],
    receiversUsers: User[],
    type: EnumNotificationType,
    notificationLinkedModel: EnumNotificationLinkedModel,
    linkedId: Types.ObjectId
  ): Promise<NotificationDocument> {
    const createdNotifcation = new this.notificationModel({
      senders: sendersIds,
      receivers: receiversUsers.map((receiversUser: User) => receiversUser._id),
      linkedId,
      type,
      notificationLinkedModel,
    });

    return createdNotifcation;
  }
}
