import { Injectable } from '@nestjs/common';
import { AddBookArgs } from './dto/create-book.input';
import { UpdateBookArgs } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(@InjectRepository(BookEntity) public readonly bookRepo:Repository<BookEntity> ){}
  
  async findAllBooks():Promise<BookEntity[]> {
    let books = await this.bookRepo.find()
    return books;
  }

  
  async deleteBook(id: number):Promise<string> {
    await this.bookRepo.delete(id);
    return "Book ha benn deleted";
  }

  async addBook(addBookArgs: AddBookArgs) : Promise<string>  {
    let book :BookEntity= new BookEntity();
    book.title=addBookArgs.title;
    book.price=addBookArgs.price;
    await this.bookRepo.save(book)
    return "book has been successfully added";
  }

 
  async updateBook(updateBookArgs: UpdateBookArgs) : Promise<string>  {
    let book :BookEntity= await this.bookRepo.findOne({where:{id:updateBookArgs.id}})
    book.title=updateBookArgs.title;
    book.price=updateBookArgs.price;
    await this.bookRepo.save(book)
    return "book has been successfully updated";
  }

 
}
