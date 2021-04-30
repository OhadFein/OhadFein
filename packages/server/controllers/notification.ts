import { NextFunction, Request, Response } from 'express';

import User, { IUser } from "../models/User";
import Notifcation from "../models/Notification"

export const getAllNotifications = async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id)
        .select("+notifications")
        .populate({
            path: 'notifications',
            model: 'Notification',
            populate: {
                model: 'User',
                path: 'performedActionUser',
                select: "username"
            }
        })
        .exec() as IUser;

    return res.status(200).json({
        success: true,
        data: user.notifications
    });
};


export const markNotificationAsRead = async (req: Request, res: Response) => {
    const notifcation = await Notifcation.findById(req.params.notificationId).exec()
    if (!notifcation) {
        return res.status(404).json({ success: false, message: 'Notifcation not found' });
    }
    if (!notifcation.sourceUser.equals(req.user._id)) {
        return res.status(401).json({ success: false, message: 'Notifcation not found!' }); // Invalid permissions
    }

    return res.status(200).json({
        success: true,
        data: notifcation
    });
};
