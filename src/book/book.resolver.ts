import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';

import { AddBookArgs } from './dto/create-book.input';
import { UpdateBookArgs } from './dto/update-book.input';
import { Book } from './schema/book.schema';


@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'books' })
  getAllBooks() {
    return this.bookService.findAllBooks();
  }
  
  @Query(() => Book, { name: 'book' })
  getBookById(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findBookById(id);
  }

  @Mutation(() => String, { name: 'deleteBook' })
  deleteBookById(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.deleteBook(id);
  }

  @Mutation(() => String, { name: 'addBook' })
  addBook(@Args("addBookArgs") addBookArgs:AddBookArgs) {
    return this.bookService.addBook(addBookArgs);
  }

  @Mutation(() => String, { name: 'updateBook' })
  updateBook(@Args("updateBookArgs") updateBookArgs:UpdateBookArgs) {
    return this.bookService.updateBook(updateBookArgs);
  }


}
