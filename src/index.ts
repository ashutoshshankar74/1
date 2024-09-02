import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import notificationRoutes from './routes/notification';
import 'dotenv/config';
import notificationWorker from './workers/notificationWorker';

const app = express();

// Convert process.env.PORT to a number
const port = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', notificationRoutes);

console.log('Index.js is executed properly');

// Log the actual address where the server is running
app.listen(port, '0.0.0.0', () => {
  const host = process.env.RENDER_EXTERNAL_HOST || 'localhost';
  console.log(`Server is running on http://${host}:${port}`);
});

// Start the notification worker
notificationWorker;
console.log("index.js comes to an end");