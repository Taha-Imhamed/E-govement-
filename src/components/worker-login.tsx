import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ArrowLeft, Shield, Building, AlertCircle } from "lucide-react";

interface WorkerLoginProps {
  onNavigate: (page: 'landing' | 'worker-dashboard') => void;
  onLogin: (credentials: { employeeId: string; password: string; department: string }) => void;
}

export function WorkerLogin({ onNavigate, onLogin }: WorkerLoginProps) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const content = {
    ar: {
      title: "دخول الموظف الحكومي",
      subtitle: "ادخل بيانات الموظف للوصول إلى نظام إدارة المواطنين",
      employeeIdLabel: "رقم الموظف",
      employeeIdPlaceholder: "أدخل رقم الموظف",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      departmentLabel: "القسم",
      departmentPlaceholder: "اختر القسم",
      departments: {
        police: "قسم الشرطة",
        civil_records: "قسم السجل المدني",
        passports: "قسم الجوازات",
        housing: "قسم الإسكان",
        health: "قسم الصحة"
      },
      loginButton: "دخول النظام",
      backButton: "العودة للرئيسية",
      errorMessage: "بيانات الدخول غير صحيحة",
      demoInfo: "للتجربة استخدم:",
      demoCredentials: [
        "الشرطة: EMP001 | كلمة المرور: police123",
        "السجل المدني: EMP006 | كلمة المرور: civil123"
      ]
    },
    en: {
      title: "Government Worker Login",
      subtitle: "Enter employee credentials to access citizen management system",
      employeeIdLabel: "Employee ID",
      employeeIdPlaceholder: "Enter employee ID",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter password",
      departmentLabel: "Department",
      departmentPlaceholder: "Select department",
      departments: {
        police: "Police Department",
        civil_records: "Civil Records",
        passports: "Passport Office",
        housing: "Housing Department",
        health: "Health Department"
      },
      loginButton: "Access System",
      backButton: "Back to Home",
      errorMessage: "Invalid login credentials",
      demoInfo: "For demo use:",
      demoCredentials: [
        "Police: EMP001 | Password: police123",
        "Civil Records: EMP006 | Password: civil123"
      ]
    }
  };

  const t = content[language];

  // Demo worker credentials
  const demoWorkers = [
    // Police Department
    { employeeId: 'EMP001', password: 'police123', department: 'police' },
    { employeeId: 'EMP002', password: 'police456', department: 'police' },
    { employeeId: 'EMP003', password: 'police789', department: 'police' },
    { employeeId: 'EMP004', password: 'police321', department: 'police' },
    { employeeId: 'EMP005', password: 'police654', department: 'police' },
    
    // Civil Records
    { employeeId: 'EMP006', password: 'civil123', department: 'civil_records' },
    { employeeId: 'EMP007', password: 'civil456', department: 'civil_records' },
    { employeeId: 'EMP008', password: 'civil789', department: 'civil_records' },
    { employeeId: 'EMP009', password: 'civil321', department: 'civil_records' },
    { employeeId: 'EMP010', password: 'civil654', department: 'civil_records' },
    
    // Passport Office
    { employeeId: 'EMP011', password: 'passport123', department: 'passports' },
    { employeeId: 'EMP012', password: 'passport456', department: 'passports' },
    { employeeId: 'EMP013', password: 'passport789', department: 'passports' },
    { employeeId: 'EMP014', password: 'passport321', department: 'passports' },
    { employeeId: 'EMP015', password: 'passport654', department: 'passports' },
    
    // Housing Department
    { employeeId: 'EMP016', password: 'housing123', department: 'housing' },
    { employeeId: 'EMP017', password: 'housing456', department: 'housing' },
    { employeeId: 'EMP018', password: 'housing789', department: 'housing' },
    { employeeId: 'EMP019', password: 'housing321', department: 'housing' },
    { employeeId: 'EMP020', password: 'housing654', department: 'housing' },
    
    // Health Department
    { employeeId: 'EMP021', password: 'health123', department: 'health' },
    { employeeId: 'EMP022', password: 'health456', department: 'health' },
    { employeeId: 'EMP023', password: 'health789', department: 'health' },
    { employeeId: 'EMP024', password: 'health321', department: 'health' },
    { employeeId: 'EMP025', password: 'health654', department: 'health' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const isValid = demoWorkers.some(
      worker => worker.employeeId === employeeId && 
                worker.password === password && 
                worker.department === department
    );

    if (isValid) {
      onLogin({ employeeId, password, department });
      onNavigate('worker-dashboard');
    } else {
      setError(t.errorMessage);
    }

    setLoading(false);
  };

  return (
    <div className={`min-h-screen bg-[var(--gradient-subtle)] ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backButton}
          </Button>
          <LanguageToggle onLanguageChange={setLanguage} />
        </div>
      </header>

      {/* Login Form */}
      <main className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="gov-card-elevated">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gradient-government)] flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="arabic-title text-2xl">{t.title}</CardTitle>
              <CardDescription className="arabic-body">
                {t.subtitle}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="arabic-body">
                    {t.employeeIdLabel}
                  </Label>
                  <Input
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder={t.employeeIdPlaceholder}
                    className="gov-input text-center"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="arabic-body">
                    {t.departmentLabel}
                  </Label>
                  <Select value={department} onValueChange={setDepartment} required>
                    <SelectTrigger className="gov-input">
                      <SelectValue placeholder={t.departmentPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="police">{t.departments.police}</SelectItem>
                      <SelectItem value="civil_records">{t.departments.civil_records}</SelectItem>
                      <SelectItem value="passports">{t.departments.passports}</SelectItem>
                      <SelectItem value="housing">{t.departments.housing}</SelectItem>
                      <SelectItem value="health">{t.departments.health}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="arabic-body">
                    {t.passwordLabel}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="gov-input"
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="arabic-body">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full gov-button-primary py-6 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {language === 'ar' ? 'جاري الدخول...' : 'Logging in...'}
                    </div>
                  ) : (
                    <>
                      <Building className="w-5 h-5 mr-2" />
                      {t.loginButton}
                    </>
                  )}
                </Button>
              </form>

              {/* Demo Info */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="arabic-body text-sm font-medium mb-2">{t.demoInfo}</p>
                {t.demoCredentials.map((cred, index) => (
                  <p key={index} className="arabic-body text-xs text-muted-foreground mb-1">
                    {cred}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}