import { INotification } from './../models/Notification';
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
    const students = userAndStudentsAndNotifications.students as unknown as IUser[]; // TODO:
    const notifications = userAndStudentsAndNotifications.notifications as unknown as INotification[]; // TODO:

    students.forEach(student => {
        student.notifications = [] as any; // TODO:
        notifications.forEach(notification => {
            if (notification.sourceUser.equals(student._id) && notification.isRead == false) {
                student.notifications.push(notification._id);
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



const getAllStudentPractices = async (studentId: mongoose.Types.ObjectId): Promise<IUser> => (
    // TODO: check If I'm his coach

    await User.findById(studentId)
        .populate({
            path: 'practices',
            populate: {
                path: 'star video',
                populate: {
                    model: 'Video',
                    path: 'associatedObject',
                    populate: {
                        model: 'Figure',
                        path: 'associatedObject',
                    }
                }
            }
        })
        .exec() as IUser
);

export const getStudentPractices = async (req: Request, res: Response) => {
    const studentId = new mongoose.mongo.ObjectId(req.params.studentId);
    const student = await getAllStudentPractices(studentId)
    console.log(student);
    if (!student?.coach?._id.equals(req.user._id)) {
        return res.status(401).json({ success: false, message: 'User not found!' }); // Invalid permissions
    }


    res.status(201).json({
        success: true,
        data: student
    });
}