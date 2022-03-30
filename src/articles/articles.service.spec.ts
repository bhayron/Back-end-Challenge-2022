import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  const exampleArticle: CreateArticleDto = {
    featured: 'true',
    title: 'Synspective raises $100 million Series B round',
    url: 'https://spacenews.com/synspective-raises-100-million-series-b-round',
    imageUrl:
      'https://spacenews.com/wp-content/uploads/2019/07/rsz_synspective_satellite-250x250.pn',
    newsSite: 'SpaceNews',
    summary:
      'Japanese startup Synspective announced March 29 it raised $100 million to continue its development of a constellation of synthetic aperture radar (SAR) satellites.',
    publishedAt: '2022-03-29T11:09:22.000Z',
    launches: [],
    events: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
