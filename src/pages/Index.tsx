import { useState } from "react";
import { LandingPage } from "@/components/landing-page";
import { CitizenLogin } from "@/components/citizen-login";
import { WorkerLogin } from "@/components/worker-login";
import { CitizenDashboard } from "@/components/citizen-dashboard";
import { WorkerDashboard } from "@/components/worker-dashboard";

type AppPage = 'landing' | 'citizen-login' | 'worker-login' | 'citizen-dashboard' | 'worker-dashboard';

interface UserData {
  citizen?: {
    idNumber: string;
    password: string;
  };
  worker?: {
    employeeId: string;
    password: string;
    department: string;
  };
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [userData, setUserData] = useState<UserData>({});

  const handleCitizenLogin = (credentials: { idNumber: string; password: string }) => {
    setUserData({ citizen: credentials });
  };

  const handleWorkerLogin = (credentials: { employeeId: string; password: string; department: string }) => {
    setUserData({ worker: credentials });
  };

  const handleLogout = () => {
    setUserData({});
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      
      case 'citizen-login':
        return (
          <CitizenLogin 
            onNavigate={setCurrentPage} 
            onLogin={handleCitizenLogin}
          />
        );
      
      case 'worker-login':
        return (
          <WorkerLogin 
            onNavigate={setCurrentPage} 
            onLogin={handleWorkerLogin}
          />
        );
      
      case 'citizen-dashboard':
        return userData.citizen ? (
          <CitizenDashboard 
            citizenData={userData.citizen}
            onLogout={handleLogout}
          />
        ) : (
          <LandingPage onNavigate={setCurrentPage} />
        );
      
      case 'worker-dashboard':
        return userData.worker ? (
          <WorkerDashboard 
            workerData={userData.worker}
            onLogout={handleLogout}
          />
        ) : (
          <LandingPage onNavigate={setCurrentPage} />
        );
      
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};

export default Index;
