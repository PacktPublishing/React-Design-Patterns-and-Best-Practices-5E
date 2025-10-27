import { sql } from "drizzle-orm";

type FK = {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  constraint: string;
};

function normalizeRows<T = unknown>(res: unknown): T[] {
  // Drizzle + postgres-js/neon often returns an array
  if (Array.isArray(res)) return res as T[];
  // Drizzle + node-postgres tends to return { rows }
  if (res && typeof res === "object" && "rows" in (res as any)) {
    return ((res as any).rows ?? []) as T[];
  }
  return [];
}

export async function loadFkMap(db: any, schema = "public") {
  const res = await db.execute(sql<FK>`
    select
      tc.table_name   as "fromTable",
      kcu.column_name as "fromColumn",
      ccu.table_name  as "toTable",
      ccu.column_name as "toColumn",
      tc.constraint_name as "constraint"
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_name = kcu.constraint_name
     and tc.table_schema = kcu.table_schema
    join information_schema.constraint_column_usage ccu
      on ccu.constraint_name = tc.constraint_name
     and ccu.table_schema = tc.table_schema
    where tc.constraint_type = 'FOREIGN KEY'
      and tc.table_schema = ${schema}
    order by "fromTable", "constraint", "fromColumn"
  `);

  const rows = normalizeRows<FK>(res);

  // Optional: guard so failures are obvious
  if (!Array.isArray(rows)) {
    throw new Error("Unexpected shape from db.execute(); got: " + typeof res);
  }

  // Group multi-column FKs under the same constraint
  type Edge = { toTable: string; fromColumns: string[]; toColumns: string[] };
  const byConstraint = new Map<string, { fromTable: string; edge: Edge }>();

  for (const fk of rows) {
    const key = `${fk.fromTable}→${fk.toTable}::${fk.constraint}`;
    const found = byConstraint.get(key);
    if (found) {
      found.edge.fromColumns.push(fk.fromColumn);
      found.edge.toColumns.push(fk.toColumn);
    } else {
      byConstraint.set(key, {
        fromTable: fk.fromTable,
        edge: {
          toTable: fk.toTable,
          fromColumns: [fk.fromColumn],
          toColumns: [fk.toColumn],
        },
      });
    }
  }

  // Shape it however you like; here’s a simple adjacency list:
  const map: Record<string, Edge[]> = {};
  for (const { fromTable, edge } of byConstraint.values()) {
    (map[fromTable] ??= []).push(edge);
  }
  return map;
}
