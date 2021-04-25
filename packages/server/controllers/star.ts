import { Request, Response } from "express";
import mongoose from "mongoose"
import User, { IUser } from '../models/User';
import { EnumRole } from "../shared/enums";
import { HttpException } from "../shared/exceptions";

/**
 * GET /
 * get all stars
 */

const getAllStars = async (): Promise<IUser[]> => (
    await User.find({ roles: { $in: [EnumRole.star] } })
        .select("+star")
        .sort({ "figures": -1 })
        .exec()
);

export const getStars = async (req: Request, res: Response) => {
    const stars = await getAllStars();

    res.status(200).json({
        success: true,
        data: stars
    });
}

/**
 * GET /:userName
 * get star info by username
 */

export const getStarByUsername = async (username: string): Promise<IUser | null> => (
    new Promise((resolve, reject) => {
        User.findOne({ username: username, roles: { $in: [EnumRole.star] } }).select("+figures")
            .then(star => {
                if (!star) {
                    reject(new HttpException(404, "Star not found"));
                } else {
                    resolve(star);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getStar = async (req: Request, res: Response) => {
    const star = await getStarByUsername(req.params.starUsername);
    await star?.populate("figures").execPopulate();

    res.status(200).json({
        success: true,
        data: star
    });
}