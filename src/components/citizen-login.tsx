import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ArrowLeft, User, Lock, AlertCircle } from "lucide-react";

interface CitizenLoginProps {
  onNavigate: (page: 'landing' | 'citizen-dashboard') => void;
  onLogin: (credentials: { idNumber: string; password: string }) => void;
}

export function CitizenLogin({ onNavigate, onLogin }: CitizenLoginProps) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const content = {
    ar: {
      title: "دخول المواطن",
      subtitle: "ادخل الرقم الوطني وكلمة المرور للوصول إلى حسابك",
      idLabel: "الرقم الوطني",
      idPlaceholder: "أدخل الرقم الوطني",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      loginButton: "دخول",
      backButton: "العودة للرئيسية",
      errorMessage: "الرقم الوطني أو كلمة المرور غير صحيحة",
      demoInfo: "للتجربة استخدم:",
      demoCredentials: [
        "الرقم الوطني: 1234567890123 | كلمة المرور: citizen123",
        "الرقم الوطني: 9876543210987 | كلمة المرور: ahmad456"
      ]
    },
    en: {
      title: "Citizen Login",
      subtitle: "Enter your National ID and password to access your account",
      idLabel: "National ID Number",
      idPlaceholder: "Enter your National ID",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      loginButton: "Login",
      backButton: "Back to Home",
      errorMessage: "Invalid National ID or password",
      demoInfo: "For demo use:",
      demoCredentials: [
        "National ID: 1234567890123 | Password: citizen123",
        "National ID: 9876543210987 | Password: ahmad456"
      ]
    }
  };

  const t = content[language];

  // Demo credentials for testing
  const demoCredentials = [
    { idNumber: '1234567890123', password: 'citizen123' },
    { idNumber: '9876543210987', password: 'ahmad456' },
    { idNumber: '5678901234567', password: 'fatima789' },
    { idNumber: '3456789012345', password: 'omar321' },
    { idNumber: '7890123456789', password: 'aisha654' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const isValid = demoCredentials.some(
      cred => cred.idNumber === idNumber && cred.password === password
    );

    if (isValid) {
      onLogin({ idNumber, password });
      onNavigate('citizen-dashboard');
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="arabic-title text-2xl">{t.title}</CardTitle>
              <CardDescription className="arabic-body">
                {t.subtitle}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="arabic-body">
                    {t.idLabel}
                  </Label>
                  <Input
                    id="idNumber"
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder={t.idPlaceholder}
                    className="gov-input text-center"
                    required
                    maxLength={13}
                  />
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
                      <Lock className="w-5 h-5 mr-2" />
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