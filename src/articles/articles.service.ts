import 'dotenv/config';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
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
  //cria um artigo no banco de dados
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = createArticleDto;
    try {
      const createArticle = new this.articleModel(article);
      return await createArticle.save();
    } catch (error) {
      throw new BadRequestException(`Erro ao cadastrar artigo`);
    }
  }
  //encontra todos os artigos no banco de dados paginado
  async findAll(paginationQuery: PaginationQueryDto): Promise<Array<Article>> {
    const { skip, limit } = paginationQuery;
    try {
      const query = this.articleModel
        .find()
        .skip(skip || 0)
        .limit(limit || 10);
      return query;
    } catch (error) {
      throw new BadRequestException(`Artigos não encontrados`);
    }
  }
  //encontra um artigo no banco de dados pelo id
  async findOne(id: string) {
    try {
      const query = await this.articleModel.find({ _id: id });
      return query;
    } catch (error) {
      throw new NotFoundException(`Artigo não encontrado`);
    }
  }
  //atualiza um artigo no banco
  async update(_id: string, createArticleDto: CreateArticleDto) {
    try {
      await this.articleModel
        .findOneAndUpdate({ _id }, { $set: createArticleDto })
        .exec();
    } catch (error) {
      throw new BadRequestException(`Erro ao atualizar artigo`);
    }
  }
  //remove um artigo no banco
  async remove(_id: string) {
    try {
      return await this.articleModel.deleteOne({ _id }).exec();
    } catch (error) {
      throw new BadRequestException(`Erro ao remover artigo`);
    }
  }
}
