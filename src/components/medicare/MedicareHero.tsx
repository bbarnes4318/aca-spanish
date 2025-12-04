import React from 'react';
import { useMedicareLanguage } from '../contexts/MedicareLanguageContext';

export default function MedicareHero() {
  const { t } = useMedicareLanguage();

  return (
    <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-15"
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
          alt="Medical professionals"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="tel:1-800-555-0123"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white shadow-lg transition-all hover:shadow-xl"
            >
              {t('hero.callButton')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

