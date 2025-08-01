import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use((req, res, next) => {
  next();
});

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.use(errorHandler);

export default app;
