// src/workers/notificationWorker.ts
import { Worker } from 'bullmq';
import  redisConnection  from '../config/redis';
//console.log("notification worker triggered ");
const notificationWorker = new Worker('notifications', async job => {
  const { message, userId } = job.data;
  console.log(`Sending notification to user ${userId}: ${message}`);
}, {
  connection: redisConnection,
});

export default notificationWorker;
