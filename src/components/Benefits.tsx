import React from 'react';
import { Shield, Heart, DollarSign, Clock } from 'lucide-react';

const benefits = [
  {
    title: 'Comprehensive Coverage',
    description: 'Get coverage for doctor visits, prescriptions, and preventive care',
    icon: Shield,
  },
  {
    title: 'Affordable Plans',
    description: 'Find plans that fit your budget with possible subsidies',
    icon: DollarSign,
  },
  {
    title: 'Immediate Protection',
    description: 'Get covered as soon as your first payment is processed',
    icon: Clock,
  },
  {
    title: 'Quality Care',
    description: 'Access to top healthcare providers in your area',
    icon: Heart,
  },
];

export default function Benefits() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Health Coverage With Us?
          </h2>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">{benefit.description}</p>
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