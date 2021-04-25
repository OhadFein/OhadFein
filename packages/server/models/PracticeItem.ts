import { IUser } from './User';
import mongoose, { Document, Model, model } from 'mongoose';
import { IFigure } from './Figure';
import { IVideo } from "./Video"

const practiceItemSchema = new mongoose.Schema(
    {
        video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Video' },
        star: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Star' },
        figure: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Figure' },
        name: { type: String, required: true },
        notes: { type: String, default: "" },
    },
    { timestamps: true }
);

interface IPracticeItemSchema extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    notes?: string;
}

interface IPracticeItemBase extends IPracticeItemSchema {
}

export interface IPracticeItem extends IPracticeItemBase {
    video: IVideo["_id"];
    star: IUser["_id"];
    figure: IFigure["_id"];
}

export interface IPracticeItemModel extends Model<IPracticeItem> {
}

export default model<IPracticeItem, IPracticeItemModel>('PracticeItem', practiceItemSchema);
