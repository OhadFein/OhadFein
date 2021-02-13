import mongoose, { Document, Model, model } from 'mongoose';
import {
    EnumView, possibleViews, EnumParticipatesAmount, possibleParticipatesAmounts,
    EnumAssociateModel, possibleAssociateModels, EnumVideoType, possibleVideoTypes
} from "../shared/enums"
import { IFigure } from './Figure';
import { IUser } from './User';


const videoSchema = new mongoose.Schema(
    {
        ownerUser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

        associatedObject: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'associatedModel' },
        associatedModel: { type: EnumAssociateModel, enum: possibleAssociateModels, required: true },
        thumbnail: { type: String },

        name: { type: String, required: true },
        key: { type: String, required: true },
        type: { type: EnumVideoType, enum: possibleVideoTypes, required: true },
        view: { type: EnumView, enum: possibleViews },
        participatesAmount: { type: EnumParticipatesAmount, enum: possibleParticipatesAmounts },
    },
    { timestamps: true }
);

videoSchema.set('toJSON', {
    virtuals: true
});

videoSchema.virtual('path').get(function (this: { key: string }) {
    return process.env.AWS_BUCKET_PATH + this.key;
});

interface IVideoSchema extends Document {
    _id: mongoose.Types.ObjectId;
    key: string;
    name: string;
    path: string;
    view?: EnumView;
    participatesAmount?: EnumParticipatesAmount;
    associatedModel: EnumAssociateModel;
    thumbnail: string;
}

interface IVideoBase extends IVideoSchema {
    // Virtuals and instance methods - should be here
}

export interface IVideo extends IVideoBase {
    ownerUser: IUser["_id"];
    associatedObject: IVideo["_id"] | IFigure["_id"];
}

export interface IVideoModel extends Model<IVideo> {
}

export default model<IVideo, IVideoModel>('Video', videoSchema);
