import mongoose from 'mongoose';
import User, { IUser } from './../models/User';
import { Request, Response } from 'express';
import { EnumAssociateModel, EnumRole } from '../shared/enums';
import HttpException from '../shared/exceptions';
import { Errors } from '../shared/erros';
import Figure, { IFigure } from '../models/Figure';
import Video, { IVideo } from '../models/Video';
import { deleteVideoFromDb, disassociateVideoFromCollection } from './video';

/**
 * POST /admins/stars/
 * activate star
 */

export const activateStar = async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.params.starUsername })
        .select("+roles")
        .exec()
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isAlreadyStar = user.roles.includes(EnumRole.star);
    if (isAlreadyStar) {
        return res.status(409).json({ success: false, message: req.params.starUsername + ' is already star' });
    }

    user.star.promo_video = req.body.promo_video;
    user.star.description = req.body.description;
    user.star.logo = req.body.logo;
    user.roles.push(EnumRole.star);
    await user.save();

    res.status(201).json({
        success: true,
        message: "Activated star successfully",
    });
}

/**
 * DELETE /admins/stars/:starId
 * deactivate star
 */

export const deactivateStar = async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.params.starUsername })
        .select("+roles")
        .exec()
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    const isAlreadyStar = user.roles.includes(EnumRole.star);
    if (!isAlreadyStar) {
        return res.status(404).json({ success: false, message: req.params.starUsername + ' is not a star' });
    }

    user.roles.splice(user.roles.indexOf(EnumRole.star));
    await user.save();

    res.status(201).json({
        success: true,
    });
}

/**
 * POST /admins/figures/:path
 * add figure
 */

const buildFigureFromRequest = (req: Request): IFigure => {
    return new Figure({
        ...req.body
    })
}

const addfigureToStar = async (figure: IFigure, starIds: [mongoose.Types.ObjectId]) => {
    const star_promises = starIds.map(async (starId) => (
        // TODO:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        await User.updateOne({ _id: starId, roles: { $in: [EnumRole.star] } },
            { $addToSet: { "star.figures": figure._id } }).exec()
    ))
    const res: any = await Promise.all(star_promises);
    if (res[0].n == 0)
        throw new HttpException(409, Errors.INVALID_USERNAME)
}

export const addFigure = async (req: Request, res: Response) => {
    // TODO: validation for starIds is needed

    const figureToAdd = buildFigureFromRequest(req);
    const figure = await figureToAdd.save();
    await addfigureToStar(figureToAdd, req.body.stars);

    res.status(201).json({
        success: true,
        message: "Figure added successfully to the star",
        data: figure
    });
}


/**
 * DELETE /admins/figures/:path
 * delete figure
 */

const removeFigureFromFiguresCollection = (figureId: mongoose.Types.ObjectId): Promise<IFigure> => (
    new Promise((resolve, reject) => {
        Figure.findOneAndDelete({ _id: figureId })
            .exec()
            .then(deletedFigure => {
                if (!deletedFigure) {
                    reject(new HttpException(404, "Figure not found"));
                } else {
                    resolve(deletedFigure);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

const removeFigureFromStar = async (figure: IFigure) => {
    const star_promises = figure.stars.map(async (starId: mongoose.Types.ObjectId) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        await User.updateOne({ _id: starId }, { $pull: { "star.figures": figure._id } }).exec()
    ))
    await Promise.all(star_promises);
}

export const deleteFigure = async (req: Request, res: Response) => {
    const figureId = new mongoose.mongo.ObjectId(req.params.figureId);
    const deletedFigure = await removeFigureFromFiguresCollection(figureId);
    await removeFigureFromStar(deletedFigure);

    res.status(200).json({
        success: true,
        message: "Figure removed"
    });
}

/**
 * POST /admins/videos/:starId
 * add video
 */

const buildVideoFromRequest = (req: Request, videoKey: string): IVideo => {
    return new Video({
        ownerUser: req.user._id,
        associatedObject: req.body.figureId,
        associatedModel: EnumAssociateModel.Figure,
        key: req.body.key,
        name: req.body.name,
        thumbnail: req.body.thumbnail,
    })
}

export const associateVideoWithFigure = async (associatedId: mongoose.Types.ObjectId,
    newVideoId: mongoose.Types.ObjectId) => (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    await Figure.updateOne({ _id: associatedId }, { $addToSet: { videos: newVideoId } }).exec()
);

export const addVideo = async (req: Request, res: Response) => {
    const key = req.body.key;

    const figure = await Figure.findById(req.body.figureId).exec();
    if (!figure) {
        return res.status(404).json({ success: false, message: 'Figure not found' });
    }

    const video = buildVideoFromRequest(req, key);
    await video.save();

    await associateVideoWithFigure(video.associatedObject, video._id);

    // TODO: select params for video

    res.status(201).json({
        success: true,
        message: 'Upload video successfully completed',
        data: video // TODO:
    });
}



export const deleteVideo = async (req: Request, res: Response) => {
    const videoId = new mongoose.mongo.ObjectId(req.params.videoId);
    const video = await deleteVideoFromDb(videoId);
    await disassociateVideoFromCollection(video.associatedModel, video.associatedObject, video._id);

    // await awsDelete(video.key);

    res.status(200).json({
        success: true,
        message: 'Video successfully deleted'
    });
}