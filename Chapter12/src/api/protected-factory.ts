import { Router, type Express } from 'express';
import { authenticate } from '../middleware/auth.js';
import { registerDynamicRoutes } from './factory.js';

export const registerProtectedRoutes = (app: Express) => {
  const router = Router();
  router.use(authenticate);
  registerDynamicRoutes(router);
  app.use('/api', router);
};
