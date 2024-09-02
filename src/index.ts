import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import notificationRoutes from './routes/notification';
import 'dotenv/config';

import notificationWorker from './workers/notificationWorker';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', notificationRoutes);
console.log('Index.js is executed properly');


// Log the actual address where the server is running
app.listen(port, () => {
  const host = process.env.RENDER_EXTERNAL_HOST ;
  console.log(`Server is running on http://${host}:${port}`);
});
notificationWorker;
