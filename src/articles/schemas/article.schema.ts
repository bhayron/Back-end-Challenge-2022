import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema(
  {
    featured: { type: String },
    title: { type: String },
    url: { type: String },
    imageUrl: { type: String },
    newsSite: { type: String },
    summary: { type: String },
    launches: [
      {
        provider: { type: String },
      },
    ],
    events: [
      {
        provider: { type: String },
      },
    ],
    publishedAt: { type: String },
  },

  { timestamps: true, collection: 'articles' },
);
