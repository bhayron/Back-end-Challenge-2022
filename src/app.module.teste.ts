import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_TEST_CONNECTION_URI),
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModuleTest {}
