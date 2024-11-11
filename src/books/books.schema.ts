import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User , UserSchema } from 'src/users/users.schema';
import mongoose from 'mongoose';
export const genres = [
  'Fantasy',
  'Thriller',
  'Science Fiction',
  'Romance',
  `Western`,
  `Literary Fiction`,
  `Horror`,
  `Adventure`,
  'Drama',
  'Dystopian',
  'Classic',
] as const;

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: [String], required: true })
  authors: string[];

  @Prop({ type: Number, required: true, min: 1 })
  pages: number;

  @Prop({ type: [String], required: true, enum: genres })
  genres: string[];

  @Prop({ type: Date, required: true })
  publicationDate: Date;

  @Prop({ type: String, unique: true, required: true })
  isbn: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' , default:null})
  borrower: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
