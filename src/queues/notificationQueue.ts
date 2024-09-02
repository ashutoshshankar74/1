// src/queues/notificationQueue.ts
import { Queue } from 'bullmq';
import  redisConnection  from '../config/redis';

const notificationQueue = new Queue('notifications', {
  connection: redisConnection,
});
console.log(`notification queue executed`);
export default notificationQueue;
