import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { EnumRole } from "../shared/enums";

export const checkCoachPermissions = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.user._id, roles: { $in: [EnumRole.coach] } })
        .exec();
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid permissions!' });
    }

    req.user = user;

    next();
};

export const checkAdminPermissions = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.user._id, roles: { $in: [EnumRole.admin] } })
        .exec();
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid permissions!' });
    }

    req.user = user;

    next();
};