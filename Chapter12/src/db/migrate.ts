import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { config } from '../config.js';

const runMigrations = async () => {
  const migrationClient = postgres(config.DATABASE_URL, { max: 1 });
  const migrationDb = drizzle(migrationClient);

  console.log('Running migrations...');
  await migrate(migrationDb, { migrationsFolder: './drizzle' });
  console.log('Migrations completed');

  await migrationClient.end();
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
