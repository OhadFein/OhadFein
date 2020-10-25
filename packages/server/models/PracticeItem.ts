import mongoose, { Document, Model, model } from 'mongoose';
import { IVideo } from "./Video"

const practiceItemSchema = new mongoose.Schema(
    {
        video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Video' },
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
}

export interface IPracticeItemModel extends Model<IPracticeItem> {
}

export default model<IPracticeItem, IPracticeItemModel>('PracticeItem', practiceItemSchema);
