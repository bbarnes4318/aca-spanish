import fs from 'fs';

// Create directories
['frontend', 'frontend/src', 'frontend/src/components', 'frontend/src/utils', 'backend', 'backend/models'].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// Backend files
const backendFiles = {
  'backend/package.json': JSON.stringify({
    "name": "health-enrollment-api",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js"
    },
    "dependencies": {
      "cors": "^2.8.5",
      "express": "^4.18.2",
      "dotenv": "^16.4.1",
      "mongoose": "^8.8.0"
    },
    "devDependencies": {
      "nodemon": "^3.0.3"
    },
    "engines": {
      "node": ">=18.0.0"
    }
  }, null, 2),
  
  'backend/server.js': `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Lead } from './models/Lead.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use(cors({

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,

  'backend/models/Lead.js': `import mongoose from 'mongoose';
    type: Date,
    default: Date.now
  }
});

export const Lead = mongoose.model('Lead', leadSchema);`,

  'backend/.env': `PORT=3001
MONGODB_URI=mongodb+srv://bbarnes4318:Toobs3560@@health-enrollment-api.twjpn.mongodb.net/?retryWrites=true&w=majority&appName=health-enrollment-api
FRONTEND_URL=*`,

  'backend/Procfile': 'web: node server.js'
};

// Frontend files
const frontendFiles = {
  'frontend/package.json': JSON.stringify({
    "name": "health-enrollment-frontend",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      "preview": "vite preview"
    },
    "dependencies": {
      "axios": "^1.6.7",
      "lucide-react": "^0.344.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "devDependencies": {
      "@types/react": "^18.2.56",
      "@types/react-dom": "^18.2.19",
      "@typescript-eslint/eslint-plugin": "^7.0.2",
      "@typescript-eslint/parser": "^7.0.2",
      "@vitejs/plugin-react": "^4.2.1",
      "autoprefixer": "^10.4.18",
      "eslint": "^8.56.0",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.5",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.2.2",
      "vite": "^5.1.4"
    }
  }, null, 2),

  'frontend/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/shield.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Health Insurance Enrollment</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

  'frontend/src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

  'frontend/src/App.tsx': `import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import Benefits from './components/Benefits';

function App() {
  return (
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
        __html: \`
        <img
          src="//create.leadid.com/noscript.gif?lac=A1E05D16-D3EF-C6AA-0F52-3C4598522A80&lck=0ac017a5-bb32-67f9-1782-29ad33d047d7&snippet_version=2"
          alt=""
        />
      </noscript>
    </div>
  );
}

export default App;`,

  'frontend/src/components/Header.tsx': `import React from 'react';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Health Enrollment</span>
          </div>
          <a
            href="tel:1-800-555-0123"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Call Now: 1-800-555-0123
          </a>
        </div>
      </div>
    </header>
  );
}`,

  'frontend/src/components/Hero.tsx': `import React from 'react';

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
}`,

  'frontend/src/components/LeadForm.tsx': `import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import axios from 'axios';

export default function LeadForm() {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
}`,

  'frontend/src/components/Benefits.tsx': `import React from 'react';
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
}`,

  'frontend/src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;`,

  'frontend/tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,

  'frontend/vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,

  'frontend/.env': `VITE_API_URL=https://health-enrollment-api-63cf21dd6ef9.herokuapp.com`
};

// Write backend files
Object.entries(backendFiles).forEach(([filename, content]) => {
  fs.writeFileSync(filename, content);
  console.log('Created ' + filename);
});

// Write frontend files
Object.entries(frontendFiles).forEach(([filename, content]) => {
  fs.writeFileSync(filename, content);
  console.log('Created ' + filename);
});