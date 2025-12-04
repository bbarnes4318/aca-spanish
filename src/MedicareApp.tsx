import React from 'react';
import MedicareHeader from './components/medicare/MedicareHeader';
import MedicareHero from './components/medicare/MedicareHero';
import MedicareLeadForm from './components/medicare/MedicareLeadForm';
import MedicareBenefits from './components/medicare/MedicareBenefits';
import { MedicareLanguageProvider, useMedicareLanguage } from './contexts/MedicareLanguageContext';

function MedicareAppContent() {
  const { t } = useMedicareLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <MedicareHeader />
      <main>
        <MedicareHero />
        <div className="relative -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <MedicareLeadForm />
        </div>
        <MedicareBenefits />
      </main>
      
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm space-y-2">
            <p className="font-semibold text-white">{t('footer.title')}</p>
            <p>{t('footer.disclosure1')}</p>
            <p>{t('footer.disclosure2')}</p>
            <p className="pt-4 text-xs text-gray-400">
              © {new Date().getFullYear()} Medicare Enrollment. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <script id="LeadiDscript" type="text/javascript" dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var s = document.createElement('script');
            s.id = 'LeadiDscript_campaign';
            s.type = 'text/javascript';
            s.async = true;
            s.src = '//create.lidstatic.com/campaign/0ac017a5-bb32-67f9-1782-29ad33d047d7.js?snippet_version=2';
            var LeadiDscript = document.getElementById('LeadiDscript');
            LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
          })();
        `
      }} />
      <noscript>
        <img
          src="//create.leadid.com/noscript.gif?lac=A1E05D16-D3EF-C6AA-0F52-3C4598522A80&lck=0ac017a5-bb32-67f9-1782-29ad33d047d7&snippet_version=2"
          alt=""
        />
      </noscript>
    </div>
  );
}

function MedicareApp() {
  return (
    <MedicareLanguageProvider>
      <MedicareAppContent />
    </MedicareLanguageProvider>
  );
}

export default MedicareApp;

