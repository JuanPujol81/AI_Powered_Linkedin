import { Worker } from 'bullmq';
import { redis } from './infrastructure/cache/redis.js';
import { logger } from './infrastructure/logging/logger.js';
import { queueNames } from './infrastructure/queue/queues.js';

const generationWorker = new Worker(
  queueNames.generation,
  async (job) => {
    logger.info({ jobId: job.id }, 'Generation job received');
    throw new Error('Generation provider adapter is not configured yet');
  },
  { connection: redis, concurrency: 2 },
);

const publicationWorker = new Worker(
  queueNames.publication,
  async (job) => {
    logger.info({ jobId: job.id }, 'Publication job received');
    throw new Error('LinkedIn publisher adapter is not configured yet');
  },
  { connection: redis, concurrency: 1 },
);

for (const worker of [generationWorker, publicationWorker]) {
  worker.on('failed', (job, error) => {
    logger.error({ jobId: job?.id, error }, 'Job failed');
  });
}

logger.info('Background workers started');

