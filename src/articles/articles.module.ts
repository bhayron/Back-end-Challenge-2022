import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Articles', schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
