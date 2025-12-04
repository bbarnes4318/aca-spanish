import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import Benefits from './components/Benefits';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Hero />
          <div className="relative -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadForm />
          </div>
          <Benefits />
        </main>
        
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
    </LanguageProvider>
  );
}

export default App;