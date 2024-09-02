import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import notificationRoutes from './routes/notification';
import 'dotenv/config';
import notificationWorker from './workers/notificationWorker';

const app = express();

const port = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Notification System API');
});

app.use('/api', userRoutes);
app.use('/api', notificationRoutes);

//console.log('Index.js is executed properly');

app.listen(port, '0.0.0.0', () => {
    const host = process.env.RENDER_EXTERNAL_HOST || 'localhost';
    console.log(`Server is running on http://${host}:${port}`);
});

notificationWorker;
