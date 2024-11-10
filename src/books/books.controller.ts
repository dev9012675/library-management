import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UsePipes , ValidationPipe } from '@nestjs/common';
import { Book } from './books.schema';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book-dto';
import { UpdateBookDTO } from './dtos/update-book-dto';
import { PaginationDTO } from 'src/pagination/pagination-dto';
import { ParsePaginationPipe } from 'src/pipes/parse-pagination.pipe';
import { ValidateIdPipe } from 'src/pipes/validate-id.pipe';
import { NotFoundFilter } from 'src/exception-filters/NotFound.filter';
@Controller('api/books')
export class BooksController {
    constructor (private booksService:BooksService) {}
    
    @UsePipes( ParsePaginationPipe ,new ValidationPipe({
        transform: true,  
        whitelist: true,
        forbidNonWhitelisted: true
      }))
    @Get()
    async findMultiple(@Query() pagination:PaginationDTO):Promise<Book[]> {

        return await this.booksService.findMultiple(pagination)
    }

    @Post()
    @UsePipes(new ValidationPipe({
        transform: true, 
        whitelist: true,  
        forbidNonWhitelisted: true
      }))
    async create(@Body() createBookDto:CreateBookDTO):Promise<Book> {
        return await this.booksService.create(createBookDto)
    }

    @UseFilters(NotFoundFilter)
    @Get(`:id`)
    async findOne(@Param(`id` , ValidateIdPipe) id:string) {
        return await this.booksService.findOne(id)
    }

    @UseFilters(NotFoundFilter)
    @Put(`:id`)
    @UsePipes(new ValidationPipe({
        transform: true, 
        whitelist: true,
        forbidNonWhitelisted: true
      }))
    async update(@Param(`id` , ValidateIdPipe) id:string , @Body() book:UpdateBookDTO) {
        return await this.booksService.update(id , book)
    }

    @UseFilters(NotFoundFilter)
    @Delete(`:id`)
    async remove(@Param(`id` , ValidateIdPipe) id:string) {
        return await this.booksService.remove(id)
    }



}
