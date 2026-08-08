import { createApp } from './app/create-app.js';
import { env } from './config/env.js';
import { logger } from './infrastructure/logging/logger.js';

const app = createApp();

app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'API listening');
});

