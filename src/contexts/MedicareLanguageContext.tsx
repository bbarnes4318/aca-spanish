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
    'header.title': 'Inscripción de Medicare',
    'header.callNow': 'Llame Ahora: 1-800-555-0123',
    
    // Hero
    'hero.title': 'Encuentre el Plan de Medicare Perfecto para Usted',
    'hero.subtitle': 'Compare planes de Medicare Advantage, Medicare Supplement y Part D. Obtenga ayuda gratuita para encontrar la cobertura que mejor se adapte a sus necesidades y presupuesto.',
    'hero.callButton': 'Llame para Obtener Ayuda Gratuita',
    
    // Lead Form
    'form.title': 'Obtenga Su Cotización Gratuita',
    'form.firstNameLabel': 'Nombre',
    'form.firstNamePlaceholder': 'Juan',
    'form.lastNameLabel': 'Apellido',
    'form.lastNamePlaceholder': 'García',
    'form.phoneLabel': 'Número de Teléfono',
    'form.phonePlaceholder': '(555) 555-5555',
    'form.ageLabel': 'Edad',
    'form.agePlaceholder': '65',
    'form.tcpaText': 'Al enviar este formulario, acepto recibir llamadas y mensajes de texto sobre planes de Medicare en el número proporcionado. Esto incluye mensajes de marketing enviados usando un marcador automático. Entiendo que el consentimiento no es necesario para realizar una compra.',
    'form.medicareDisclosure': 'No estamos afiliados con el gobierno federal de los Estados Unidos ni con el programa federal de Medicare.',
    'form.submitButton': 'Obtener Cotización Gratuita',
    'form.submitting': 'Enviando...',
    'form.success': '¡Gracias! Un agente de Medicare se pondrá en contacto con usted pronto.',
    'form.error': 'Hubo un error al enviar su información. Por favor, intente nuevamente.',
    
    // Benefits
    'benefits.title': '¿Por Qué Elegir Nosotros para Su Cobertura de Medicare?',
    'benefits.comparison.title': 'Comparación Gratuita',
    'benefits.comparison.description': 'Compare múltiples planes de Medicare de diferentes compañías en un solo lugar',
    'benefits.expert.title': 'Asesoría de Expertos',
    'benefits.expert.description': 'Agentes licenciados disponibles para ayudarle a encontrar el plan adecuado',
    'benefits.savings.title': 'Ahorre Dinero',
    'benefits.savings.description': 'Encuentre planes que se ajusten a su presupuesto con primas y copagos asequibles',
    'benefits.coverage.title': 'Cobertura Completa',
    'benefits.coverage.description': 'Planes que incluyen servicios médicos, recetas y atención preventiva',
    
    // Footer
    'footer.title': 'Información Importante de Medicare:',
    'footer.disclosure1': 'No estamos afiliados con el gobierno federal de los Estados Unidos ni con el programa federal de Medicare.',
    'footer.disclosure2': 'Medicare no ha revisado ni respaldado esta información. No está conectado con ni respaldado por el gobierno de los Estados Unidos o el programa federal de Medicare.',
  },
  en: {
    // Header
    'header.title': 'Medicare Enrollment',
    'header.callNow': 'Call Now: 1-800-555-0123',
    
    // Hero
    'hero.title': 'Find the Perfect Medicare Plan for You',
    'hero.subtitle': 'Compare Medicare Advantage, Medicare Supplement, and Part D plans. Get free help finding the coverage that best fits your needs and budget.',
    'hero.callButton': 'Call for Free Help',
    
    // Lead Form
    'form.title': 'Get Your Free Quote',
    'form.firstNameLabel': 'First Name',
    'form.firstNamePlaceholder': 'John',
    'form.lastNameLabel': 'Last Name',
    'form.lastNamePlaceholder': 'Smith',
    'form.phoneLabel': 'Phone Number',
    'form.phonePlaceholder': '(555) 555-5555',
    'form.ageLabel': 'Age',
    'form.agePlaceholder': '65',
    'form.tcpaText': 'By submitting this form, I agree to receive calls and texts about Medicare plans at the number provided. This includes marketing messages sent using an autodialer. I understand that consent is not required to make a purchase.',
    'form.medicareDisclosure': 'We are not affiliated with the United States government or the federal Medicare program.',
    'form.submitButton': 'Get Free Quote',
    'form.submitting': 'Submitting...',
    'form.success': 'Thank you! A Medicare agent will contact you shortly.',
    'form.error': 'There was an error submitting your information. Please try again.',
    
    // Benefits
    'benefits.title': 'Why Choose Us for Your Medicare Coverage?',
    'benefits.comparison.title': 'Free Comparison',
    'benefits.comparison.description': 'Compare multiple Medicare plans from different companies all in one place',
    'benefits.expert.title': 'Expert Guidance',
    'benefits.expert.description': 'Licensed agents available to help you find the right plan',
    'benefits.savings.title': 'Save Money',
    'benefits.savings.description': 'Find plans that fit your budget with affordable premiums and copays',
    'benefits.coverage.title': 'Complete Coverage',
    'benefits.coverage.description': 'Plans that include medical services, prescriptions, and preventive care',
    
    // Footer
    'footer.title': 'Important Medicare Information:',
    'footer.disclosure1': 'We are not affiliated with the United States government or the federal Medicare program.',
    'footer.disclosure2': 'Medicare has neither reviewed nor endorsed this information. Not connected with or endorsed by the U.S. government or the federal Medicare program.',
  },
};

export function MedicareLanguageProvider({ children }: { children: ReactNode }) {
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

export function useMedicareLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useMedicareLanguage must be used within a MedicareLanguageProvider');
  }
  return context;
}

