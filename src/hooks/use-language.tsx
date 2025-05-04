
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { translations } from "@/lib/translations";

type Language = "en" | "ar";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Only run on first mount
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language | null;
    if (savedLang && (savedLang === "en" || savedLang === "ar")) {
      setCurrentLanguage(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    }
    setIsFirstLoad(false);
  }, []);

  // Memoize the translations for the current language to prevent unnecessary re-renders
  const currentTranslations = useMemo(() => 
    translations[currentLanguage], [currentLanguage]
  );

  const setLanguage = (lang: Language) => {
    if (lang === currentLanguage) return; // Don't do anything if language is the same
    
    setCurrentLanguage(lang);
    localStorage.setItem("lang", lang);
    
    // Update document direction and language
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
