import mongoose, { Document, Model, model } from 'mongoose';
import { IPractice } from './Practice';

const noteSchema = new mongoose.Schema(
    {
        practice: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Practice' },
        content: { type: String },
    },
    { timestamps: true }
);

interface INoteSchema extends Document {
    _id: mongoose.Types.ObjectId;
    content: string;
}

interface INoteBase extends INoteSchema {
    // Virtuals and instance methods - should be here
}

export interface INote extends INoteBase {
    practice: IPractice["_id"];
}

export interface INoteModel extends Model<INote> {
}

export default model<INote, INoteModel>('Note', noteSchema);
