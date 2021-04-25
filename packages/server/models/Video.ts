import mongoose, { Document, Model, model } from 'mongoose';
import {
    EnumAssociateModel, possibleAssociateModels, EnumVideoType, possibleVideoTypes
} from "../shared/enums"
import { IFigure } from './Figure';
import { IUser } from './User';

function concatAWSBucketPath(str: any) {
    return process.env.AWS_BUCKET_PATH + str;
}

const videoSchema = new mongoose.Schema(
    {
        ownerUser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

        associatedObject: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'associatedModel' },
        associatedModel: { type: EnumAssociateModel, enum: possibleAssociateModels, required: true },
        thumbnail: { type: String, get: concatAWSBucketPath },

        name: { type: String },
        key: { type: String, required: true },
        type: { type: EnumVideoType, enum: possibleVideoTypes, required: false },
    },
    { timestamps: true }
);

videoSchema.set('toJSON', {
    virtuals: true,
    getters: true,
});

videoSchema.virtual('path').get(function (this: { key: string }) {
    return concatAWSBucketPath(this.key)
});
// TODO: get for thumbnail

interface IVideoSchema extends Document {
    _id: mongoose.Types.ObjectId;
    key: string;
    name?: string;
    path: string;
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
