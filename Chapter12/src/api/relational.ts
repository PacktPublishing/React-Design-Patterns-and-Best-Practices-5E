import type { Express, Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { posts, users } from '../db/schema.js';
import { sendError, sendNotFound, sendSuccess } from '../utils/responses.js';

export const registerRelationalRoutes = (app: Express) => {
  app.get('/users/:id/with-posts', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await db.query.users.findFirst({
        where: eq(users.id, Number(id)),
        with: {
          posts: true
        }
      });

      if (!user) {
        return sendNotFound(res, 'User');
      }

      sendSuccess(res, user);
    } catch (error) {
      console.error(error);
      sendError(res, 'Failed to fetch user with posts', 500);
    }
  });

  app.get('/posts/:id/with-author', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await db.query.posts.findFirst({
        where: eq(posts.id, Number(id)),
        with: {
          author: true
        }
      });

      if (!post) {
        return sendNotFound(res, 'Post');
      }

      sendSuccess(res, post);
    } catch (error) {
      console.error(error);
      sendError(res, 'Failed to fetch post with author', 500);
    }
  });
};
