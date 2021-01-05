import { Request, Response } from 'express';
import mongoose from "mongoose"
import User from '../models/User';
import { buildVideoFromRequest, associateVideoWithStarVideo, disassociateVideoFromCollection, deleteVideoFromDb } from "./video"
import PracticeItem, { IPracticeItem } from '../models/PracticeItem';
import { IVideo } from '../models/Video';
import { awsDelete } from '../services/aws';
import HttpException from '../shared/exceptions';

/**
 * GET /
 * get all practice items
 */

export const getPracticeItems = async (req: Request, res: Response) => {
    await req.user.populate({
        path: 'practiceItems',
        populate: {
            path: 'star video',
            populate: {
                model: 'Video',
                path: 'associatedObject',
                populate: {
                    model: 'Figure',
                    path: 'associatedObject',
                }
            }
        }
    }).execPopulate();

    res.status(200).json({
        success: true,
        data: req.user.practiceItems
    });
}

/**
 * GET /:practiceItemId
 * get practice item
 */

export const getPracticeItemByIdWithoutPopualte = async (practiceItemId: mongoose.Types.ObjectId): Promise<IPracticeItem> => (
    new Promise((resolve, reject) => {
        PracticeItem.findById(practiceItemId)
            //.select() // TODO: select is needed
            .exec()
            .then(practiceItem => {
                if (!practiceItem) {
                    reject(new HttpException(404, "Practice item not found"));

                } else {
                    resolve(practiceItem);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getPracticeItemById = async (practiceItemId: mongoose.Types.ObjectId): Promise<IPracticeItem> => (
    new Promise((resolve, reject) => {
        PracticeItem.findById(practiceItemId)
            //.select() // TODO: select is needed
            .populate({
                path: 'star video',
                populate: {
                    model: 'Video',
                    path: 'associatedObject',
                    populate: {
                        model: 'Figure',
                        path: 'associatedObject',
                    }
                }
            })
            .exec()
            .then(practiceItem => {
                if (!practiceItem) {
                    reject(new HttpException(404, "Practice item not found"));

                } else {
                    resolve(practiceItem);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getPracticeItem = async (req: Request, res: Response) => {
    const practiceItemId = new mongoose.mongo.ObjectId(req.params.practiceItemId);
    const practiceItem = await getPracticeItemById(practiceItemId);

    res.status(200).json({
        success: true,
        data: practiceItem
    });
}

/**
 * POST /
 * add practice item
 */

const buildpracticeItemFromRequest = (req: Request, video: IVideo): IPracticeItem => {
    return new PracticeItem({
        video: video._id,
        name: req.body.name,
        star: req.body.starId
    })
}

export const addPracticeItem = async (req: Request, res: Response) => {
    const videoKey = (req.file as any).key;
    const video = buildVideoFromRequest(req, videoKey);
    await video.save();
    await associateVideoWithStarVideo(video.associatedObject, video._id);

    const practiceItem = buildpracticeItemFromRequest(req, video);
    await practiceItem.save();
    await User.updateOne({ _id: req.user._id }, { $addToSet: { practiceItems: practiceItem._id } }).exec();

    res.status(201).json({
        success: true,
        message: 'Practice item successfully added',
        data: practiceItem
    });
}


/**
 * DELETE /:practiceItemId
 * delete practice item
 */

const deletePracticeItemFromDb = (id: mongoose.Types.ObjectId): Promise<IPracticeItem> => (
    new Promise((resolve, reject) => {
        PracticeItem.findByIdAndRemove(id)
            .exec()
            .then(practiceItem => {
                if (!practiceItem) {
                    reject(new HttpException(404, "Practice item not found"));
                } else {
                    resolve(practiceItem);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);

export const deletePracticeItem = async (req: Request, res: Response) => {
    const practiceItemId = new mongoose.mongo.ObjectId(req.params.practiceItemId);
    const practiceItem = await getPracticeItemByIdWithoutPopualte(practiceItemId);

    const video = await deleteVideoFromDb(practiceItem.video);
    await disassociateVideoFromCollection(video.associatedModel, video.associatedObject, video._id);
    await awsDelete(video.key);

    await deletePracticeItemFromDb(practiceItemId);
    await User.updateOne({ _id: req.user._id }, { $pull: { practiceItems: practiceItem._id } }).exec();

    res.status(200).json({
        success: true,
        message: 'Practice item successfully deleted',
    });
}


/**
 * PATCH /
 * edit practice item
 */


export const editPracticeItem = async (req: Request, res: Response) => {
    const practiceItemId = new mongoose.mongo.ObjectId(req.params.practiceItemId);
    const practiceItem = await getPracticeItemById(practiceItemId);
    // TODO: fix this warnings
    practiceItem.name = req.body.name;
    practiceItem.notes = req.body.notes ?? "";

    await practiceItem.save();

    res.status(200).json({
        success: true,
        message: 'Practice item edited',
        data: practiceItem
    });
}