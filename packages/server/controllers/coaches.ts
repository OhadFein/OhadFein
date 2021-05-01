import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { EnumRole } from '../shared/enums';

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