import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { Events, Launches } from '../interfaces/article.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ArticlesConstants } from '../constants/articles';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  readonly article: string;

  @ApiProperty({
    type: 'string',
    example: ArticlesConstants.featured,
  })
  @IsString()
  @IsNotEmpty()
  featured: string;

  @ApiProperty({
    type: 'string',
    example: ArticlesConstants.title,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    example: ArticlesConstants.url,
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: 'string',
    example: ArticlesConstants.imageUrl,
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    type: 'string',
    example: ArticlesConstants.newsSite,
  })
  @IsString()
  @IsNotEmpty()
  newsSite: string;

  @ApiProperty({
    type: 'string',
    example: ArticlesConstants.summary,
  })
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty({
    type: 'string',
    example: ArticlesConstants.publishedAt,
  })
  @IsString()
  @IsNotEmpty()
  publishedAt: string;

  @ApiProperty({
    isArray: true,
    example: [{ provider: ArticlesConstants.provider }],
  })
  @IsArray()
  @ArrayMinSize(1)
  launches: Array<Launches>;

  @ApiProperty({
    isArray: true,
    example: [{ provider: ArticlesConstants.provider }],
  })
  @IsArray()
  @ArrayMinSize(1)
  events: Array<Events>;
}
