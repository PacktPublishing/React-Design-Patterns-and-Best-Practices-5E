import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '../config.js';
import * as schema from './schema.js';

const queryClient = postgres(config.DATABASE_URL);

export const db = drizzle(queryClient, { schema });
export type Database = typeof db;
