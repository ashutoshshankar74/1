import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

let redisConnection: Redis;

if (process.env.REDIS_URL) {
  // Use Redis URL from Render in production
  //console.log("REDIS_URL");
  redisConnection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null, 
  });
} else {

  //console.log("REDIS_PORT AND LOCAL");
  // Use host and port for local development
  redisConnection = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    maxRetriesPerRequest: null, 
  });
}

if (process.env.REDIS_URL) {
  console.log(`Connecting to Redis at ${process.env.REDIS_URL}`);
} else {
  console.log(`Connecting to Redis at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
}

export default redisConnection;
