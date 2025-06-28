'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  texts: Record<string, any>;
  setTexts: (t: Record<string, any>) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children, initialLanguage, initialTexts }: {
  children: React.ReactNode;
  initialLanguage: string;
  initialTexts: Record<string, any>;
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [texts, setTexts] = useState(initialTexts);

  // Guarda idioma en cookie o localStorage al cambiarlo
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("havenova_lang", language);
      // Si quieres cookie para SSR
      document.cookie = `lang=${language}; path=/;`;
    }
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, texts, setTexts }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
