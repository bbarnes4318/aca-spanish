import express from 'express';
import { Lead } from '../models/Lead.js';

export const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const { phone, leadid_token, tcpa_consent } = req.body;
    
    if (!phone || !leadid_token || tcpa_consent !== true) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const lead = await Lead.create({
      phone,
      leadid_token,
      tcpa_consent
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