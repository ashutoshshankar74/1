import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import notificationRoutes from './routes/notification';
import 'dotenv/config';
import { Queue } from 'bullmq';
import notificationWorker from './workers/notificationWorker';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', notificationRoutes);
console.log('Index.js called');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

notificationWorker;
