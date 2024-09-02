// src/workers/notificationWorker.ts
import { Worker } from 'bullmq';
import  redisConnection  from '../config/redis';
console.log("notification worker triggered ");
const notificationWorker = new Worker('notifications', async job => {
  const { message, userId } = job.data;
  
  // Here, you would implement your logic to send the notification, e.g., email, SMS, etc.
  console.log(`Sending notification to user ${userId}: ${message}`);

  // For simplicity, we're just logging the message.
}, {
  connection: redisConnection,
});

export default notificationWorker;
