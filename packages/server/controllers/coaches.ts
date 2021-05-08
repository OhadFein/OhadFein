import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { EnumRole } from '../shared/enums';
import HttpException from '../shared/exceptions';


/**
 * GET /
 * get all coaches
 */


const getAllCoaches = async (): Promise<IUser[]> => (
    await User.find({ roles: { $in: [EnumRole.coach] } })
        .exec()
);

export const getCoaches = async (req: Request, res: Response) => {
    const coaches = await getAllCoaches();

    res.status(201).json({
        success: true,
        data: coaches
    });
}


/**
 * POST /
 * set new coach for a studnet
 */

const getCoach = async (coachUsername: string): Promise<IUser> => (
    new Promise((resolve, reject) => {
        User.findOne({ username: coachUsername })
            .exec()
            .then(coach => {
                if (!coach) {
                    reject(new HttpException(404, "Coach not found"));
                } else {
                    resolve(coach);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const setCoach = async (req: Request, res: Response) => {
    const coach = await getCoach(req.params.coachUsername);
    const user = req.user;

    user.coach = coach._id; // TODO:
    await user.save();

    res.status(201).json({
        success: true,
    });
}

