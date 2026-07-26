import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return sessionStorage.getItem('temple_lang') || null;
  });

  const selectLanguage = (language) => {
    sessionStorage.setItem('temple_lang', language);
    setLang(language);
  };

  const isHindi = lang === 'hi';
  const isEnglish = lang === 'en';
  const t = (hi, en) => (lang === 'hi' ? hi : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang: selectLanguage, isHindi, isEnglish, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

export default LanguageContext;
