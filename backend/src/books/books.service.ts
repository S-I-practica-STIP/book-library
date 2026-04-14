import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  // In-memory сховище
  private books: Book[] = [];
  private idCounter = 1;

  create(dto: CreateBookDto): Book {
    const book: Book = { id: this.idCounter++, ...dto };
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new NotFoundException(`ERROR: Книгу з id ${id} не знайдено!`);
    }
    return book;
  }

  update(id: number, dto: UpdateBookDto): Book {
    const book = this.findOne(id);
    Object.assign(book, dto);
    return book;
  }

  remove(id: number): { message: string } {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`ERROR: Книгу з id ${id} не знайдено!`);
    }
    this.books.splice(index, 1);
    return { message: `COMPLETED: Книгу з id ${id} видалено!` };
  }
}