import { Document } from 'mongoose';

export interface Article extends Document {
  readonly article: string;
  featured: string;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  launches: Array<Launches>;
  events: Array<Events>;
  number: Array<Count>;
}

export interface Launches {
  id: string;
  provider: string;
}

export interface Events {
  id: string;
  provider: string;
}

export interface Count {
  number: string;
}
