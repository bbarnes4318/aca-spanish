import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as leadRoutes } from './routes/leads.js';
import { connectDB } from './config/db.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://health-enrollment.xyz'
}));
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});