import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Header
    'header.title': 'Inscripción de Salud',
    'header.callNow': 'Llame Ahora: 1-800-555-0123',
    
    // Hero
    'hero.title': 'Asegure Su Cobertura de Salud Hoy',
    'hero.subtitle': 'No espere hasta que sea demasiado tarde. Obtenga cobertura de seguro de salud asequible bajo la Ley de Cuidado de Salud Asequible y protéjase a usted y a sus seres queridos.',
    'hero.callButton': 'Llame para Cobertura Inmediata',
    
    // Lead Form
    'form.phoneLabel': 'Ingrese su número de teléfono para una cotización gratuita',
    'form.phonePlaceholder': '(555) 555-5555',
    'form.tcpaText': 'Al enviar este formulario, acepto recibir llamadas y mensajes de texto sobre seguros en el número proporcionado. Esto incluye mensajes de marketing enviados usando un marcador automático. Entiendo que el consentimiento no es necesario para realizar una compra.',
    'form.submitButton': 'Obtenga Su Cotización Gratuita',
    'form.submitting': 'Enviando...',
    'form.success': '¡Gracias! Nos pondremos en contacto con usted pronto.',
    'form.error': 'Hubo un error al enviar su información. Por favor, intente nuevamente.',
    
    // Benefits
    'benefits.title': '¿Por Qué Elegir Cobertura de Salud Con Nosotros?',
    'benefits.coverage.title': 'Cobertura Integral',
    'benefits.coverage.description': 'Obtenga cobertura para visitas al médico, recetas y atención preventiva',
    'benefits.affordable.title': 'Planes Asequibles',
    'benefits.affordable.description': 'Encuentre planes que se ajusten a su presupuesto con posibles subsidios',
    'benefits.immediate.title': 'Protección Inmediata',
    'benefits.immediate.description': 'Obtenga cobertura tan pronto como se procese su primer pago',
    'benefits.quality.title': 'Atención de Calidad',
    'benefits.quality.description': 'Acceso a los mejores proveedores de atención médica en su área',
  },
  en: {
    // Header
    'header.title': 'Health Enrollment',
    'header.callNow': 'Call Now: 1-800-555-0123',
    
    // Hero
    'hero.title': 'Secure Your Health Coverage Today',
    'hero.subtitle': 'Don\'t wait until it\'s too late. Get affordable health insurance coverage under the Affordable Care Act and protect yourself and your loved ones.',
    'hero.callButton': 'Call for Immediate Coverage',
    
    // Lead Form
    'form.phoneLabel': 'Enter your phone number for a free quote',
    'form.phonePlaceholder': '(555) 555-5555',
    'form.tcpaText': 'By submitting this form, I agree to receive calls and texts about insurance at the number provided. This includes marketing messages sent using an autodialer. I understand that consent is not required to make a purchase.',
    'form.submitButton': 'Get Your Free Quote',
    'form.submitting': 'Submitting...',
    'form.success': 'Thank you! We will contact you shortly.',
    'form.error': 'There was an error submitting your information. Please try again.',
    
    // Benefits
    'benefits.title': 'Why Choose Health Coverage With Us?',
    'benefits.coverage.title': 'Comprehensive Coverage',
    'benefits.coverage.description': 'Get coverage for doctor visits, prescriptions, and preventive care',
    'benefits.affordable.title': 'Affordable Plans',
    'benefits.affordable.description': 'Find plans that fit your budget with possible subsidies',
    'benefits.immediate.title': 'Immediate Protection',
    'benefits.immediate.description': 'Get covered as soon as your first payment is processed',
    'benefits.quality.title': 'Quality Care',
    'benefits.quality.description': 'Access to top healthcare providers in your area',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es'); // Default to Spanish

  const toggleLanguage = () => {
    setLanguage((prev: Language) => prev === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    const langTranslations = translations[language] as Record<string, string>;
    return langTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

