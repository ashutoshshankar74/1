// src/config/redis.ts
import { RedisOptions } from 'ioredis';

export const redisConnection: RedisOptions = {
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null, // Ensure this is set to null for BullMQ
};
