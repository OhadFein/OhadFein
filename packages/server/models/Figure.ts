import mongoose, { Document, Model, model } from 'mongoose';
import { EnumDanceLevel, possibleDanceLevels, EnumDanceType, possibleDanceTypes } from "../shared/enums"
import { IUser } from './User';
import { IVideo } from './Video';


const figureSchema = new mongoose.Schema(
  {
    stars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Star' }],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],

    type: { type: EnumDanceType, enum: possibleDanceTypes, required: true },
    level: { type: EnumDanceLevel, enum: possibleDanceLevels, required: true },
    name: { type: String, required: true }, // TODO: should be changed to enum value?
    logo: { type: String, required: true },
  },
  { timestamps: true }
);


interface IFigureSchema extends Document {
  _id: mongoose.Types.ObjectId;
  type: EnumDanceType;
  level: EnumDanceLevel;
  name: string;
  logo: string;
}

interface IFigureBase extends IFigureSchema {
  // Virtuals and instance methods - should be here
}

export interface IFigure extends IFigureBase {
  stars: [IUser["_id"]];
  videos: [IVideo["_id"]];
}

export interface IFigureModel extends Model<IFigure> {
}

export default model<IFigure, IFigureModel>('Figure', figureSchema);