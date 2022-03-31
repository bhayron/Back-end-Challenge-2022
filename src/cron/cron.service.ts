import 'dotenv/config';
import { Injectable, Logger } from '@nestjs/common';
import { CreateArticleDto } from '../articles/dto/create-article.dto';
import { Article } from '../articles/interfaces/article.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(
    @InjectModel('Articles') private readonly articleModel: Model<Article>,
  ) {}

  private logger = new Logger(CronService.name);

  @Cron('* * * * * *')
  public async handleCron(createArticleDto: CreateArticleDto) {
    this.logger.debug('Cron Iniciado');

    const url = process.env.API_EXTERNA;
    //conta quantos artigos existem na api de artigos
    const pagesToLoad = await axios.get(`${url}/count`).then((res: any) => {
      return res.data;
    });
    //laço for, pegando o total de artigos e implementando paginado
    //para que não sobrecarregue a api de artigos nem a nossa api
    for (let i = 1; i < pagesToLoad + 1; i++) {
      try {
        const getArticle = await axios
          .get(`${url}?_limit=1&_start=${i}`)
          .then((res) => {
            if ((res.status = 200)) {
              return res.data.shift();
            } else {
              this.logger.debug('Erro ao pegar dados');
            }
          });
        //verifica se o artigo existe no banco de dados
        const articleFound = await this.articleModel
          .findOne({ title: getArticle.title })
          .exec();
        if (articleFound == null) {
          //se o artigo não for encontrado ele cria
          this.logger.debug('Artigo criado');
          const createArticleDto = new this.articleModel(getArticle);
          await createArticleDto.save();
        } else {
          //se for encontrado ele atualiza
          this.logger.debug('Artigo atualizado');
          await this.articleModel
            .findOneAndUpdate({ getArticle }, { $set: createArticleDto })
            .exec();
        }
      } catch (error) {
        //se houver um erro ele da uma mensagem, que pode ser implementado com um envio de amil também
        this.logger.debug('Erro ao sincronizar', error);
      }
      this.logger.debug('Cron Finalizado');
    }
  }
}
