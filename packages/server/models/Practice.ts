import { IUser } from './User';
import mongoose, { Document, Model, model } from 'mongoose';
import { IFigure } from './Figure';
import { IVideo } from "./Video"
import { INote } from './Note';

const practiceSchema = new mongoose.Schema(
    {
        video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Video' },
        star: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        figure: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Figure' },
        name: { type: String, required: true },
        notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    },
    { timestamps: true }
);

interface IPracticeSchema extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
}

interface IPracticeBase extends IPracticeSchema {
}

export interface IPractice extends IPracticeBase {
    video: IVideo["_id"];
    star: IUser["_id"];
    figure: IFigure["_id"];
    notes: [INote["_id"]];
}

export interface IPracticeModel extends Model<IPractice> {
}

export default model<IPractice, IPracticeModel>('Practice', practiceSchema);
