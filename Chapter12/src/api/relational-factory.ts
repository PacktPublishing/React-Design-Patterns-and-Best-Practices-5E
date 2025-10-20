import type { Express, Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { sendError, sendNotFound, sendSuccess } from '../utils/responses.js';

export const registerDynamicRelationalRoutes = (app: Express) => {
  const relationEntries = Object.entries(schema).filter(([key]) => key.endsWith('Relations'));

  relationEntries.forEach(([relationKey, relationValue]) => {
    const tableName = relationKey.replace('Relations', '');
    const table = (schema as Record<string, unknown>)[tableName];

    if (!table || typeof relationValue !== 'object' || relationValue === null) {
      return;
    }

    const columns = (table as { columns?: Record<string, unknown> }).columns ?? {};
    const idColumn = (columns as Record<string, unknown>).id;
    if (!idColumn) {
      return;
    }
    const relations = relationValue as Record<string, unknown>;

    Object.keys(relations).forEach((relationName) => {
      const route = `/${tableName}/:id/with-${relationName}`;

      app.get(route, async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const query = (db.query as Record<string, any>)[tableName];

          if (!query) {
            return sendError(res, 'Relation not configured', 500);
          }

          const record = await query.findFirst({
            where: eq(idColumn as any, Number(id)),
            with: {
              [relationName]: true
            }
          });

          if (!record) {
            return sendNotFound(res, tableName);
          }

          sendSuccess(res, record);
        } catch (error) {
          console.error(error);
          sendError(res, 'Failed to fetch related data', 500);
        }
      });
    });
  });
};
