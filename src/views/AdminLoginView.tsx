import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const AdminLoginView: React.FC = () => {
  const { loginAsSuperAdmin } = useHospital();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = loginAsSuperAdmin(email, password);
    if (!success) {
      setError('ভুল ইমেইল বা পাসওয়ার্ড! সঠিক তথ্য দিন।');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-200 relative text-slate-800">
        
        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-amber-500/20">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">সুপার এডমিন প্যানেল</h1>
          <p className="text-xs text-slate-500 mt-1">
            হাসপাতালের পূর্ণ নিয়ন্ত্রণ ও ব্যাকআপের জন্য এডমিন পাসওয়ার্ড দিন
          </p>
        </div>

        {/* Super Admin Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              এডমিন ইমেইল (Admin Email) *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="আপনার নিবন্ধিত ইমেইল লিখুন"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-hidden transition-all text-xs"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              পাসওয়ার্ড (Password) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="এডমিন পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:ring-2 focus:ring-slate-900 focus:outline-hidden transition-all text-xs"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md shadow-slate-900/20 transition-all cursor-pointer mt-2"
          >
            সুপার এডমিন হিসেবে প্রবেশ করুন
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <a
            href="#public"
            className="text-xs text-slate-400 hover:text-slate-600 font-semibold inline-flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>সাধারণ লাইভ ভিউতে ফিরে যান</span>
          </a>
        </div>

      </div>
    </div>
  );
};
