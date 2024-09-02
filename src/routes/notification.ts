import { Router } from 'express';
import { sendNotification } from '../controllers/notificationController';

const router = Router();

router.post('/notify', sendNotification);


export default router;
