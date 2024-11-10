import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { GlobalFilter } from './exception-filters/globalFilter.filter';

@Module({
  imports: [BooksModule , MongooseModule.forRoot('mongodb://localhost/internship-library')],
  controllers: [AppController],
  providers: [AppService , {provide:APP_FILTER , useClass:GlobalFilter}],
})
export class AppModule {}
