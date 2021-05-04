import { Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

import Figure from '../models/Figure';
import Video, { IVideo } from '../models/Video';
import { EnumAssociateModel, EnumVideoType } from '../shared/enums';
import HttpException from '../shared/exceptions';

/**
 * GET /:videoId
 * get video
 */

export const getVideoById = async (videoId: mongoose.Types.ObjectId): Promise<IVideo> => (
    new Promise((resolve, reject) => {
        Video.findById(videoId)
            .exec()
            .then(video => {
                if (!video) {
                    reject(new HttpException(404, "Video not found"));
                } else {
                    resolve(video);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

const getPopulatedVideoById = async (videoId: mongoose.Types.ObjectId): Promise<IVideo> => (
    new Promise((resolve, reject) => {
        Video.findById(videoId)
            .populate({
                path: 'associatedObject',
                // select: 'name age'
            })
            .exec()
            .then(video => {
                if (!video) {
                    reject(new HttpException(404, "Video not found"));
                } else {
                    resolve(video);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

// TODO: this request is needed?
export const getVideo = async (req: Request, res: Response) => {
    const videoId = new mongoose.mongo.ObjectId(req.params.videoId);
    const video = await getVideoById(videoId);
    const poulatedVideo = await getPopulatedVideoById(video._id);

    res.status(200).json({
        success: true,
        data: poulatedVideo // TODO: Is all the information should be exposed to the user?
    });
}

/**
 * upload video
 */

export const buildVideoFromRequest = (req: Request, videoKey: string): IVideo => {
    return new Video({
        associatedObject: req.body.videoId,
        figure: req.body.figureId,
        star: req.body.starId,
        ownerUser: req.user._id,
        associatedModel: EnumAssociateModel.Video,
        key: videoKey,
        type: EnumVideoType.comparable
    })
}

export const associateVideoWithStarVideo = async (associatedVideoId: mongoose.Types.ObjectId,
    newVideoId: mongoose.Types.ObjectId) => {
    await Video.updateOne({ _id: associatedVideoId }, { $addToSet: { videos: newVideoId } }).exec();
};


/**
 * DELETE /delete/:videoId
 * delete video
 */

export const disassociateVideoFromCollection = async (associatedModel: EnumAssociateModel,
    associatedId: mongoose.Types.ObjectId, deletedVideoId: mongoose.Types.ObjectId) => {
    let model: Model<Document> = Figure;
    switch (associatedModel) {
        case EnumAssociateModel.Figure:
            model = Figure;
            break;
        case EnumAssociateModel.Video:
            model = Video;
            break;
        // TODO: default:
    }
    await model.updateOne({ _id: associatedId }, { $pull: { videos: deletedVideoId } }).exec();
};

export const deleteVideoFromDb = (id: mongoose.Types.ObjectId): Promise<IVideo> => (
    new Promise((resolve, reject) => {
        Video.findByIdAndRemove(id)
            .exec()
            .then(video => {
                if (!video) {
                    reject(new HttpException(404, "Video not found"));
                } else {
                    resolve(video);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);