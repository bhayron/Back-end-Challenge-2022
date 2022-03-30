import 'dotenv/config';
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
import axios from 'axios';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Articles') private readonly articleModel: Model<Article>,
  ) {}

  private logger = new Logger(ArticlesService.name);

  @Cron('* 33 * * * *')
  public async handleCron(createArticleDto: CreateArticleDto) {
    console.log('Helo cron');

    const url = process.env.API_EXTERNA;
    //conta quantos artigos existem na api de artigos
    const pagesToLoad = await axios.get(`${url}/count`).then((res: any) => {
      return res.data;
    });
    //laço for, pegando o total de artigos e implementando paginado
    //para que não sobrecarregue a api de artigos nem a nossa api

    for (let i = 0; i < pagesToLoad; i++) {
      const getArticle = await axios
        .get(`${url}?_limit=1&_start=${i}`)
        .then((res) => {
          if ((res.status = 200)) {
            return res.data.shift();
          } else {
            console.log('Erro ao pegar dados ');
          }
        });

      const articleFound = await this.articleModel
        .findOne({ title: getArticle.title })
        .exec();
      if (articleFound == null) {
        console.log('Artigo criado');
        const createArticleDto = new this.articleModel(getArticle);
        await createArticleDto.save();
      } else {
        console.log('Artigo atualizado');
        // await this.articleModel
        //   .findOneAndUpdate({ getArticle }, { $set: createArticleDto })
        //   .exec();
      }
      // console.log('Usuario criado/atualizado');
    }

    // for (let i = 1; i < pagesToLoad + 1; i++) {
    //   const getUser = await api
    //     .get(`${url}/api/v1/user?page=${i}&per_page=1`)
    //     .then((res) => {
    //       return res.data;
    //     });
    //   const userArray = await getUser.users.data;
    //   const addressArray = userArray[0].addresses;
    //   const contactArray = userArray[0].contacts;
    //   const userCreate = {
    //     fullName: userArray[0].fullName,
    //     email: userArray[0].email,
    //     addresses: addressArray[0].address,
    //     addressNumber: addressArray[0].countryCode,
    //     phoneNumber: contactArray[0].phoneNumber,
    //   };
    //   const userFound = await this.userModel
    //     .findOne({ fullName: userArray[0].fullName })
    //     .exec();
    //   if (userFound == null) {
    //     const createArticleDto = new this.userModel(userCreate);
    //     return await createArticleDto.save();
    //   } else {
    //     await this.userModel
    //       .findOneAndUpdate({ userCreate }, { $set: createArticleDto })
    //       .exec();
    //   }
    // }
  }

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
