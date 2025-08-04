import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { 
  FileText, 
  Download, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Heart,
  IdCard,
  Car,
  Plane,
  GraduationCap,
  LogOut
} from "lucide-react";

interface CitizenDashboardProps {
  citizenData: {
    idNumber: string;
    password: string;
  };
  onLogout: () => void;
}

export function CitizenDashboard({ citizenData, onLogout }: CitizenDashboardProps) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  // Mock citizen data based on ID
  const getCitizenInfo = (idNumber: string) => {
    const citizens = {
      '1234567890123': {
        nameAr: 'محمد أحمد الصالح',
        nameEn: 'Mohammed Ahmed Al-Saleh',
        fatherNameAr: 'أحمد محمد الصالح',
        fatherNameEn: 'Ahmed Mohammed Al-Saleh',
        motherNameAr: 'فاطمة علي المبروك',
        motherNameEn: 'Fatima Ali Al-Mabrouk',
        maternalGrandfatherAr: 'علي سالم المبروك',
        maternalGrandfatherEn: 'Ali Salem Al-Mabrouk',
        paternalGrandfatherAr: 'محمد سعد الصالح',
        paternalGrandfatherEn: 'Mohammed Saad Al-Saleh',
        birthDate: '1990-05-15',
        bloodType: 'O+',
        address: 'طرابلس، حي الأندلس، شارع 15',
        phone: '+218-91-234-5678',
        email: 'mohammed.saleh@example.ly',
        maritalStatus: 'متزوج',
        nationality: 'ليبي',
        gender: 'ذكر'
      },
      '9876543210987': {
        nameAr: 'أحمد سالم المرقوبي',
        nameEn: 'Ahmed Salem Al-Marqoubi',
        fatherNameAr: 'سالم محمد المرقوبي',
        fatherNameEn: 'Salem Mohammed Al-Marqoubi',
        motherNameAr: 'عائشة أحمد الزنتاني',
        motherNameEn: 'Aisha Ahmed Al-Zentani',
        maternalGrandfatherAr: 'أحمد عبدالله الزنتاني',
        maternalGrandfatherEn: 'Ahmed Abdullah Al-Zentani',
        paternalGrandfatherAr: 'محمد علي المرقوبي',
        paternalGrandfatherEn: 'Mohammed Ali Al-Marqoubi',
        birthDate: '1985-12-03',
        bloodType: 'A+',
        address: 'بنغازي، حي المدينة، شارع جمال عبدالناصر',
        phone: '+218-92-765-4321',
        email: 'ahmed.marqoubi@example.ly',
        maritalStatus: 'أعزب',
        nationality: 'ليبي',
        gender: 'ذكر'
      }
    };

    return citizens[idNumber as keyof typeof citizens] || citizens['1234567890123'];
  };

  const citizen = getCitizenInfo(citizenData.idNumber);

  const content = {
    ar: {
      welcome: 'مرحباً',
      personalInfo: 'المعلومات الشخصية',
      documents: 'الوثائق الرسمية',
      logout: 'تسجيل الخروج',
      downloadAll: 'تحميل جميع الوثائق',
      personalDetails: 'البيانات الشخصية',
      familyInfo: 'معلومات العائلة',
      contactInfo: 'معلومات الاتصال',
      fields: {
        name: 'الاسم الكامل',
        fatherName: 'اسم الوالد',
        motherName: 'اسم الوالدة',
        maternalGrandfather: 'اسم جد الأم',
        paternalGrandfather: 'اسم جد الأب',
        birthDate: 'تاريخ الميلاد',
        bloodType: 'فصيلة الدم',
        address: 'العنوان',
        phone: 'رقم الهاتف',
        email: 'البريد الإلكتروني',
        maritalStatus: 'الحالة الاجتماعية',
        nationality: 'الجنسية',
        gender: 'الجنس',
        idNumber: 'الرقم الوطني'
      },
      documentTypes: [
        { name: 'شهادة الميلاد', icon: FileText, status: 'متاح' },
        { name: 'جواز السفر', icon: Plane, status: 'متاح' },
        { name: 'رخصة القيادة', icon: Car, status: 'متاح' },
        { name: 'البطاقة الشخصية', icon: IdCard, status: 'متاح' },
        { name: 'الشهادة الجامعية', icon: GraduationCap, status: 'متاح' }
      ]
    },
    en: {
      welcome: 'Welcome',
      personalInfo: 'Personal Information',
      documents: 'Official Documents',
      logout: 'Logout',
      downloadAll: 'Download All Documents',
      personalDetails: 'Personal Details',
      familyInfo: 'Family Information',
      contactInfo: 'Contact Information',
      fields: {
        name: 'Full Name',
        fatherName: "Father's Name",
        motherName: "Mother's Name",
        maternalGrandfather: "Maternal Grandfather",
        paternalGrandfather: "Paternal Grandfather",
        birthDate: 'Birth Date',
        bloodType: 'Blood Type',
        address: 'Address',
        phone: 'Phone Number',
        email: 'Email',
        maritalStatus: 'Marital Status',
        nationality: 'Nationality',
        gender: 'Gender',
        idNumber: 'National ID'
      },
      documentTypes: [
        { name: 'Birth Certificate', icon: FileText, status: 'Available' },
        { name: 'Passport', icon: Plane, status: 'Available' },
        { name: 'Driver License', icon: Car, status: 'Available' },
        { name: 'National ID Card', icon: IdCard, status: 'Available' },
        { name: 'University Degree', icon: GraduationCap, status: 'Available' }
      ]
    }
  };

  const t = content[language];

  const handleDownload = (documentName: string) => {
    // Simulate document download
    console.log(`Downloading ${documentName}`);
  };

  return (
    <div className={`min-h-screen bg-[var(--gradient-subtle)] ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center">
                <span className="text-white font-bold text-lg">د</span>
              </div>
              <div>
                <h1 className="arabic-title text-xl">دولتي</h1>
                <p className="arabic-body text-sm text-muted-foreground">
                  {t.welcome}, {language === 'ar' ? citizen.nameAr : citizen.nameEn}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageToggle onLanguageChange={setLanguage} />
            <Button variant="outline" onClick={onLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Details */}
            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="arabic-subtitle flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t.personalDetails}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.name}
                      </label>
                      <p className="arabic-body font-medium">
                        {language === 'ar' ? citizen.nameAr : citizen.nameEn}
                      </p>
                    </div>
                    
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.idNumber}
                      </label>
                      <p className="arabic-body font-medium">{citizenData.idNumber}</p>
                    </div>
                    
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.birthDate}
                      </label>
                      <p className="arabic-body font-medium">{citizen.birthDate}</p>
                    </div>
                    
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.bloodType}
                      </label>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <Heart className="w-3 h-3 mr-1" />
                        {citizen.bloodType}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.nationality}
                      </label>
                      <p className="arabic-body font-medium">{citizen.nationality}</p>
                    </div>
                    
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.gender}
                      </label>
                      <p className="arabic-body font-medium">{citizen.gender}</p>
                    </div>
                    
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.maritalStatus}
                      </label>
                      <p className="arabic-body font-medium">{citizen.maritalStatus}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Information */}
            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="arabic-subtitle">{t.familyInfo}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.fatherName}
                      </label>
                      <p className="arabic-body font-medium">
                        {language === 'ar' ? citizen.fatherNameAr : citizen.fatherNameEn}
                      </p>
                    </div>
                    
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.paternalGrandfather}
                      </label>
                      <p className="arabic-body font-medium">
                        {language === 'ar' ? citizen.paternalGrandfatherAr : citizen.paternalGrandfatherEn}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.motherName}
                      </label>
                      <p className="arabic-body font-medium">
                        {language === 'ar' ? citizen.motherNameAr : citizen.motherNameEn}
                      </p>
                    </div>
                    
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.maternalGrandfather}
                      </label>
                      <p className="arabic-body font-medium">
                        {language === 'ar' ? citizen.maternalGrandfatherAr : citizen.maternalGrandfatherEn}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="arabic-subtitle">{t.contactInfo}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.address}
                      </label>
                      <p className="arabic-body font-medium">{citizen.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.phone}
                      </label>
                      <p className="arabic-body font-medium">{citizen.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <label className="arabic-body text-sm font-medium text-muted-foreground">
                        {t.fields.email}
                      </label>
                      <p className="arabic-body font-medium">{citizen.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents Sidebar */}
          <div className="space-y-6">
            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="arabic-subtitle flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t.documents}
                </CardTitle>
                <CardDescription className="arabic-body">
                  {language === 'ar' 
                    ? 'يمكنك تحميل وعرض جميع وثائقك الرسمية'
                    : 'You can download and view all your official documents'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full gov-button-primary"
                  onClick={() => handleDownload('all')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadAll}
                </Button>

                <div className="space-y-3">
                  {t.documentTypes.map((doc, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleDownload(doc.name)}
                    >
                      <div className="flex items-center gap-3">
                        <doc.icon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="arabic-body font-medium">{doc.name}</p>
                          <p className="arabic-body text-xs text-muted-foreground">{doc.status}</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Profile Picture */}
            <Card className="gov-card">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-[var(--gradient-primary)] text-white">
                    {(language === 'ar' ? citizen.nameAr : citizen.nameEn).split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="arabic-subtitle font-medium">
                  {language === 'ar' ? citizen.nameAr : citizen.nameEn}
                </h3>
                <p className="arabic-body text-sm text-muted-foreground">
                  {language === 'ar' ? 'مواطن ليبي' : 'Libyan Citizen'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}