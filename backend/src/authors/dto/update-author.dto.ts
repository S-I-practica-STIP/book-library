import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsInt()
  @IsOptional()
  @Min(1000)
  @Max(new Date().getFullYear())
  birthYear?: number;
}