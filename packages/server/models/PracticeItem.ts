import mongoose, { Document, Model, model } from 'mongoose';
import { IStar } from './Star';
import { IVideo } from "./Video"

const practiceItemSchema = new mongoose.Schema(
    {
        video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Video' },
        starId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Star' },
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
    starId: IStar["_id"];
}

export interface IPracticeItemModel extends Model<IPracticeItem> {
}

export default model<IPracticeItem, IPracticeItemModel>('PracticeItem', practiceItemSchema);
