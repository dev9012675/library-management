import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './books.schema';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dtos/create-book-dto';
import { UpdateBookDTO } from './dtos/update-book-dto';
import { PaginationDTO } from 'src/pagination/pagination-dto';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel:Model<Book> ) {}
    
    async findMultiple(pagination?: PaginationDTO):Promise<Book[]> {
        try {
            if(typeof pagination === `undefined`) return this.bookModel.find().exec()
            else {
                    const {page , limit } = pagination
                    const skip = (page - 1) * limit
                    return this.bookModel.find().limit(limit).skip(skip).exec()
                 }
        } catch(err) {
            throw new Error(`Failed to get books: ${err.message}`);
        }
    }

    async create(createBookDto:CreateBookDTO):Promise<Book>{
        try{
        const book = new this.bookModel(createBookDto)
        return await book.save()
        } catch(err) {
            throw new Error(`Failed to create book: ${err.message}`);
        }
        

    }

    async findOne(id:string) {
        const book = await this.bookModel.findById(id)
        if(!book) {
            throw new NotFoundException()
        }
        return book
    }

    async update(id:string , data:UpdateBookDTO) {
        const book = await this.bookModel.findByIdAndUpdate(id , data , {new:true})
        if(!book) {
            throw new NotFoundException()
        }
        return book
    }

    async remove(id:string) {
         const removedBook = await this.bookModel.findByIdAndDelete(id)
         if(!removedBook) {
            throw new NotFoundException()
         }
         return  removedBook
    }


}
