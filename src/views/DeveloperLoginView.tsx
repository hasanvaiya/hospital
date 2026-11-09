import React, { useState } from 'react';
import { Terminal, Lock, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useHospital, DEVELOPER_PASSCODE } from '../context/HospitalContext';

export const DeveloperLoginView: React.FC = () => {
  const { loginAsDeveloper } = useHospital();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = loginAsDeveloper(passcode);
    if (!success) {
      setError('ভুল ডেভেলপার পাসকোড! সঠিক অথোরাইজড পাসকোড দিন।');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4">
      <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-800 relative text-slate-100">
        
        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/20">
            <Terminal className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>RESTRICTED DEVELOPER ACCESS</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight font-mono">ডেভেলপার এক্সেস গেটওয়ে</h1>
          <p className="text-xs text-slate-400 mt-1">
            ডাটাবেজ ডাউনলোড, ডেমো ডাটা ইনজেকশন ও ফ্যাক্টরি রিসেটের জন্য সিকিউরিটি পাসকোড দিন
          </p>
        </div>

        {/* Developer Passcode Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="font-bold text-slate-300 block mb-2 text-xs font-mono">
              DEVELOPER PASSCODE (পাসকোড) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="ডেভেলপার পাসকোড"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-center text-xl font-mono font-black tracking-widest text-cyan-300 focus:border-cyan-500 focus:outline-hidden transition-all placeholder:text-slate-600"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/20 text-rose-300 rounded-xl border border-rose-500/30 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold font-mono tracking-wider shadow-lg shadow-cyan-600/25 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>ডেভেলপার প্যানেলে প্রবেশ করুন</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <a
            href="#public"
            className="text-xs text-slate-400 hover:text-slate-200 font-semibold inline-flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>সাধারণ লাইভ ভিউতে ফিরে যান</span>
          </a>
        </div>

      </div>
    </div>
  );
};
export default DeveloperLoginView;