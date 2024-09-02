import { Router } from 'express';
import { sendNotification } from '../controllers/notificationController';

const router = Router();
console.log("notification router executed");
router.post('/notify', sendNotification);


export default router;
