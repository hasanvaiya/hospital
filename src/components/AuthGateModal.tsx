import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Mail, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  AlertCircle 
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'staff' | 'admin';
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({ isOpen, onClose, defaultRole = 'staff' }) => {
  const { loginAsStaff, loginAsSuperAdmin } = useHospital();

  const [activeTab, setActiveTab] = useState<'staff' | 'admin'>(defaultRole);
  
  // Staff pass input
  const [staffPass, setStaffPass] = useState('');
  const [staffError, setStaffError] = useState('');

  // Admin input
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  if (!isOpen) return null;

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError('');
    const success = loginAsStaff(staffPass);
    if (success) {
      setStaffPass('');
      onClose();
    } else {
      setStaffError('ভুল পাসকোড! সঠিক ৪ ডিজিটের পাসকোড প্রদান করুন।');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    const success = loginAsSuperAdmin(adminEmail, adminPass);
    if (success) {
      setAdminEmail('');
      setAdminPass('');
      onClose();
    } else {
      setAdminError('ভুল ইমেইল বা পাসওয়ার্ড! সঠিক তথ্য দিন।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-7 border border-slate-100 relative text-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1E6BFF] to-[#00D2B4] text-white flex items-center justify-center mx-auto mb-2 shadow-sm shadow-blue-200">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900">হাসপাতাল লগইন পোর্টাল</h2>
          <p className="text-xs text-slate-500 mt-0.5">নিরাপদ অ্যাক্সেসের জন্য নির্ধারিত তথ্য প্রদান করুন</p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl my-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('staff');
              setStaffError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'staff' ? 'bg-white text-[#1E6BFF] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>স্টাফ ১ (Staff 1)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setAdminError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'admin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>সুপার এডমিন (Admin)</span>
          </button>
        </div>

        {/* Tab 1: Staff 1 Login with Single Passcode */}
        {activeTab === 'staff' ? (
          <form onSubmit={handleStaffLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                স্টাফ ১ এন্ট্রি পাসকোড (Passcode) *
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="৪ ডিজিটের পাসকোড দিন"
                  value={staffPass}
                  onChange={(e) => setStaffPass(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-black tracking-widest text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1E6BFF] focus:outline-hidden transition-all"
                  autoFocus
                />
              </div>
            </div>

            {staffError && (
              <div className="p-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{staffError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              স্টাফ ১ হিসেবে প্রবেশ করুন
            </button>
          </form>
        ) : (
          /* Tab 2: Super Admin Login with Gmail & Password */
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">এডমিন জিমেইল (Email / Gmail) *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="আপনার নিবন্ধিত ইমেইল লিখুন"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-slate-800 focus:outline-hidden transition-all"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">পাসওয়ার্ড (Password) *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="এডমিন পাসওয়ার্ড"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:ring-2 focus:ring-slate-800 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {adminError && (
              <div className="p-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md shadow-slate-900/20 transition-all cursor-pointer"
            >
              সুপার এডমিন হিসেবে প্রবেশ করুন
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
