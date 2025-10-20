import type { Express, Request, Response } from 'express';
import { sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { posts } from '../db/schema.js';
import { sendError, sendSuccess } from '../utils/responses.js';
import { buildPaginationMeta, parsePaginationParams } from '../utils/pagination.js';

export const registerSearchRoutes = (app: Express) => {
  app.get('/search/posts', async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return sendError(res, 'Search query required', 400);
      }

      const pagination = parsePaginationParams(req);

      const results = await db
        .select()
        .from(posts)
        .where(sql`${posts.searchVector} @@ plainto_tsquery('english', ${q})`)
        .limit(pagination.limit)
        .offset(pagination.offset);

      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(posts)
        .where(sql`${posts.searchVector} @@ plainto_tsquery('english', ${q})`);

      const meta = buildPaginationMeta(Number(count), pagination);
      sendSuccess(res, results, 200, meta);
    } catch (error) {
      console.error(error);
      sendError(res, 'Search failed', 500);
    }
  });
};
