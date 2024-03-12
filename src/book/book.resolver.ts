import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';

import { AddBookArgs } from './dto/create-book.input';
import { UpdateBookArgs } from './dto/update-book.input';
import { Book } from './schema/book.schema';

// resolver for book schema this file belongs to shcema and service belongs to entities
@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
// Query for book schema
//Query for get book
// {
//   books{
//     id,
//     title,
//     price
//   }
// }
  @Query(() => [Book], { name: 'books' })
  getAllBooks() {
    return this.bookService.findAllBooks();
  }
  //Query for delete book
  // mutation deleteBook($bookId:Int!){
  //   deleteBook(id:$bookId)
  // }
  // {
  //   "bookId": 9
  // }

  @Mutation(() => String, { name: 'deleteBook' })
  deleteBookById(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.deleteBook(id);
  }
//Query for add book
  // mutation addBook($addBookArgs:AddBookArgs!){
  //   addBook(addBookArgs:$addBookArgs)
  // }
  // {
  //   "addBookArgs": {
  //     "title": "zee",
  //     "price": 1800
  //   }
  // }
  @Mutation(() => String, { name: 'addBook' })
  addBook(@Args("addBookArgs") addBookArgs:AddBookArgs) {
    return this.bookService.addBook(addBookArgs);
  }
//Query for add book
// mutation updateBook($updateBookArgs:UpdateBookArgs!){
//   updateBook(updateBookArgs:$updateBookArgs)
// }
// {
//   "updateBookArgs": {
//     "id": 2,
//     "title": "zee",
//     "price": 1000
//   }
// }
  @Mutation(() => String, { name: 'updateBook' })
  updateBook(@Args("updateBookArgs") updateBookArgs:UpdateBookArgs) {
    return this.bookService.updateBook(updateBookArgs);
  }


}
