import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './books.schema';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dtos/create-book-dto';
import { UpdateBookDTO } from './dtos/update-book-dto';
import { PaginationDTO } from 'src/pagination/pagination-dto';
import { User } from 'src/users/users.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book> ,
              @InjectModel(User.name) private userModel: Model<User> ) {}

  async findMultiple(pagination?: PaginationDTO):Promise<Book[]> {
    try {
        if(typeof pagination === `undefined`) return this.bookModel.find().exec()
        else {
                const {page , limit , filter} = pagination
                const skip = (page - 1) * limit
                return typeof filter !== `undefined`  ? this.bookModel.find({title:{$regex:`${filter}` , $options:`i`}}).limit(limit).skip(skip).exec() :
                this.bookModel.find().limit(limit).skip(skip).exec()
             }
    } catch(err) {
        throw new Error(`Failed to get books: ${err.message}`);
    }
}

  async create(createBookDto: CreateBookDTO): Promise<Book> {
    try {
      const book = new this.bookModel(createBookDto);
      return await book.save();
    } catch (err) {
      throw new Error(`Failed to create book: ${err.message}`);
    }
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async update(id: string, data: UpdateBookDTO) {
    const book = await this.bookModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async remove(id: string) {
    const removedBook = await this.bookModel.findByIdAndDelete(id);
    if (!removedBook) {
      throw new NotFoundException();
    }
    return removedBook;
  }

  async borrow(bookId:string , userId:string) {
         const book = await this.bookModel.findById(bookId)
         const user = await this.userModel.findById(userId)
         if(!book || !user) {
           throw new NotFoundException()
         }
         else if(book.borrower !== null) {
           return {
             message:`This book is borrowed by another user`
           }
         }
         book.borrower = user
         await book.save()
         return {
          message:"You have borrowed the book"
         }
        
  }

  async return(bookId:string , userId:string) {
    const book = await this.bookModel.findById(bookId)
    const user = await this.userModel.findById(userId)
    if(!book || !user) {
      throw new NotFoundException()
    }
    else if(book.borrower === null) {
      return {
        message:`You have not borrowed this book`
      }
    }
    book.borrower = null
    await book.save()
    return {
     message:"You have returned the book"
    }
   
}
}
