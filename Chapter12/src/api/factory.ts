import type { Express, Request, Response, Router } from 'express';
import { and, eq, ilike, or, sql } from 'drizzle-orm';
import type { AnyPgTable } from 'drizzle-orm/pg-core';
import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { sendError, sendNotFound, sendSuccess } from '../utils/responses.js';
import { buildPaginationMeta, parsePaginationParams } from '../utils/pagination.js';
import { validate } from '../middleware/validate.js';
import { getValidationSchema } from '../validation/schemas.js';

type ExpressLike = Express | Router;

const isTable = (value: unknown): value is AnyPgTable =>
  typeof value === 'object' && value !== null && 'getSQL' in (value as AnyPgTable);

type TableName = keyof typeof schema;

const searchableColumns = ['name', 'title', 'email', 'content'];

export const registerDynamicRoutes = (app: ExpressLike) => {
  const tables = Object.entries(schema)
    .filter(([key, value]) => !key.includes('Relations') && isTable(value)) as [TableName, AnyPgTable][];

  tables.forEach(([tableName, table]) => {
    const resource = String(tableName);
    const basePath = `/${resource}`;
    const columns = (table.columns ?? {}) as Record<string, unknown>;
    const idColumn = columns.id;
    if (!idColumn) {
      return;
    }

    app.get(basePath, async (req: Request, res: Response) => {
      try {
        const pagination = parsePaginationParams(req);
        const { search, ...filters } = req.query;

        const conditions = Object.entries(filters)
          .filter(([key]) => key in columns)
          .map(([key, value]) => {
            let parsed: unknown = value;
            if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) {
              parsed = Number(value);
            }
            return eq(columns[key] as any, parsed as any);
          });

        if (search && typeof search === 'string') {
          const searchConditions = Object.entries(columns)
            .filter(([column]) => searchableColumns.includes(column))
            .map(([, column]) => ilike(column as any, `%${search}%`));

          if (searchConditions.length === 1) {
            conditions.push(searchConditions[0]);
          } else if (searchConditions.length > 1) {
            conditions.push(or(...searchConditions));
          }
        }

        const query = db.select().from(table);
        if (conditions.length === 1) {
          query.where(conditions[0]);
        } else if (conditions.length > 1) {
          query.where(and(...conditions));
        }

        const records = await query
          .limit(pagination.limit)
          .offset(pagination.offset);

        const [{ count }] = await db
          .select({ count: sql<number>`count(*)` })
          .from(table);

        const meta = buildPaginationMeta(Number(count), pagination);
        sendSuccess(res, records, 200, meta);
      } catch (error) {
        console.error(error);
        sendError(res, 'Failed to fetch records', 500);
      }
    });

    app.get(`${basePath}/:id`, async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const [record] = await db
          .select()
          .from(table)
          .where(eq(idColumn as any, Number(id)))
          .limit(1);

        if (!record) {
          return sendNotFound(res, resource);
        }

        sendSuccess(res, record);
      } catch (error) {
        console.error(error);
        sendError(res, 'Failed to fetch record', 500);
      }
    });

    app.post(
      basePath,
      validate(getValidationSchema(resource, 'create')),
      async (req: Request, res: Response) => {
        try {
          const data = req.body;
          const [created] = await db.insert(table).values(data).returning();
          sendSuccess(res, created, 201);
        } catch (error) {
          console.error(error);
          sendError(res, 'Failed to create record', 400);
        }
      }
    );

    app.put(
      `${basePath}/:id`,
      validate(getValidationSchema(resource, 'update')),
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const data = req.body;
          const [updated] = await db
            .update(table)
            .set(data)
            .where(eq(idColumn as any, Number(id)))
            .returning();

          if (!updated) {
            return sendNotFound(res, resource);
          }

          sendSuccess(res, updated);
        } catch (error) {
          console.error(error);
          sendError(res, 'Failed to update record', 400);
        }
      }
    );

    app.delete(`${basePath}/:id`, async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const deleted = await db
          .delete(table)
          .where(eq(idColumn as any, Number(id)))
          .returning();

        if (deleted.length === 0) {
          return sendNotFound(res, resource);
        }

        sendSuccess(res, { deleted: true });
      } catch (error) {
        console.error(error);
        sendError(res, 'Failed to delete record', 500);
      }
    });
  });
};
