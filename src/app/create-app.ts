import express from 'express';
import pinoHttp from 'pino-http';
import { logger } from '../infrastructure/logging/logger.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));
  app.use(pinoHttp({ logger }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  return app;
}

