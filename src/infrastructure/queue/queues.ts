import { Queue } from 'bullmq';
import { redis } from '../cache/redis.js';

export const queueNames = {
  generation: 'content-generation',
  publication: 'linkedin-publication',
} as const;

export const generationQueue = new Queue(queueNames.generation, { connection: redis });
export const publicationQueue = new Queue(queueNames.publication, { connection: redis });

