import { Document } from 'mongoose';

export interface ArticleInterface extends Document {
  readonly id: string;
  featured: string;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  launches: Array<Launches>;
  events: Array<Events>;
}

export interface Launches {
  id: string;
  provider: string;
}

export interface Events {
  id: string;
  provider: string;
}
