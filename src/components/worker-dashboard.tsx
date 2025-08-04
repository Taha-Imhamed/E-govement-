import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  UserPlus, 
  Edit,
  Shield, 
  Building,
  Users,
  FileText,
  LogOut,
  Eye,
  Save,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkerDashboardProps {
  workerData: {
    employeeId: string;
    department: string;
  };
  onLogout: () => void;
}

export function WorkerDashboard({ workerData, onLogout }: WorkerDashboardProps) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCitizen, setSelectedCitizen] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Mock citizen database
  const citizensDatabase = [
    {
      idNumber: '1234567890123',
      nameAr: 'محمد أحمد الصالح',
      nameEn: 'Mohammed Ahmed Al-Saleh',
      fatherNameAr: 'أحمد محمد الصالح',
      fatherNameEn: 'Ahmed Mohammed Al-Saleh',
      motherNameAr: 'فاطمة علي المبروك',
      motherNameEn: 'Fatima Ali Al-Mabrouk',
      birthDate: '1990-05-15',
      bloodType: 'O+',
      address: 'طرابلس، حي الأندلس، شارع 15',
      phone: '+218-91-234-5678',
      email: 'mohammed.saleh@example.ly',
      maritalStatus: 'متزوج',
      nationality: 'ليبي',
      gender: 'ذكر'
    },
    {
      idNumber: '9876543210987',
      nameAr: 'أحمد سالم المرقوبي',
      nameEn: 'Ahmed Salem Al-Marqoubi',
      fatherNameAr: 'سالم محمد المرقوبي',
      fatherNameEn: 'Salem Mohammed Al-Marqoubi',
      motherNameAr: 'عائشة أحمد الزنتاني',
      motherNameEn: 'Aisha Ahmed Al-Zentani',
      birthDate: '1985-12-03',
      bloodType: 'A+',
      address: 'بنغازي، حي المدينة، شارع جمال عبدالناصر',
      phone: '+218-92-765-4321',
      email: 'ahmed.marqoubi@example.ly',
      maritalStatus: 'أعزب',
      nationality: 'ليبي',
      gender: 'ذكر'
    },
    {
      idNumber: '5678901234567',
      nameAr: 'فاطمة محمد البوسيفي',
      nameEn: 'Fatima Mohammed Al-Busaifi',
      fatherNameAr: 'محمد علي البوسيفي',
      fatherNameEn: 'Mohammed Ali Al-Busaifi',
      motherNameAr: 'مريم أحمد الكيب',
      motherNameEn: 'Mariam Ahmed Al-Keeb',
      birthDate: '1992-08-22',
      bloodType: 'B+',
      address: 'مصراتة، حي الضباط، شارع التحرير',
      phone: '+218-93-567-8901',
      email: 'fatima.busaifi@example.ly',
      maritalStatus: 'متزوجة',
      nationality: 'ليبية',
      gender: 'أنثى'
    },
    {
      idNumber: '3456789012345',
      nameAr: 'عمر خالد الفيتوري',
      nameEn: 'Omar Khalid Al-Fitori',
      fatherNameAr: 'خالد سعد الفيتوري',
      fatherNameEn: 'Khalid Saad Al-Fitori',
      motherNameAr: 'نادية محمد الشريف',
      motherNameEn: 'Nadia Mohammed Al-Sharif',
      birthDate: '1988-11-10',
      bloodType: 'AB+',
      address: 'سبها، حي المنارة، شارع الوحدة',
      phone: '+218-94-345-6789',
      email: 'omar.fitori@example.ly',
      maritalStatus: 'أعزب',
      nationality: 'ليبي',
      gender: 'ذكر'
    },
    {
      idNumber: '7890123456789',
      nameAr: 'عائشة عبدالله الزواوي',
      nameEn: 'Aisha Abdullah Al-Zawawi',
      fatherNameAr: 'عبدالله محمود الزواوي',
      fatherNameEn: 'Abdullah Mahmoud Al-Zawawi',
      motherNameAr: 'خديجة سالم العبار',
      motherNameEn: 'Khadija Salem Al-Abbar',
      birthDate: '1995-03-18',
      bloodType: 'O-',
      address: 'الزاوية، حي الشهداء، شارع الثورة',
      phone: '+218-95-789-0123',
      email: 'aisha.zawawi@example.ly',
      maritalStatus: 'عزباء',
      nationality: 'ليبية',
      gender: 'أنثى'
    }
  ];

  const content = {
    ar: {
      welcome: 'مرحباً',
      dashboard: 'لوحة التحكم',
      searchCitizen: 'البحث عن مواطن',
      addCitizen: 'إضافة مواطن جديد',
      searchPlaceholder: 'ابحث بالرقم الوطني أو الاسم',
      searchButton: 'بحث',
      totalCitizens: 'إجمالي المواطنين',
      myDepartment: 'قسمي',
      todayUpdates: 'تحديثات اليوم',
      viewDetails: 'عرض التفاصيل',
      editCitizen: 'تعديل بيانات المواطن',
      saveCitizen: 'حفظ التغييرات',
      cancel: 'إلغاء',
      logout: 'تسجيل الخروج',
      searchResults: 'نتائج البحث',
      citizenDetails: 'تفاصيل المواطن',
      departments: {
        police: 'قسم الشرطة',
        civil_records: 'قسم السجل المدني',
        passports: 'قسم الجوازات',
        housing: 'قسم الإسكان',
        health: 'قسم الصحة'
      },
      fields: {
        idNumber: 'الرقم الوطني',
        name: 'الاسم الكامل',
        fatherName: 'اسم الوالد',
        motherName: 'اسم الوالدة',
        birthDate: 'تاريخ الميلاد',
        bloodType: 'فصيلة الدم',
        address: 'العنوان',
        phone: 'رقم الهاتف',
        email: 'البريد الإلكتروني',
        maritalStatus: 'الحالة الاجتماعية',
        nationality: 'الجنسية',
        gender: 'الجنس'
      }
    },
    en: {
      welcome: 'Welcome',
      dashboard: 'Dashboard',
      searchCitizen: 'Search Citizen',
      addCitizen: 'Add New Citizen',
      searchPlaceholder: 'Search by National ID or Name',
      searchButton: 'Search',
      totalCitizens: 'Total Citizens',
      myDepartment: 'My Department',
      todayUpdates: 'Today Updates',
      viewDetails: 'View Details',
      editCitizen: 'Edit Citizen Data',
      saveCitizen: 'Save Changes',
      cancel: 'Cancel',
      logout: 'Logout',
      searchResults: 'Search Results',
      citizenDetails: 'Citizen Details',
      departments: {
        police: 'Police Department',
        civil_records: 'Civil Records',
        passports: 'Passport Office',
        housing: 'Housing Department',
        health: 'Health Department'
      },
      fields: {
        idNumber: 'National ID',
        name: 'Full Name',
        fatherName: "Father's Name",
        motherName: "Mother's Name",
        birthDate: 'Birth Date',
        bloodType: 'Blood Type',
        address: 'Address',
        phone: 'Phone Number',
        email: 'Email',
        maritalStatus: 'Marital Status',
        nationality: 'Nationality',
        gender: 'Gender'
      }
    }
  };

  const t = content[language];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const results = citizensDatabase.filter(citizen => 
      citizen.idNumber.includes(searchQuery) ||
      citizen.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citizen.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleEditSave = () => {
    if (selectedCitizen) {
      // Simulate API call to save changes
      toast({
        title: language === 'ar' ? 'تم الحفظ بنجاح' : 'Saved Successfully',
        description: language === 'ar' 
          ? 'تم تحديث بيانات المواطن بنجاح'
          : 'Citizen data has been updated successfully',
      });
      setIsEditing(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[var(--gradient-subtle)] ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--gradient-government)] flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="arabic-title text-xl">دولتي - النظام الحكومي</h1>
                <p className="arabic-body text-sm text-muted-foreground">
                  {t.welcome}, {workerData.employeeId} - {t.departments[workerData.department as keyof typeof t.departments]}
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
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="gov-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="arabic-body text-sm text-muted-foreground">{t.totalCitizens}</p>
                  <p className="arabic-subtitle text-2xl font-bold">5,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gov-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--gradient-government)] flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="arabic-body text-sm text-muted-foreground">{t.myDepartment}</p>
                  <p className="arabic-subtitle text-lg font-bold">
                    {t.departments[workerData.department as keyof typeof t.departments]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gov-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="arabic-body text-sm text-muted-foreground">{t.todayUpdates}</p>
                  <p className="arabic-subtitle text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="arabic-subtitle flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  {t.searchCitizen}
                </CardTitle>
                <CardDescription className="arabic-body">
                  {language === 'ar' 
                    ? 'ابحث عن المواطنين باستخدام الرقم الوطني أو الاسم'
                    : 'Search for citizens using National ID or name'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="gov-input flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} className="gov-button-primary">
                    <Search className="w-4 h-4 mr-2" />
                    {t.searchButton}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card className="gov-card">
                <CardHeader>
                  <CardTitle className="arabic-subtitle">{t.searchResults}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.map((citizen, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="arabic-body font-medium">
                            {language === 'ar' ? citizen.nameAr : citizen.nameEn}
                          </h3>
                          <p className="arabic-body text-sm text-muted-foreground">
                            {t.fields.idNumber}: {citizen.idNumber}
                          </p>
                          <p className="arabic-body text-sm text-muted-foreground">
                            {citizen.address}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedCitizen(citizen)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                {t.viewDetails}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="arabic-subtitle">
                                  {t.citizenDetails}
                                </DialogTitle>
                                <DialogDescription className="arabic-body">
                                  {language === 'ar' ? citizen.nameAr : citizen.nameEn}
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedCitizen && (
                                <div className="space-y-6">
                                  <div className="flex justify-between items-center">
                                    <Badge variant="outline">
                                      {t.fields.idNumber}: {selectedCitizen.idNumber}
                                    </Badge>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setIsEditing(!isEditing)}
                                    >
                                      <Edit className="w-4 h-4 mr-1" />
                                      {isEditing ? t.cancel : t.editCitizen}
                                    </Button>
                                  </div>
                                  
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="arabic-body text-sm font-medium">
                                          {t.fields.name}
                                        </Label>
                                        {isEditing ? (
                                          <Input 
                                            value={language === 'ar' ? selectedCitizen.nameAr : selectedCitizen.nameEn}
                                            className="gov-input mt-1"
                                          />
                                        ) : (
                                          <p className="arabic-body font-medium mt-1">
                                            {language === 'ar' ? selectedCitizen.nameAr : selectedCitizen.nameEn}
                                          </p>
                                        )}
                                      </div>
                                      
                                      <div>
                                        <Label className="arabic-body text-sm font-medium">
                                          {t.fields.fatherName}
                                        </Label>
                                        {isEditing ? (
                                          <Input 
                                            value={language === 'ar' ? selectedCitizen.fatherNameAr : selectedCitizen.fatherNameEn}
                                            className="gov-input mt-1"
                                          />
                                        ) : (
                                          <p className="arabic-body font-medium mt-1">
                                            {language === 'ar' ? selectedCitizen.fatherNameAr : selectedCitizen.fatherNameEn}
                                          </p>
                                        )}
                                      </div>
                                      
                                      <div>
                                        <Label className="arabic-body text-sm font-medium">
                                          {t.fields.motherName}
                                        </Label>
                                        {isEditing ? (
                                          <Input 
                                            value={language === 'ar' ? selectedCitizen.motherNameAr : selectedCitizen.motherNameEn}
                                            className="gov-input mt-1"
                                          />
                                        ) : (
                                          <p className="arabic-body font-medium mt-1">
                                            {language === 'ar' ? selectedCitizen.motherNameAr : selectedCitizen.motherNameEn}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <div>
                                        <Label className="arabic-body text-sm font-medium">
                                          {t.fields.birthDate}
                                        </Label>
                                        {isEditing ? (
                                          <Input 
                                            type="date"
                                            value={selectedCitizen.birthDate}
                                            className="gov-input mt-1"
                                          />
                                        ) : (
                                          <p className="arabic-body font-medium mt-1">
                                            {selectedCitizen.birthDate}
                                          </p>
                                        )}
                                      </div>
                                      
                                      <div>
                                        <Label className="arabic-body text-sm font-medium">
                                          {t.fields.bloodType}
                                        </Label>
                                        {isEditing ? (
                                          <Select value={selectedCitizen.bloodType}>
                                            <SelectTrigger className="gov-input mt-1">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="A+">A+</SelectItem>
                                              <SelectItem value="A-">A-</SelectItem>
                                              <SelectItem value="B+">B+</SelectItem>
                                              <SelectItem value="B-">B-</SelectItem>
                                              <SelectItem value="AB+">AB+</SelectItem>
                                              <SelectItem value="AB-">AB-</SelectItem>
                                              <SelectItem value="O+">O+</SelectItem>
                                              <SelectItem value="O-">O-</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        ) : (
                                          <Badge variant="outline" className="mt-1 bg-red-50 text-red-700 border-red-200">
                                            {selectedCitizen.bloodType}
                                          </Badge>
                                        )}
                                      </div>
                                      
                                      <div>
                                        <Label className="arabic-body text-sm font-medium">
                                          {t.fields.phone}
                                        </Label>
                                        {isEditing ? (
                                          <Input 
                                            value={selectedCitizen.phone}
                                            className="gov-input mt-1"
                                          />
                                        ) : (
                                          <p className="arabic-body font-medium mt-1">
                                            {selectedCitizen.phone}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label className="arabic-body text-sm font-medium">
                                      {t.fields.address}
                                    </Label>
                                    {isEditing ? (
                                      <Textarea 
                                        value={selectedCitizen.address}
                                        className="gov-input mt-1"
                                        rows={3}
                                      />
                                    ) : (
                                      <p className="arabic-body font-medium mt-1">
                                        {selectedCitizen.address}
                                      </p>
                                    )}
                                  </div>
                                  
                                  {isEditing && (
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="outline"
                                        onClick={() => setIsEditing(false)}
                                      >
                                        {t.cancel}
                                      </Button>
                                      <Button
                                        onClick={handleEditSave}
                                        className="gov-button-primary"
                                      >
                                        <Save className="w-4 h-4 mr-2" />
                                        {t.saveCitizen}
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="arabic-subtitle">
                  {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full gov-button-primary">
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t.addCitizen}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تقرير يومي' : 'Daily Report'}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'البلاغات' : 'Reports'}
                </Button>
              </CardContent>
            </Card>

            <Card className="gov-card">
              <CardHeader>
                <CardTitle className="arabic-subtitle">
                  {language === 'ar' ? 'إحصائيات اليوم' : "Today's Statistics"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="arabic-body text-sm">
                    {language === 'ar' ? 'عمليات البحث' : 'Searches'}
                  </span>
                  <Badge variant="secondary">24</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="arabic-body text-sm">
                    {language === 'ar' ? 'التحديثات' : 'Updates'}
                  </span>
                  <Badge variant="secondary">8</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="arabic-body text-sm">
                    {language === 'ar' ? 'إضافات جديدة' : 'New Additions'}
                  </span>
                  <Badge variant="secondary">3</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}