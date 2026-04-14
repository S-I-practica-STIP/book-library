import { IsString, IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'ERROR: Назва книги не може бути порожньою!' })
  title: string;

  @IsInt()
  @IsNotEmpty({ message: 'ERROR: Вкажіть автора книги!' })
  authorId: number;

  @IsInt()
  @Min(1000, { message: 'ERROR: Рік виглядає некоректно!' })
  @Max(new Date().getFullYear(), { message: 'ERROR: Рік не може бути в майбутньому!' })
  year: number;
}