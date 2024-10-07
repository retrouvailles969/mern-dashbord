import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import stockRouter from './routes/stock.routes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Ganti dengan URL aplikasi kamu
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/stocks', stockRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
}

startServer();