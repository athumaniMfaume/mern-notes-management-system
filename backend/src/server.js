import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(rateLimiter);

// 🧩 FIX 1: Correct environment check
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );
} else {
  // 🧩 FIX 2: Serve frontend when in production
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Routes
app.use('/api/notes', notesRoutes);

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('server is running on port:', PORT);
  });
});
