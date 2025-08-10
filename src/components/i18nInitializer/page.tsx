// components/I18nInitializer.tsx
'use client';
import { useEffect, useState } from 'react';
import { I18nProvider } from '../../contexts/I18nContext';
import deTexts from '../../../public/i18n/de.json';
import enTexts from '../../../public/i18n/en.json';

export default function I18nInitializer({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [texts, setTexts] = useState(deTexts);
  const [ready, setReady] = useState(false); // Para evitar render antes de cargar idioma

  useEffect(() => {
    const storedLang = (localStorage.getItem('havenova_lang') as 'de' | 'en') || 'de';
    setLang(storedLang);
    setTexts(storedLang === 'de' ? deTexts : enTexts);
    setReady(true);
  }, []);

  if (!ready) return null; // Evita parpadeo con idioma incorrecto

  return (
    <I18nProvider initialLanguage={lang} initialTexts={texts}>
      {children}
    </I18nProvider>
  );
}
