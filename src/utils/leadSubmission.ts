import axios from 'axios';

interface LeadSubmission {
  phone: string;
  leadid_token: string;
  tcpa_consent: boolean;
}

const API_URL = 'https://health-enrollment-api-63cf21dd6ef9.herokuapp.com';

export async function submitLead(data: LeadSubmission) {
  try {
    const response = await axios.post(`${API_URL}/api/submit-lead`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
}