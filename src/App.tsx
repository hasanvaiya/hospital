import React, { useState, useEffect } from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { PublicDisplayView } from './views/PublicDisplayView';
import { StaffPortalView } from './views/StaffPortalView';
import { StaffLoginView } from './views/StaffLoginView';
import { SuperAdminView } from './views/SuperAdminView';
import { AdminLoginView } from './views/AdminLoginView';
import { DeveloperView } from './views/DeveloperView';
import { DeveloperLoginView } from './views/DeveloperLoginView';

const MainHospitalApp: React.FC = () => {
  const { authRole } = useHospital();

  // Active route: 'public' | 'staff' | 'admin' | 'dev'
  const [currentRoute, setCurrentRoute] = useState<'public' | 'staff' | 'admin' | 'dev'>('public');

  // Synchronize route from URL hash (#public, #staff, #admin, #dev), search (?view=...), or path
  useEffect(() => {
    const detectRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view')?.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (
        hash === '#dev' || 
        hash === '#developer' || 
        hash === '#dev-login' || 
        viewParam === 'dev' || 
        viewParam === 'developer' || 
        path.endsWith('/dev')
      ) {
        setCurrentRoute('dev');
      } else if (
        hash === '#staff' || 
        hash === '#staff-login' || 
        viewParam === 'staff' || 
        path.endsWith('/staff')
      ) {
        setCurrentRoute('staff');
      } else if (
        hash === '#admin' || 
        hash === '#admin-login' || 
        viewParam === 'admin' || 
        path.endsWith('/admin')
      ) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('public');
      }
    };

    detectRoute();
    window.addEventListener('hashchange', detectRoute);
    window.addEventListener('popstate', detectRoute);
    return () => {
      window.removeEventListener('hashchange', detectRoute);
      window.removeEventListener('popstate', detectRoute);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 font-sans">
      
      {/* LINK 1: Public Live Display View (#public or /)
          100% View-Only: Zero Staff or Admin Login buttons */}
      {currentRoute === 'public' && (
        <PublicDisplayView />
      )}

      {/* LINK 2: Staff 1 Portal (#staff)
          Password Protected: If not logged in, prompts for Staff Passcode */}
      {currentRoute === 'staff' && (
        authRole === 'staff' || authRole === 'super_admin' ? (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <StaffPortalView />
          </div>
        ) : (
          <StaffLoginView />
        )
      )}

      {/* LINK 3: Super Admin Master Panel (#admin)
          Password Protected: If not logged in, prompts for Admin Email & Password */}
      {currentRoute === 'admin' && (
        authRole === 'super_admin' ? (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <SuperAdminView />
          </div>
        ) : (
          <AdminLoginView />
        )
      )}

      {/* LINK 4: Developer Database & Tools Panel (#dev)
          Password Protected: If not logged in, prompts for Developer Passcode */}
      {currentRoute === 'dev' && (
        authRole === 'developer' ? (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <DeveloperView />
          </div>
        ) : (
          <DeveloperLoginView />
        )
      )}

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