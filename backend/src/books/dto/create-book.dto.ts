import { IsString, IsInt, IsNotEmpty, IsOptional, IsUrl, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва книги не може бути порожньою' })
  title: string;

  @IsInt()
  @IsNotEmpty({ message: 'Вкажіть автора книги' })
  authorId: number;

  @IsInt()
  @Min(1000, { message: 'Рік виглядає некоректно' })
  @Max(new Date().getFullYear(), { message: 'Рік не може бути в майбутньому' })
  year: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl({}, { message: 'Введіть коректне посилання' })
  @IsOptional()
  url?: string;
}