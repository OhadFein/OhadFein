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
    return this.notificationModel
      .find({ receivers: { $in: [user._id] } })
      .populate('senders')
      .exec();
  }

  async markRead(user: User, id: Types.ObjectId): Promise<Notification> {
    const notification = await this.notificationModel.findById(id).exec();
    if (!notification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }

    const isNotificationForCurrentUser = notification.receivers.find((receiver) =>
      receiver.equals(user._id)
    );
    if (!isNotificationForCurrentUser) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }

    const isAlreadyRead = notification.readBy.find((readBy) => readBy.readerId.equals(user._id));
    if (!isAlreadyRead) {
      notification.readBy.push({
        readerId: user._id,
        readAt: new Date()
      });
    }

    await notification.save();

    return notification;
  }

  async build(
    sendersIds: Types.ObjectId[],
    receiversIds: Types.ObjectId[],
    type: EnumNotificationType,
    notificationLinkedModel: EnumNotificationLinkedModel,
    linkedId: Types.ObjectId
  ): Promise<NotificationDocument> {
    const createdNotification = new this.notificationModel({
      senders: sendersIds,
      receivers: receiversIds,
      linkedId,
      type,
      notificationLinkedModel
    });

    return createdNotification;
  }
}
