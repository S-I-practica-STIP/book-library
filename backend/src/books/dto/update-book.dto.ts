import { IsString, IsInt, IsOptional, IsUrl, Min, Max } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  authorId?: number;

  @IsInt()
  @IsOptional()
  @Min(1000)
  @Max(new Date().getFullYear())
  year?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl({}, { message: 'Введіть коректне посилання' })
  @IsOptional()
  url?: string;
}