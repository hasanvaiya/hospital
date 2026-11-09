import React, { useState } from 'react';
import { 
  Terminal, 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  Trash2, 
  LogOut, 
  ShieldAlert, 
  Activity, 
  Server, 
  Code2, 
  Copy, 
  Check, 
  Eye,
  ArrowLeft,
  FileJson
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const DeveloperView: React.FC = () => {
  const { 
    logout,
    patients,
    medicines,
    deliveries,
    auditLogs,
    factoryResetData,
    loadSampleHospitalData,
    exportDatabaseJSON,
    importDatabaseJSON,
    totalMedicines,
    lowStockMedicines,
    cSectionCount,
    normalCount,
    admittedCount,
    dischargedCount
  } = useHospital();

  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  // Approximate storage calculation
  const totalRecords = medicines.length + patients.length + deliveries.length + auditLogs.length;
  const rawData = {
    medicines,
    patients,
    deliveries,
    auditLogs,
    exportedAt: new Date().toISOString()
  };
  const jsonString = JSON.stringify(rawData, null, 2);
  const storageKb = (new Blob([jsonString]).size / 1024).toFixed(2);

  // Restore Handler
  const handleImport = () => {
    setImportStatus(null);
    if (!importJsonText.trim()) {
      setImportStatus('অনুগ্রহ করে ভ্যালিড ব্যাকআপ JSON কোড পেস্ট করুন।');
      return;
    }
    const success = importDatabaseJSON(importJsonText.trim());
    if (success) {
      setImportStatus('সফলভাবে ডাটাবেজ ব্যাকআপ ইমপোর্ট সম্পন্ন হয়েছে!');
      setImportJsonText('');
    } else {
      setImportStatus('ভুল JSON ফরম্যাট! ব্যাকআপ ফাইল চেক করুন।');
    }
  };

  // Copy raw JSON
  const handleCopyRaw = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Developer Top Header Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Terminal className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                  ডেভেলপার কন্ট্রোল প্যানেল
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">
                  ROOT / DEV
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                সিস্টেম ব্যাকআপ, ডেমো ডাটা ইনজেকশন, ডাটাবেজ রিসেট ও কোর স্টোরেজ কন্ট্রোল
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center space-x-3">
            <a
              href="#public"
              className="flex items-center space-x-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>লাইভ ভিউ</span>
            </a>
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>ডেভেলপার সাইনআউট</span>
            </button>
          </div>
        </div>
      </div>

      {/* Storage & System Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>স্টোরেজ সাইজ</span>
            <Server className="w-3.5 h-3.5 text-cyan-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">~{storageKb} KB</span>
          <span className="text-[10px] text-slate-500 font-bold block mt-0.5">LocalStorage (Active)</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>মোট রেকর্ড সংখ্যা</span>
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{totalRecords}</span>
          <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">ওষুধ + রোগী + প্রসব</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>রোগী ও প্রসব</span>
            <Database className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-blue-600 font-mono mt-1 block">{patients.length + deliveries.length}</span>
          <span className="text-[10px] text-slate-500 font-bold block mt-0.5">ভর্তি {admittedCount} | রিলিজ {dischargedCount}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold">
            <span>অডিট হিস্ট্রি লগ</span>
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-emerald-600 font-mono mt-1 block">{auditLogs.length}</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">সর্বশেষ অ্যাকশন রেকর্ড</span>
        </div>
      </div>

      {/* THE 3 CORE DEVELOPER TOOLS (Circled in user request) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            <span>ডেভেলপার কোর ডাটাবেজ টুলস (Developer Database Tools)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            এই অপশনগুলো শুধুমাত্র ডেভেলপারদের জন্য সংরক্ষিত। সাধারণ এডমিন প্যানেল থেকে এগুলো সম্পূর্ণ বিচ্ছিন্ন রাখা হয়েছে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          {/* Tool 1: Export / Download JSON */}
          <button
            onClick={exportDatabaseJSON}
            className="p-5 bg-gradient-to-b from-blue-50/50 to-blue-50 border border-blue-200 hover:border-blue-300 rounded-2xl text-left transition-all cursor-pointer group shadow-2xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <div className="text-slate-900 font-black text-sm mb-1 flex items-center space-x-1">
              <span>সম্পূর্ণ ডাটাবেজ ডাউনলোড (JSON)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              সকল ওষুধ, রোগী ও প্রসব রেকর্ড ১-ক্লিকে সেভ করুন
            </p>
            <span className="mt-3 inline-flex items-center text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
              ডাউনলোড ব্যাকআপ (.json)
            </span>
          </button>

          {/* Tool 2: Load Hospital Demo Data */}
          <button
            onClick={() => {
              if (confirm('আপনি কি টেস্ট করার জন্য স্ট্যান্ডার্ড ডেমো ডাটা লোড করতে চান?')) {
                loadSampleHospitalData();
              }
            }}
            className="p-5 bg-gradient-to-b from-emerald-50/50 to-emerald-50 border border-emerald-200 hover:border-emerald-300 rounded-2xl text-left transition-all cursor-pointer group shadow-2xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="text-slate-900 font-black text-sm mb-1 flex items-center space-x-1">
              <span>হাসপাতাল ডেমো ডাটা লোড করুন</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              পরীক্ষার সুবিধার্থে আদর্শ হাসপাতালের ডাটা সেট লোড করুন
            </p>
            <span className="mt-3 inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
              ডেমো ডাটা ইনজেকশন
            </span>
          </button>

          {/* Tool 3: Factory Reset All Data */}
          <button
            onClick={() => {
              if (confirm('🚨 চূড়ান্ত সতর্কতা: এটি সম্পূর্ণ ডাটাবেজ চিরতরে মুছে ফেলবে! আপনি কি নিশ্চিত?')) {
                factoryResetData();
              }
            }}
            className="p-5 bg-gradient-to-b from-rose-50/50 to-rose-50 border border-rose-200 hover:border-rose-300 rounded-2xl text-left transition-all cursor-pointer group shadow-2xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-rose-900 font-black text-sm mb-1 flex items-center space-x-1">
              <span>ফ্যাক্টরি রিসেট (সকল ডাটা মুছুন)</span>
            </div>
            <p className="text-xs text-rose-700/80 leading-relaxed">
              সতর্কতার সাথে ব্যবহার করুন (সকল ডাটা মুছে একদম খালি হবে)
            </p>
            <span className="mt-3 inline-flex items-center text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md">
              সম্পূর্ণ ডাটাবেজ মোছুন
            </span>
          </button>

        </div>
      </div>

      {/* RESTORE JSON DATABASE SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">ডাটাবেজ রিস্টোর (Restore JSON)</h3>
              <p className="text-xs text-slate-500">পূর্বে ডাউনলোড করা JSON ফাইলের কোড দিয়ে ডাটা ফিরিয়ে আনুন</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <textarea
            rows={4}
            placeholder="JSON ব্যাকআপ কোড এখানে পেস্ট করুন (যেমন: { 'medicines': [...], 'patients': [...] })..."
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs focus:bg-white focus:outline-hidden text-slate-900"
          />

          {importStatus && (
            <div className={`p-3 rounded-xl text-xs font-bold ${
              importStatus.includes('সফলভাবে') 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {importStatus}
            </div>
          )}

          <button
            onClick={handleImport}
            className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>ডাটাবেজ রিস্টোর নিশ্চিত করুন</span>
          </button>
        </div>
      </div>

      {/* RAW JSON STATE INSPECTOR (DEV ONLY) */}
      <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <FileJson className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-black text-white font-mono">লাইভ ডাটাবেজ স্টেট ইন্সপেক্টর (Raw JSON Inspector)</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowRawJson(!showRawJson)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showRawJson ? 'হাইড করুন' : 'র কোড দেখুন'}</span>
            </button>
            <button
              onClick={handleCopyRaw}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে!' : 'JSON কপি'}</span>
            </button>
          </div>
        </div>

        {showRawJson ? (
          <pre className="bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-cyan-300 max-h-96 overflow-auto border border-slate-800 leading-relaxed">
            {jsonString}
          </pre>
        ) : (
          <p className="text-xs text-slate-400">
            বর্তমানে মোট {medicines.length}টি ওষুধ, {patients.length}জন রোগী, {deliveries.length}টি প্রসব রেকর্ড ও {auditLogs.length}টি অডিট লগ ডাটাবেজে সক্রিয় রয়েছে। সম্পূর্ণ কোড দেখতে 'র কোড দেখুন' বাটনে চাপুন।
          </p>
        )}
      </div>

    </div>
  );
};
export default DeveloperView;