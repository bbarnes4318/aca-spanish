import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-blue-700">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
          alt="Medical professionals"
        />
        <div className="absolute inset-0 bg-blue-700 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Secure Your Health Coverage Today
        </h1>
        <p className="mt-6 text-xl text-blue-100 max-w-3xl">
          Don't wait until it's too late. Get affordable health insurance coverage under the Affordable Care Act and protect yourself and your loved ones.
        </p>
        <div className="mt-10 flex space-x-4">
          <a
            href="tel:1-800-555-0123"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Call for Immediate Coverage
          </a>
        </div>
      </div>
    </div>
  );
}