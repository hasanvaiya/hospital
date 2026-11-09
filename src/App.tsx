import React, { useState, useEffect } from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { PublicDisplayView } from './views/PublicDisplayView';
import { StaffPortalView } from './views/StaffPortalView';
import { SuperAdminView } from './views/SuperAdminView';
import { AuthGateModal } from './components/AuthGateModal';

const MainHospitalApp: React.FC = () => {
  const { authRole } = useHospital();

  // Active view: 'public' | 'staff' | 'super_admin'
  const [currentView, setCurrentView] = useState<'public' | 'staff' | 'super_admin'>('public');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalTargetRole, setLoginModalTargetRole] = useState<'staff' | 'admin'>('staff');

  // Synchronize hash in URL for 3 separate direct links (#public, #staff, #admin)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#staff') {
        if (authRole === 'staff' || authRole === 'super_admin') {
          setCurrentView('staff');
        } else {
          setLoginModalTargetRole('staff');
          setIsLoginModalOpen(true);
        }
      } else if (hash === '#admin') {
        if (authRole === 'super_admin') {
          setCurrentView('super_admin');
        } else {
          setLoginModalTargetRole('admin');
          setIsLoginModalOpen(true);
        }
      } else {
        setCurrentView('public');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [authRole]);

  // If user logs in as staff or admin, update current view automatically
  useEffect(() => {
    if (authRole === 'staff') {
      setCurrentView('staff');
      window.location.hash = 'staff';
    } else if (authRole === 'super_admin') {
      // If was trying to go to staff or admin, preserve or default to admin
      if (currentView !== 'staff') {
        setCurrentView('super_admin');
        window.location.hash = 'admin';
      }
    } else if (authRole === 'public') {
      setCurrentView('public');
      window.location.hash = 'public';
    }
  }, [authRole]);

  const handleOpenStaffPortal = () => {
    if (authRole === 'staff' || authRole === 'super_admin') {
      setCurrentView('staff');
      window.location.hash = 'staff';
    } else {
      setLoginModalTargetRole('staff');
      setIsLoginModalOpen(true);
    }
  };

  const handleOpenSuperAdmin = () => {
    if (authRole === 'super_admin') {
      setCurrentView('super_admin');
      window.location.hash = 'admin';
    } else {
      setLoginModalTargetRole('admin');
      setIsLoginModalOpen(true);
    }
  };

  const handleGoToPublic = () => {
    setCurrentView('public');
    window.location.hash = 'public';
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col font-sans">
      
      {/* 1. Public Display Section (View-only for everyone) */}
      {currentView === 'public' && (
        <PublicDisplayView 
          onOpenStaffPortal={handleOpenStaffPortal}
          onOpenSuperAdmin={handleOpenSuperAdmin}
        />
      )}

      {/* 2. Staff Portal Section (Protected by Staff 1 Passcode) */}
      {currentView === 'staff' && (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <StaffPortalView 
            onGoToPublicView={handleGoToPublic}
            onOpenSuperAdmin={handleOpenSuperAdmin}
          />
        </div>
      )}

      {/* 3. Super Admin Section (Protected by Gmail & Password) */}
      {currentView === 'super_admin' && (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <SuperAdminView 
            onGoToPublicView={handleGoToPublic}
            onOpenStaffPortal={handleOpenStaffPortal}
          />
        </div>
      )}

      {/* Login Gatekeeper Modal */}
      <AuthGateModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultRole={loginModalTargetRole}
      />

    </div>
  );
};

export function App() {
  return (
    <HospitalProvider>
      <MainHospitalApp />
    </HospitalProvider>
  );
}

export default App;
