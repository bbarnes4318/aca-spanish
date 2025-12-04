
import { ArrowRightLeft, Users, DollarSign, Heart } from 'lucide-react';
import { useMedicareLanguage } from '../../contexts/MedicareLanguageContext';

export default function MedicareBenefits() {
  const { t } = useMedicareLanguage();

  const benefits = [
    {
      titleKey: 'benefits.comparison.title',
      descriptionKey: 'benefits.comparison.description',
      icon: ArrowRightLeft,
    },
    {
      titleKey: 'benefits.expert.title',
      descriptionKey: 'benefits.expert.description',
      icon: Users,
    },
    {
      titleKey: 'benefits.savings.title',
      descriptionKey: 'benefits.savings.description',
      icon: DollarSign,
    },
    {
      titleKey: 'benefits.coverage.title',
      descriptionKey: 'benefits.coverage.description',
      icon: Heart,
    },
  ];

  return (
    <div className="bg-linear-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('benefits.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="pt-6">
              <div className="flow-root bg-white rounded-xl px-6 pb-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-4 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                      <benefit.icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold text-gray-900 tracking-tight">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="mt-4 text-base text-gray-600 leading-relaxed">
                    {t(benefit.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
