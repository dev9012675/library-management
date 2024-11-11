import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Book } from './books.schema';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book-dto';
import { UpdateBookDTO } from './dtos/update-book-dto';
import { PaginationDTO } from 'src/pagination/pagination-dto';
import { ParsePaginationPipe } from 'src/pipes/parse-pagination.pipe';
import { ValidateIdPipe } from 'src/pipes/validate-id.pipe';
import { NotFoundFilter } from 'src/exception-filters/NotFound.filter';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
@Controller('api/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @UsePipes(
    ParsePaginationPipe,
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Get()
  @UseGuards(JwtAuthGuard)
  async findMultiple(@Query() pagination: PaginationDTO): Promise<Book[]> {
    return await this.booksService.findMultiple(pagination);
  }

  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(`admin`)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async create(@Body() createBookDto: CreateBookDTO): Promise<Book> {
    return await this.booksService.create(createBookDto);
  }

  @UseFilters(NotFoundFilter)
  @Get(`:id`)
  @UseGuards(JwtAuthGuard)
  async findOne(@Param(`id`, ValidateIdPipe) id: string) {
    return await this.booksService.findOne(id);
  }

  @UseFilters(NotFoundFilter)
  @Put(`:id`)
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(`admin`)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async update(
    @Param(`id`, ValidateIdPipe) id: string,
    @Body() book: UpdateBookDTO,
  ) {
    return await this.booksService.update(id, book);
  }

  @UseFilters(NotFoundFilter)
  @Delete(`:id`)
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles(`admin`)
  async remove(@Param(`id`, ValidateIdPipe) id: string) {
    return await this.booksService.remove(id);
  }

  @UseFilters(NotFoundFilter)
  @Post(`:id/borrow`)
  @UseGuards(JwtAuthGuard)
  async borrow(@Param(`id`, ValidateIdPipe) id: string , @Req() request){
      return await this.booksService.borrow(id , request.user.userId)

  }

  @UseFilters(NotFoundFilter)
  @Post(`:id/return`)
  @UseGuards(JwtAuthGuard)
  async return(@Param(`id`, ValidateIdPipe) id: string , @Req() request){
    return await this.booksService.return(id , request.user.userId)

}
}
