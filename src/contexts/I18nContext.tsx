'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  texts: Record<string, any>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
  children,
  initialLanguage,
  initialTexts,
}: {
  children: React.ReactNode;
  initialLanguage: string;
  initialTexts: Record<string, any>;
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [texts, setTexts] = useState(initialTexts);

    useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("havenova_lang");
      if (storedLang && storedLang !== language) {
        setLanguage(storedLang); // Dispara useEffect de abajo
      }
    }
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("havenova_lang", language);
      document.cookie = `lang=${language}; path=/;`;
    }

    fetch(`/i18n/${language}.json`)
      .then((res) => res.json())
      .then((data) => setTexts(data))
      .catch((err) => {
        console.error("Error loading language file:", err);
        // Opcional: Si falla, muestra los textos iniciales
        setTexts(initialTexts);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]); 

  return (
    <I18nContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
