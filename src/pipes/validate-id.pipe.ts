import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { HttpException } from '@nestjs/common';

@Injectable()
export class ValidateIdPipe implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata) {
    if (
      !(
        mongoose.Types.ObjectId.isValid(id) &&
        new mongoose.Types.ObjectId(id).toString() === id
      )
    ) {
      const error = `Invalid Book ID Format`;
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
    return id;
  }
}
