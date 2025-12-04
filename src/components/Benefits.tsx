import React from 'react';
import { Shield, Heart, DollarSign, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Benefits() {
  const { t } = useLanguage();

  const benefits = [
    {
      titleKey: 'benefits.coverage.title',
      descriptionKey: 'benefits.coverage.description',
      icon: Shield,
    },
    {
      titleKey: 'benefits.affordable.title',
      descriptionKey: 'benefits.affordable.description',
      icon: DollarSign,
    },
    {
      titleKey: 'benefits.immediate.title',
      descriptionKey: 'benefits.immediate.description',
      icon: Clock,
    },
    {
      titleKey: 'benefits.quality.title',
      descriptionKey: 'benefits.quality.description',
      icon: Heart,
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('benefits.title')}
          </h2>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {t(benefit.titleKey)}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">{t(benefit.descriptionKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}