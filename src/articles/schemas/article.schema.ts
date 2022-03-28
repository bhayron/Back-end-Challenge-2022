import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    featured: { type: String },
    title: { type: String },
    url: { type: String },
    imageUrl: { type: String },
    newsSite: { type: String },
    summary: { type: String },
    publishedAt: { type: String },
    launches: [
      {
        id: { type: String },
        provider: { type: String },
      },
    ],
    events: [
      {
        id: { type: String },
        provider: { type: String },
      },
    ],
  },
  { timestamps: true, collection: 'articles' },
);
