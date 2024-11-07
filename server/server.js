import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Lead } from './models/Lead.js';
import { processCsvFile } from './utils/csvProcessor.js';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// Routes
app.post('/api/submit-lead', async (req, res) => {
  try {
    const { phone, leadid_token, tcpa_consent } = req.body;
    
    if (!phone || !leadid_token || tcpa_consent !== true) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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

// CSV Upload endpoint
app.post('/api/upload-csv', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const processedCount = await processCsvFile(req.file.path);
    res.json({ success: true, processedLeads: processedCount });
  } catch (error) {
    console.error('CSV processing error:', error);
    res.status(500).json({ error: 'Failed to process CSV' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});