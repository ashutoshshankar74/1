import { Request, Response } from 'express';
import notificationQueue from '../queues/notificationQueue';
import { PrismaClient } from '@prisma/client';
//import worker from '../workers/notificationWorker';

const prisma = new PrismaClient();
// console.log("notification controller file executed");
export const sendNotification = async (req: Request, res: Response) => {
  const { message } = req.body;
  console.log("send_notification triggered");
  if (!message) {
    console.error("Invalid Data");
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    // Fetch all subscribed users
    const subscriptions = await prisma.subscription.findMany({
      include: { user: true },
    });

    if (subscriptions.length === 0) {
      console.error("No user subscribed");
      return res.status(200).json({ message: 'No users subscribed' });
    }

    // Add a job to the queue for each subscribed user
    subscriptions.forEach(async (subscription) => {
      try {
        const job = await notificationQueue.add('sendNotification', {
          message,
          userId: subscription.user.id,
          type: subscription.type,
        });
      

        //console.log(`Job ${subscription.type} queued for user ${subscription.user.id}`);
      } catch (error) {
        console.error('Error adding job to queue:', error);
      }
    });

    return res.status(200).json({ message: 'Notifications queued for all subscribed users' });
  } catch (error) {
    console.error('Error queuing notifications:', error);
    return res.status(500).json({ error: 'Failed to queue notifications' });
  }
};
