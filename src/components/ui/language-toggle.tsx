import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  onLanguageChange?: (language: 'ar' | 'en') => void;
}

export function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    onLanguageChange?.(newLang);
    
    // Apply RTL/LTR to document
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 gov-input"
    >
      <Globe className="h-4 w-4" />
      {language === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
}