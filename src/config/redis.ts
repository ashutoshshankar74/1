import { RedisOptions } from 'ioredis';

// Load environment variables from a .env file (optional, if using dotenv)
import dotenv from 'dotenv';
dotenv.config();

export const redisConnection: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  maxRetriesPerRequest: null, // Ensure this is set to null for BullMQ
};

// Optional: Add additional logging to ensure environment variables are being read correctly
console.log(`Connecting to Redis at ${redisConnection.host}:${redisConnection.port}`);
