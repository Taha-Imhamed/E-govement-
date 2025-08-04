import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Users, Shield, FileText, Search, Download, UserCheck } from "lucide-react";
import libyaHero from "@/assets/libya-hero.jpg";

interface LandingPageProps {
  onNavigate: (page: 'citizen-login' | 'worker-login') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const content = {
    ar: {
      title: "دولتي",
      subtitle: "البوابة الإلكترونية للحكومة الليبية",
      description: "منصة شاملة للخدمات الحكومية الإلكترونية تربط المواطنين بالحكومة بطريقة آمنة وفعالة",
      citizenLogin: "دخول المواطن",
      workerLogin: "دخول الموظف",
      features: "الخدمات المتاحة",
      featuresList: [
        {
          icon: FileText,
          title: "الوثائق الرسمية",
          description: "عرض وتحميل جميع الوثائق الحكومية"
        },
        {
          icon: UserCheck,
          title: "البيانات الشخصية",
          description: "إدارة ومراجعة المعلومات الشخصية"
        },
        {
          icon: Search,
          title: "البحث في قاعدة البيانات",
          description: "للموظفين: البحث وتحديث بيانات المواطنين"
        },
        {
          icon: Shield,
          title: "الأمان والحماية",
          description: "حماية عالية المستوى لجميع البيانات"
        }
      ],
      stats: [
        { number: "500K+", label: "مواطن مسجل" },
        { number: "25+", label: "دائرة حكومية" },
        { number: "100+", label: "خدمة متاحة" },
        { number: "24/7", label: "متاح على مدار الساعة" }
      ]
    },
    en: {
      title: "My Country",
      subtitle: "Libyan Government Electronic Portal",
      description: "A comprehensive platform for electronic government services connecting citizens with government efficiently and securely",
      citizenLogin: "Citizen Login",
      workerLogin: "Government Worker Login",
      features: "Available Services",
      featuresList: [
        {
          icon: FileText,
          title: "Official Documents",
          description: "View and download all government documents"
        },
        {
          icon: UserCheck,
          title: "Personal Data",
          description: "Manage and review personal information"
        },
        {
          icon: Search,
          title: "Database Search",
          description: "For workers: Search and update citizen data"
        },
        {
          icon: Shield,
          title: "Security & Protection",
          description: "High-level protection for all data"
        }
      ],
      stats: [
        { number: "500K+", label: "Registered Citizens" },
        { number: "25+", label: "Government Departments" },
        { number: "100+", label: "Available Services" },
        { number: "24/7", label: "Always Available" }
      ]
    }
  };

  const t = content[language];

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="relative z-10 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center">
              <span className="text-white font-bold text-lg">د</span>
            </div>
            <h1 className="arabic-title text-primary">{t.title}</h1>
          </div>
          <LanguageToggle onLanguageChange={setLanguage} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative gov-hero gov-pattern min-h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${libyaHero})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              Libya Digital Government Initiative
            </span>
          </Badge>
          
          <h1 className="arabic-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            {t.title}
          </h1>
          
          <p className="arabic-subtitle text-xl md:text-2xl mb-4 text-white/90">
            {t.subtitle}
          </p>
          
          <p className="arabic-body text-lg md:text-xl mb-8 text-white/80 max-w-3xl mx-auto">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('citizen-login')}
              className="gov-button-primary px-8 py-6 text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              {t.citizenLogin}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => onNavigate('worker-login')}
              className="px-8 py-6 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Shield className="w-5 h-5 mr-2" />
              {t.workerLogin}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--gradient-subtle)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="arabic-body text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="arabic-title text-3xl md:text-4xl font-bold mb-4">
              {t.features}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.featuresList.map((feature, index) => (
              <Card key={index} className="gov-card hover:gov-card-elevated group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center group-hover:scale-110 transition-[var(--transition-bounce)]">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="arabic-subtitle">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="arabic-body text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--gradient-government)] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center">
              <span className="text-white font-bold">د</span>
            </div>
            <h3 className="arabic-title text-2xl">{t.title}</h3>
          </div>
          <p className="arabic-body text-white/80">
            {language === 'ar' 
              ? "حكومة ليبيا - جميع الحقوق محفوظة © 2024"
              : "Government of Libya - All Rights Reserved © 2024"
            }
          </p>
        </div>
      </footer>
    </div>
  );
}