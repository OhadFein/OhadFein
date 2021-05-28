import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Figure, { IFigure } from '../models/Figure';
import HttpException from '../shared/exceptions';
import { getStarByUsername } from './star';

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
    const star = await getStarByUsername(req.params.starUsername);
    await star?.populate("star.figures").execPopulate();
    const figures = star?.star.figures as unknown as IFigure[]; // TODO:

    res.status(200).json({
        success: true,
        data: figures
    });
}
