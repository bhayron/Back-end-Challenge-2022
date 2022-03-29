import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './interfaces/article.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Articles') private readonly articleModel: Model<Article>,
  ) {}

  private logger = new Logger(ArticlesService.name);

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = createArticleDto;

    const createArticle = new this.articleModel(article);
    return await createArticle.save();
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<Array<Article>> {
    const { skip, limit } = paginationQuery;
    const count = await this.articleModel.count();
    const query = this.articleModel
      .find()
      .skip(skip - 1 || 0)
      .limit(limit || 100);
    return query;
  }

  async findOne(id: string) {
    const query = await this.articleModel.find({ _id: id });
    return query;
  }

  async update(_id: string, createArticleDto: CreateArticleDto) {
    await this.articleModel
      .findOneAndUpdate({ _id }, { $set: createArticleDto })
      .exec();
  }

  async remove(_id: string) {
    return await this.articleModel.deleteOne({ _id }).exec();
  }
}
