import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  leadid_token: {
    type: String,
    required: true,
    unique: true
  },
  tcpa_consent: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const Lead = mongoose.model('Lead', leadSchema);