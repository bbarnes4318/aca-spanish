
import { Shield, Languages } from 'lucide-react';
import { useMedicareLanguage } from '../../contexts/MedicareLanguageContext';

export default function MedicareHeader() {
  const { t, language, toggleLanguage } = useMedicareLanguage();

  return (
    <header className="bg-white shadow-sm border-b-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">{t('header.title')}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4 mr-2" />
              {language === 'es' ? 'English' : 'Español'}
            </button>
            <a
              href="tel:1-800-555-0123"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t('header.callNow')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

