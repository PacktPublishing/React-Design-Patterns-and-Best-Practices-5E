import type { Express, Request, Response } from "express";
import { eq, getTableColumns, getTableName } from "drizzle-orm";
import { db } from "../db/index";
import * as schema from "../db/schema";
import { sendError, sendNotFound, sendSuccess } from "../utils/responses";
import { loadFkMap } from "../utils/fkmap";

export const registerDynamicRelationalRoutes = async (app: Express) => {
  const fkMap = await loadFkMap(db);

  const relationEntries = Object.entries(schema).filter(([key]) =>
    key.endsWith("Relations")
  );

  relationEntries.forEach(([relationKey, relationValue]: [string, any]) => {
    const tableName = relationKey.replace("Relations", "");
    const relations = fkMap[tableName];
    const table = (schema as Record<string, unknown>)[tableName];

    if (!table || typeof relationValue !== "object" || relationValue === null) {
      return;
    }

    const columns = getTableColumns(table as any);

    const idColumn = (columns as Record<string, unknown>).id;

    if (!idColumn) {
      return;
    }

    if (!relations || relations.length === 0) {
      return;
    }

    relations.forEach((relation: any) => {
      const route = `/api/${tableName}/:id/with-${relation.toTable}`;

      app.get(route, async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const query = (db.query as Record<string, any>)[tableName];

          if (!query) {
            return sendError(res, "Relation not configured", 500);
          }

          const record = await query.findFirst({
            where: eq(idColumn as any, Number(id)),
            with: {
              [relation.toTable]: true,
            },
          });

          if (!record) {
            return sendNotFound(res, tableName);
          }

          sendSuccess(res, record);
        } catch (error) {
          console.error(error);
          sendError(res, "Failed to fetch related data", 500);
        }
      });
    });
  });
};
