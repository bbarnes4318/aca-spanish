import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Lead } from './models/Lead.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

app.post('/api/submit-lead', async (req, res) => {
  try {
    const { phone, leadid_token, tcpa_consent } = req.body;
    
    if (!phone || !leadid_token || tcpa_consent !== true) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Store lead in MongoDB
    const lead = await Lead.create({
      phone,
      leadid_token,
      tcpa_consent,
      timestamp: new Date()
    });

    res.json({
      success: true,
      lead_id: lead.leadid_token,
      timestamp: lead.timestamp
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ error: 'Failed to process lead' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});