import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moduleRoutes from './routes/moduleRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/modules', moduleRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/lessons', lessonRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const startServer = async () => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();

