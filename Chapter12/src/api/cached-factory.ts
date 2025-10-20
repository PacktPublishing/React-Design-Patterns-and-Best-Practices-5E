import type { Express, Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import type { AnyPgTable } from 'drizzle-orm/pg-core';
import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { config } from '../config.js';
import { cache } from '../utils/cache.js';
import { sendError, sendNotFound, sendSuccess } from '../utils/responses.js';

const isTable = (value: unknown): value is AnyPgTable =>
  typeof value === 'object' && value !== null && 'getSQL' in (value as AnyPgTable);

type TableName = keyof typeof schema;

export const registerCachedRoutes = (app: Express) => {
  const tables = Object.entries(schema)
    .filter(([key, value]) => !key.includes('Relations') && isTable(value)) as [TableName, AnyPgTable][];

  tables.forEach(([tableName, table]) => {
    const columns = (table.columns ?? {}) as Record<string, unknown>;
    const idColumn = columns.id;
    if (!idColumn) {
      return;
    }
    const basePath = `/${String(tableName)}`;

    app.get(`${basePath}/:id`, async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const cacheKey = `${tableName}:${id}`;

        const cached = cache.get(cacheKey);
        if (cached) {
          return sendSuccess(res, cached);
        }

        const [record] = await db
          .select()
          .from(table)
          .where(eq(idColumn as any, Number(id)))
          .limit(1);

        if (!record) {
          return sendNotFound(res, String(tableName));
        }

        cache.set(cacheKey, record, config.CACHE_TTL);
        sendSuccess(res, record);
      } catch (error) {
        console.error(error);
        sendError(res, 'Failed to fetch record', 500);
      }
    });

    app.put(`${basePath}/:id`, async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const data = req.body;

        const [updated] = await db
          .update(table)
          .set(data)
          .where(eq(idColumn as any, Number(id)))
          .returning();

        if (!updated) {
          return sendNotFound(res, String(tableName));
        }

        cache.delete(`${tableName}:${id}`);
        cache.invalidatePattern(`${tableName}:.*with.*`);

        sendSuccess(res, updated);
      } catch (error) {
        console.error(error);
        sendError(res, 'Failed to update record', 400);
      }
    });
  });
};
