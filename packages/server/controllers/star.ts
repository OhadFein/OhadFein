import { Request, Response } from "express";
import mongoose from "mongoose"
import Star, { IStar } from '../models/Star';
import { HttpException } from "../shared/exceptions";

/**
 * GET /
 * get all stars
 */

const getAllStars = async (): Promise<IStar[]> => (
    await Star.find().sort({ "figures": -1 }).exec()
);

export const getStars = async (req: Request, res: Response) => {
    const stars = await getAllStars();

    res.status(200).json({
        success: true,
        data: stars
    });
}

/**
 * GET /:starId
 * get star info
 */


export const getStarById = async (id: mongoose.Types.ObjectId): Promise<IStar | null> => (
    new Promise((resolve, reject) => {
        Star.findById(id)
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
    const starId = new mongoose.mongo.ObjectId(req.params.starId);
    const star = await getStarById(starId);
    await star?.populate("figures").execPopulate();

    res.status(200).json({
        success: true,
        data: star
    });
}