import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://health-enrollment.xyz'
}));
app.use(express.json());

app.post('/api/submit-lead', async (req, res) => {
  try {
    const { phone, leadid_token, tcpa_consent } = req.body;
    
    if (!phone || !leadid_token || tcpa_consent !== true) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Store the lead data
    const lead = {
      phone,
      leadid_token,
      tcpa_consent,
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      lead_id: leadid_token,
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