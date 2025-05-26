/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateComicDto {
  @IsString()
  @MinLength(2, { message: 'Original Name must have at least 2 characters' })
  @IsNotEmpty()
  originalName: string;

  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  @IsNotEmpty()
  name: string;

  @IsInt()
  pageCount: number;

  @IsInt()
  currentPage: number;

  @IsString()
  @MinLength(2, { message: 'Original Name must have at least 2 characters' })
  @IsNotEmpty()
  cover: string;

  @IsString()
  @MinLength(2, { message: 'Original Name must have at least 2 characters' })
  @IsNotEmpty()
  url: string;

  @IsString()
  @MinLength(2, { message: 'Slug must have at least 2 characters' })
  @IsNotEmpty()
  slug: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  pages: string[];
}
