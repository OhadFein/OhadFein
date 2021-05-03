import { Request, Response } from 'express';
import mongoose from "mongoose"
import User from '../models/User';
import { buildVideoFromRequest, associateVideoWithStarVideo, disassociateVideoFromCollection, deleteVideoFromDb } from "./video"
import Practice, { IPractice } from '../models/Practice';
import { IVideo } from '../models/Video';
import { awsDelete } from '../services/aws';
import HttpException from '../shared/exceptions';
import Note, { INote } from '../models/Note';

/**
 * GET /
 * get all practices
 */

export const getPracticeItems = async (req: Request, res: Response) => {
    await req.user.populate({
        path: 'practices',
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
        data: req.user.practices
    });
}


/**
 * GET /:practiceId
 * get practice item by figure
 */

export const getPracticeItemsByFigureId = async (figureId: mongoose.Types.ObjectId): Promise<IPractice[]> => (
    new Promise((resolve, reject) => {
        Practice.find({ figure: figureId })
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

export const getPracticeItemByFigure = async (req: Request, res: Response) => {
    const figureId = new mongoose.mongo.ObjectId(req.params.figureId);
    const practiceItems = await getPracticeItemsByFigureId(figureId);

    res.status(200).json({
        success: true,
        data: practiceItems
    });
}


/**
 * GET /:practiceId
 * get practice item
 */

export const getPracticeItemByIdWithoutPopualte = async (practiceId: mongoose.Types.ObjectId): Promise<IPractice> => (
    new Promise((resolve, reject) => {
        Practice.findById(practiceId)
            //.select() // TODO: select is needed
            .exec()
            .then(practice => {
                if (!practice) {
                    reject(new HttpException(404, "Practice item not found"));

                } else {
                    resolve(practice);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const getPracticeItemById = async (practiceId: mongoose.Types.ObjectId): Promise<IPractice> => (
    new Promise((resolve, reject) => {
        Practice.findById(practiceId)
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
    const practiceId = new mongoose.mongo.ObjectId(req.params.practiceId);
    const practiceItem = await getPracticeItemById(practiceId);

    res.status(200).json({
        success: true,
        data: practiceItem
    });
}

/**
 * POST /
 * add practice
 */

const buildPracticeItemFromRequest = (req: Request, video: IVideo): IPractice => {
    return new Practice({
        video: video._id,
        name: req.body.name,
        star: req.body.starId,
        figure: req.body.figureId,
    })
}

export const addPracticeItem = async (req: Request, res: Response) => {
    const videoKey = (req.file as any).key;
    const video = buildVideoFromRequest(req, videoKey);
    await video.save();
    await associateVideoWithStarVideo(video.associatedObject, video._id);

    const practiceItem = buildPracticeItemFromRequest(req, video);
    await practiceItem.save();
    await User.updateOne({ _id: req.user._id }, { $addToSet: { practices: practiceItem._id } }).exec();

    res.status(201).json({
        success: true,
        message: 'Practice item successfully added',
        data: practiceItem
    });
}


/**
 * DELETE /:practiceId
 * delete practice
 */

const deletePracticeItemFromDb = (id: mongoose.Types.ObjectId): Promise<IPractice> => (
    new Promise((resolve, reject) => {
        Practice.findByIdAndRemove(id)
            .exec()
            .then(practice => {
                if (!practice) {
                    reject(new HttpException(404, "Practice item not found"));
                } else {
                    resolve(practice);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);

export const deletePracticeItem = async (req: Request, res: Response) => {
    const practiceId = new mongoose.mongo.ObjectId(req.params.practiceId);
    const practiceItem = await getPracticeItemByIdWithoutPopualte(practiceId);

    const video = await deleteVideoFromDb(practiceItem.video);
    await disassociateVideoFromCollection(video.associatedModel, video.associatedObject, video._id);
    await awsDelete(video.key);

    await deletePracticeItemFromDb(practiceId);
    await User.updateOne({ _id: req.user._id }, { $pull: { practiceItems: practiceItem._id } }).exec();

    res.status(200).json({
        success: true,
        message: 'Practice item successfully deleted',
    });
}


/**
 * PATCH /
 * edit practice
 */


export const editPracticeItem = async (req: Request, res: Response) => {
    const practiceId = new mongoose.mongo.ObjectId(req.params.practiceId);
    const practiceItem = await getPracticeItemById(practiceId);
    // TODO: fix this warnings
    practiceItem.name = req.body.name;

    await practiceItem.save();

    res.status(200).json({
        success: true,
        message: 'Practice item edited',
        data: practiceItem
    });
}

/**
 * POST /
 * add new note to practice
 */

const buildNote = (content: string, practiceId: mongoose.Types.ObjectId): INote => {
    return new Note({
        content: content,
        practice: practiceId
    })
}

export const addNoteToPractice = async (req: Request, res: Response) => {
    const practiceId = new mongoose.mongo.ObjectId(req.body.practiceId);
    const practice = await getPracticeItemById(practiceId);

    const note = buildNote(req.body.content, practiceId);
    await note.save();

    await Practice.updateOne({ _id: practiceId }, { $addToSet: { notes: note._id } }).exec();

    res.status(201).json({
        success: true,
        message: 'Note added to practice ' + req.body.practiceId,
        data: note // TODO: or practice?
    });
}

/**
 * DELETE /
 * delete a note
 */


const deleteNoteFromDb = (id: mongoose.Types.ObjectId): Promise<INote> => (
    new Promise((resolve, reject) => {
        Note.findByIdAndRemove(id)
            .exec()
            .then(note => {
                if (!note) {
                    reject(new HttpException(404, "Note not found"));
                } else {
                    resolve(note);
                }
            })
            .catch(err => {
                reject(err);
            })
    })
);

export const getNoteById = async (noteId: mongoose.Types.ObjectId): Promise<INote> => (
    new Promise((resolve, reject) => {
        Note.findById(noteId)
            .exec()
            .then(note => {
                if (!note) {
                    reject(new HttpException(404, "Note not found"));
                } else {
                    resolve(note);
                }
            })
            .catch(err => {
                reject(err);
            });
    })
);

export const deleteNoteToPractice = async (req: Request, res: Response) => {
    const noteId = new mongoose.mongo.ObjectId(req.params.noteId);
    const note = await getNoteById(noteId);

    await deleteNoteFromDb(noteId);
    await Practice.updateOne({ _id: note.practice }, { $pull: { notes: noteId } }).exec();

    res.status(200).json({
        success: true,
        message: 'Note successfully deleted',
    });
}