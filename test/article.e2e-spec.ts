import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModuleTest } from '../src/app.module.teste';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';

describe('AppController (e2e)', () => {
  const articles = {
    featured: 'true',
    title: 'Synspective raises $100 million Series B round',
    url: 'https://spacenews.com/synspective-raises-100-million-series-b-round',
    imageUrl:
      'https://spacenews.com/wp-content/uploads/2019/07/rsz_synspective_satellite-250x250.pn',
    newsSite: 'SpaceNews',
    summary:
      'Japanese startup Synspective announced March 29 it raised $100 million to continue its development of a constellation of synthetic aperture radar (SAR) satellites.',
    publishedAt: '2022-03-29T11:09:22.000Z',
    launches: [
      {
        provider: 'Launch Library 2',
      },
    ],
    events: [
      {
        provider: 'Test Provider',
      },
    ],
  };
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModuleTest],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('it shout to response 200 in articles', () => {
    return request(app.getHttpServer()).get('/articles').expect(200);
  });
  it('it shout to response 200 in articles paginate', () => {
    return request(app.getHttpServer())
      .get('/articles?limit=2&skip=1')
      .expect(200);
  });
  it('it shout to create a article and response 201', () => {
    return request(app.getHttpServer())
      .post('/articles')
      .send(articles as CreateArticleDto)
      .expect(201)
      .expect(HttpStatus.CREATED);
  });
  it('it shout to delete a article and response 200', () => {
    return request(app.getHttpServer())
      .delete('/articles/6244649df6f3d2dcda6839be')
      .expect(200);
  });
});
