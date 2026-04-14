import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];
  private idCounter = 1;

  create(dto: CreateAuthorDto): Author {
    const author: Author = { id: this.idCounter++, ...dto };
    this.authors.push(author);
    return author;
  }

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: number): Author {
    const author = this.authors.find(a => a.id === id);
    if (!author) {
      throw new NotFoundException(`ERROR: Автора з id ${id} не знайдено!`);
    }
    return author;
  }

  update(id: number, dto: UpdateAuthorDto): Author {
    const author = this.findOne(id);
    Object.assign(author, dto);
    return author;
  }

  remove(id: number): { message: string } {
    const index = this.authors.findIndex(a => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`ERROR: Автора з id ${id} не знайдено!`);
    }
    this.authors.splice(index, 1);
    return { message: `COMPLETED: Автора з id ${id} видалено!` };
  }
}