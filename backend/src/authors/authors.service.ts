import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];
  private idCounter = 1;

  create(data: Omit<Author, 'id'>) {
    if (!data.name) {
      throw new Error('Name is required');
    }
    const author: Author = { id: this.idCounter++, ...data };
    this.authors.push(author);
    return author;
  }

  findAll() {
    return this.authors;
  }

  findOne(id: number) {
    return this.authors.find(a => a.id === id);
  }
}