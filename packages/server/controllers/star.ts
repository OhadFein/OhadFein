import { Request, Response, NextFunction } from "express";
import Star, { IStar } from '../models/Star';

/**
 * GET /
 * get all stars
 */

const getAllStars = async (): Promise<IStar[]> => (
    await Star.find().exec()
);

export const getStars = async (req: Request, res: Response, next: NextFunction) => {
    const stars = await getAllStars();
    return res.json({
        stars: stars
    });
}

/**
 * GET /:starId
 * get star info
 */


const getStarInfo = async (id: string): Promise<IStar | null> => (
    new Promise((resolve, reject) => {
        Star.findById(id)
        .populate("figures", "type -_id")
            .exec()
            .then(star => {
                if (!star) {
                    reject(new Error("Star not found"));
                } else {
                    resolve(star);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getStar = async (req: Request, res: Response, next: NextFunction) => {
    const star = await getStarInfo(req.params.starId);

    return res.json({
        success: true,
        data: star
    });
}