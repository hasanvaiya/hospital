import React, { useState } from 'react';
import { Key, Lock, AlertCircle, ArrowLeft, Building2 } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const StaffLoginView: React.FC = () => {
  const { loginAsStaff } = useHospital();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = loginAsStaff(passcode);
    if (!success) {
      setError('ভুল পাসকোড! সঠিক ৪ ডিজিটের স্টাফ পাসকোড দিন।');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF4FF] via-[#F4F7FC] to-[#E3FAF5] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 border border-slate-100 relative text-slate-800">
        
        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E6BFF] to-[#00D2B4] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
            <Key className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">স্টাফ ১ পোর্টাল</h1>
          <p className="text-xs text-slate-500 mt-1">
            ওষুধের স্টক (+/-), রোগী ভর্তি ও রিলিজ এবং প্রসব রেকর্ডের জন্য পাসকোড দিন
          </p>
        </div>

        {/* Staff Passcode Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="font-bold text-slate-700 block mb-2 text-xs">
              স্টাফ ১ এন্ট্রি পাসকোড (Staff Passcode) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="৪ ডিজিটের পাসকোড"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl font-black tracking-widest text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1E6BFF] focus:outline-hidden transition-all"
                autoFocus
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
            className="w-full py-3 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            স্টাফ পোর্টালে প্রবেশ করুন
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
