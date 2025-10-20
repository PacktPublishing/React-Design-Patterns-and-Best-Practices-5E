import express from 'express';
import { config } from './config.js';
import './db/index.js';
import { registerDynamicRoutes } from './api/factory.js';
import { registerRelationalRoutes } from './api/relational.js';
import { registerDynamicRelationalRoutes } from './api/relational-factory.js';
import { registerCachedRoutes } from './api/cached-factory.js';
import { registerSearchRoutes } from './api/search.js';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

registerCachedRoutes(app);
registerDynamicRoutes(app);
registerRelationalRoutes(app);
registerDynamicRelationalRoutes(app);
registerSearchRoutes(app);

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log('📊 Database connected');
  console.log('⚡ Dynamic APIs active');
});

export default app;
