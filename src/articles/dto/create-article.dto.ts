import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { Events, Launches } from '../interfaces/article.interface';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  readonly article: string;

  @IsString()
  @IsNotEmpty()
  featured: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  newsSite: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  publishedAt: string;

  @IsArray()
  @ArrayMinSize(1)
  launches: Array<Launches>;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Events>;
}
