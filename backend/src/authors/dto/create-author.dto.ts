import { IsString, IsInt, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty({ message: 'ERROR: Імʼя автора не може бути порожнім!' })
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsInt()
  @Min(1000, { message: 'ERROR: Рік народження виглядає некоректно!' })
  @Max(new Date().getFullYear(), { message: 'ERROR: Рік народження не може бути в майбутньому!' })
  birthYear: number;
}