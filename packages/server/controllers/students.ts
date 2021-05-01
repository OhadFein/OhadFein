import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import mongoose from "mongoose"


const getAllStudents = async (id: mongoose.Types.ObjectId): Promise<IUser> => (
    await User.findById(id)
        .select("+students +notifications")
        .populate({
            path: 'students',
            model: 'User',
        })
        .populate({
            path: 'notifications',
            model: 'Notification',
        })
        .lean() // TODO:
        .exec() as IUser
);

// TODO: return value
const coachAndStudents = (userAndStudentsAndNotifications: IUser) => {
    const students = userAndStudentsAndNotifications.students;
    const notifications = userAndStudentsAndNotifications.notifications;

    students.forEach(student => {
        student.notifications = []; // TODO:
        notifications.forEach(notification => {
            if (notification.sourceUser.equals(student._id) && notification.isRead == false) {
                student.notifications.push(notification);
            }
        });
    });

    return students;
}

export const getStudents = async (req: Request, res: Response) => {
    const coachAndStudentsAndNotifications = await getAllStudents(req.user._id)
    const students = coachAndStudents(coachAndStudentsAndNotifications);

    res.status(201).json({
        success: true,
        data: students
    });
}