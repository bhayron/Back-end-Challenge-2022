import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Article } from './interfaces/article.interface';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  // @UsePipes(ValidationPipe)
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articlesService.create(createArticleDto);
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Array<Article> | Article> {
    return await this.articlesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(':_id')
  async update(
    @Body() createArticleDto: CreateArticleDto,
    @Param('_id') _id: string,
  ): Promise<void> {
    await this.articlesService.update(_id, createArticleDto);
  }

  @Delete(':_id')
  async remove(@Param('_id') _id: string): Promise<void> {
    await this.articlesService.remove(_id);
  }
}
