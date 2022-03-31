import { Module } from '@nestjs/common';
import { ArticlesService } from '../articles/articles.service';
import { ArticlesController } from '../articles/articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../articles/schemas/article.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { CronService } from './cron.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Articles', schema: ArticleSchema }]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, CronService],
  exports: [CronService],
})
export class CronModule {}
