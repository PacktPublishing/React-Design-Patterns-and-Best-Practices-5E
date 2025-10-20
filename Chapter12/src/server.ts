import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { config } from './config.js';
import { registerDynamicRoutes } from './api/factory.js';
import { registerRelationalRoutes } from './api/relational.js';
import { registerDynamicRelationalRoutes } from './api/relational-factory.js';
import { registerCachedRoutes } from './api/cached-factory.js';
import { registerSearchRoutes } from './api/search.js';
import { apiLimiter } from './middleware/rateLimit.js';

dotenv.config();

const app: Express = express();
const PORT = Number(config.PORT) || 3000;

app.use(helmet());
app.use(cors({
  origin: config.ALLOWED_ORIGINS.split(','),
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', apiLimiter);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

registerCachedRoutes(app);
registerDynamicRoutes(app);
registerRelationalRoutes(app);
registerDynamicRelationalRoutes(app);
registerSearchRoutes(app);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: config.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
