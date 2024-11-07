import { useState } from 'react';
import { Phone } from 'lucide-react';
import axios from 'axios';

export default function LeadForm() {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const leadidToken = document.getElementById('leadid_token')?.getAttribute('value') || '';
      
      const response = await axios.post('https://jornaya.herokuapp.com/api/submit-lead', {
        phone,
        leadid_token: leadidToken,
        tcpa_consent: true
      });

      if (response.data.success) {
        setPhone('');
        alert('Thank you! We will contact you shortly.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
        <div className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Enter your phone number for a free quote
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="(555) 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex items-start">
            <input
              id="leadid_tcpa_disclosure"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="leadid_tcpa_disclosure" className="ml-2 block text-sm text-gray-600">
              By submitting this form, I agree to receive calls and texts about insurance at the number provided.
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Get Your Free Quote'}
          </button>
        </div>
      </form>
    </div>
  );
}