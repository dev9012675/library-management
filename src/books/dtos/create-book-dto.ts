import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsIn,
  IsISBN,
} from 'class-validator';
import { genres } from '../books.schema';
import { Transform } from 'class-transformer';
export type Genres = (typeof genres)[number];

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value),
    { toClassOnly: true },
  )
  title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Transform(
    ({ value }) => {
      if (Array.isArray(value)) {
        return value.map((val) => (typeof val === `string` ? val.trim() : val));
      }
      return value;
    },
    { toClassOnly: true },
  )
  authors: string[];

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  pages: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsIn(genres, { each: true })
  genres: Genres[];

  @IsNotEmpty()
  @IsDateString()
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value),
    { toClassOnly: true },
  )
  publicationDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsISBN()
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value),
    { toClassOnly: true },
  )
  isbn: string;
}
