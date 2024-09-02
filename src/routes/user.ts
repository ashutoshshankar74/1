 
import { Router } from 'express';
import { registerUser, subscribeUser } from '../controllers/userController';

const router = Router();
//console.log("user router executed");
router.post('/register', registerUser);
router.post('/subscribe', subscribeUser);

export default router;
