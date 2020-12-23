import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Figure, { IFigure } from '../models/Figure';
import Video, { IVideo } from '../models/Video';
import { EnumAssociateModel } from '../shared/enums';
import { awsDelete, awsListObjects } from '../services/aws';
import { deleteVideoFromDb, disassociateVideoFromCollection } from './video'
import Star, { IStar } from '../models/Star';
import { HttpException } from '../shared/exceptions';


/**
 * POST /admins/stars/add
 * add star
 */

// TODO: slug should be converted from (firstName + lastName) with slugify (toLowerCase is needed?)
const buildStarFromRequest = (req: Request): IStar => {
    return new Star({
        ...req.body
    })
}

export const addStar = async (req: Request, res: Response) => {
    const star = buildStarFromRequest(req);
    await star.save();

    res.status(201).json({
        success: true,
        message: "Created star successfully",
        data: star
    });
}

/**
 * DELETE /admins/stars/:starId
 * remove star
 */

export const removeStar = async (req: Request, res: Response) => {
    await Star.deleteOne({ _id: req.params.starId })

    res.status(201).json({
        success: true,
    });
}

/**
 * POST /admins/videos/:starId
 * add video
 */

const buildVideoFromRequest = (req: Request, videoKey: string): IVideo => {
    return new Video({
        ...req.body,
        ownerUser: req.user._id,
        associatedModel: EnumAssociateModel.Figure,
        key: videoKey,
    })
}

export const associateVideoWithFigure = async (associatedId: mongoose.Types.ObjectId,
    newVideoId: mongoose.Types.ObjectId) => (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    await Figure.updateOne({ _id: associatedId }, { $addToSet: { videos: newVideoId } }).exec()
);

export const addVideo = async (req: Request, res: Response) => {
    // TODO: validation for req.file

    const videoKey = req.file ? (req.file as any).key : req.body.videoKey;
    const video = buildVideoFromRequest(req, videoKey);

    await video.save();
    await associateVideoWithFigure(video.associatedObject, video._id);

    // TODO: select params for video

    res.status(201).json({
        success: true,
        message: 'Upload video successfully completed',
        data: video // TODO:
    });
}

/**
 * DELETE /admins/videos/:starId
 * delete video
 */

export const deleteVideo = async (req: Request, res: Response) => {
    const videoId = new mongoose.mongo.ObjectId(req.params.videoId);
    const video = await deleteVideoFromDb(videoId);
    await disassociateVideoFromCollection(video.associatedModel, video.associatedObject, video._id);

    await awsDelete(video.key);

    res.status(200).json({
        success: true,
        message: 'Video successfully deleted'
    });
}


/**
 * GET /admins/s3objects/
 * list s3 objects
 */

export const listS3Object = async (req: Request, res: Response) => {
    const objects = await awsListObjects();

    res.status(200).json({
        data: objects
    });
}

/**
 * POST /admins/s3objects/:path
 * add s3 object
 */


export const addS3Object = (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
        message: 'Upload successfully completed',
        data: (req.file as any).location
    });
}

/**
 * DELETE /admins/s3objects/:path
 * delete s3 object
 */

export const deleteS3Object = async (req: Request, res: Response) => {
    await awsDelete(req.body.key);

    res.status(200).json({
        success: true,
        message: 'Object successfully deleted'
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
        await Star.updateOne({ _id: starId }, { $addToSet: { figures: figure._id } }).exec()
    ))
    await Promise.all(star_promises);
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
        await Star.updateOne({ _id: starId }, { $pull: { figures: figure._id } }).exec()
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
