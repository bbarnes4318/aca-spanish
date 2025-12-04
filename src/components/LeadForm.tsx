import React, { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LeadForm() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Load TrustedForm script
    const tf = document.createElement('script');
    tf.type = 'text/javascript';
    tf.async = true;
    tf.src = (window.location.protocol === 'https:' ? 'https' : 'http') +
      '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
      new Date().getTime() + Math.random();
    
    const s = document.getElementsByTagName('script')[0];
    s.parentNode?.insertBefore(tf, s);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.src = 'https://api.trustedform.com/ns.gif';
    noscript.appendChild(img);
    document.body.appendChild(noscript);

    return () => {
      // Cleanup
      if (tf.parentNode) {
        tf.parentNode.removeChild(tf);
      }
      if (noscript.parentNode) {
        noscript.parentNode.removeChild(noscript);
      }
    };
  }, []);

  const submitToGoogleSheets = async (formData: any) => {
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL'; // Replace with your web app URL
    
    await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const leadidToken = document.getElementById('leadid_token')?.getAttribute('value') || '';
      const certUrl = (document.getElementsByName('xxTrustedFormCertUrl')[0] as HTMLInputElement)?.value || '';
      const formData = {
        phone,
        leadid_token: leadidToken,
        tcpa_consent: true,
        trusted_form_cert_url: certUrl,
        timestamp: new Date().toISOString()
      };
      
      // Submit to your API
      const response = await fetch('https://health-enrollment-api-63cf21dd6ef9.herokuapp.com/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to API');
      }

      // Submit to Google Sheets
      await submitToGoogleSheets(formData);

      setPhone('');
      alert(t('form.success'));
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-md mx-auto p-6">
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="hidden" name="xxTrustedFormCertUrl" value="" />
        <input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
        <div className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              {t('form.phoneLabel')}
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
                placeholder={t('form.phonePlaceholder')}
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
              {t('form.tcpaText')}
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? t('form.submitting') : t('form.submitButton')}
          </button>
        </div>
      </form>
    </div>
  );
}