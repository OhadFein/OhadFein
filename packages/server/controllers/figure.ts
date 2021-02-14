import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Figure, { IFigure } from '../models/Figure';
import { EnumDanceLevel, EnumDanceType } from '../shared/enums';
import HttpException from '../shared/exceptions';
import { getStarById, getStarBySlug } from './star';

const getFigureById = async (figureId: mongoose.Types.ObjectId): Promise<IFigure> => (
    new Promise((resolve, reject) => {
        Figure.findById(figureId)
            .populate("videos")
            .exec()
            .then(figure => {
                if (!figure) {
                    reject(new HttpException(404, "Figure not found"));
                } else {
                    resolve(figure);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getFigure = async (req: Request, res: Response) => {
    const figureId = new mongoose.mongo.ObjectId(req.params.figureId);
    const figure = await getFigureById(figureId);

    res.status(200).json({
        success: true,
        data: figure
    });
}

export const getFigures = async (req: Request, res: Response) => {
    // TODO: req.query.danceType and req.query.level
    // const typedLevelString = req.query.level as keyof typeof EnumDanceLevel;
    // const typedTypeString = req.query.danceType as keyof typeof EnumDanceType;

    const starSlug = req.params.starSlug;
    const star = await getStarBySlug(starSlug);
    await star?.populate("figures").execPopulate();
    const figures = star?.figures as unknown as IFigure[]; // TODO:
    // const filteredFigures = figures.filter((figure) =>
    //     (figure.type == EnumDanceType[typedTypeString]) && (figure.level == EnumDanceLevel[typedLevelString]));

    res.status(200).json({
        success: true,
        data: figures
    });
}
