import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {File} from '@project/types';

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
})
export class UploaderModel extends Document implements File {
  @Prop({
    required: true,
  })
  public originalName: string;

  @Prop({
    required: true,
  })
  public hashName: string;

  @Prop({
    required: true,
  })
  public subDirectory: string;

  @Prop({
    required: true,
  })
  public mimetype: string;

  @Prop({
    required: true,
  })
  public path: string;

  @Prop({
    required: true,
  })
  public size: number;

  public id?: string;
}

export const FileSchema = SchemaFactory.createForClass(UploaderModel);

FileSchema.virtual('id').get(function () {
  return this._id.toString();
});
