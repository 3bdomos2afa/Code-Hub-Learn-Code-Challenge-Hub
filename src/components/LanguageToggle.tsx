
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { currentLanguage, setLanguage } = useLanguage();

  // Pre-load both language assets
  useEffect(() => {
    // Preload the opposite language assets
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'style';
    link.href = currentLanguage === "en" ? '/fonts/arabic.css' : '/fonts/english.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [currentLanguage]);

  const toggleLang = () => {
    const newLang = currentLanguage === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
    
    // Add a refresh for better font loading
    setTimeout(() => {
      document.body.style.fontFamily = newLang === "ar" ? "var(--font-arabic)" : "var(--font-sans)";
    }, 100);
  };

  return (
    <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium" onClick={toggleLang}>
      <Languages className="h-4 w-4" />
      {currentLanguage === "en" ? "العربية" : "English"}
    </Button>
  );
}
