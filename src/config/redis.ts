import Redis from 'ioredis';
import dotenv from 'dotenv';

// Load environment variables from a .env file (optional, if using dotenv)
dotenv.config();

let redisConnection: Redis;

if (process.env.REDIS_URL) {
  // Use Redis URL from Render in production
  console.log("REDIS_URL");
  redisConnection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null, // Ensure this is set to null for BullMQ
  });
} else {

  console.log("REDIS_PORT AND LOCAL");
  // Use host and port for local development
  redisConnection = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    maxRetriesPerRequest: null, // Ensure this is set to null for BullMQ
  });
}

// Optional: Add additional logging to ensure environment variables are being read correctly
if (process.env.REDIS_URL) {
  console.log(`Connecting to Redis at ${process.env.REDIS_URL}`);
} else {
  console.log(`Connecting to Redis at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
}

// Export the Redis client instance for use in other parts of your application
export default redisConnection;
