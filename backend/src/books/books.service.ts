import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  // In-memory сховище
  private books: Book[] = [];
  private idCounter = 1;

  create(bookData: Omit<Book, 'id'>) {
    const newBook: Book = {
      id: this.idCounter++,
      ...bookData,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }
}