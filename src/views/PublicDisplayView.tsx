import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  LogIn, 
  Pill, 
  Users, 
  Baby, 
  Heart, 
  BedDouble, 
  Clock, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  UserMinus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const PublicDisplayView: React.FC = () => {
  const { 
    patients, 
    medicines, 
    deliveries, 
    admittedCount, 
    dischargedCount, 
    totalMedicines, 
    lowStockMedicines, 
    cSectionCount, 
    normalCount 
  } = useHospital();
  
  const [activeTab, setActiveTab] = useState<'medicines' | 'patients' | 'deliveries'>('medicines');
  const [patientSubFilter, setPatientSubFilter] = useState<'admitted' | 'discharged'>('admitted');
  const [search, setSearch] = useState('');

  const admittedPatients = patients.filter(p => p.status === 'admitted');
  const dischargedPatients = patients.filter(p => p.status === 'discharged');

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.genericName && m.genericName.toLowerCase().includes(search.toLowerCase())) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const activePatientList = patientSubFilter === 'admitted' ? admittedPatients : dischargedPatients;
  const filteredPatients = activePatientList.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.patientId.toLowerCase().includes(search.toLowerCase()) ||
    p.bedNumber.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDeliveries = deliveries.filter(d => 
    d.patientName.toLowerCase().includes(search.toLowerCase()) ||
    d.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
    d.leadDoctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex flex-col font-sans">
      
      {/* Humanized Top Navigation Bar (Pure View - No Login Triggers) */}
      <header className="h-16 bg-white border-b border-[#E5EAF2] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1E6BFF] to-[#00D2B4] flex items-center justify-center text-white shadow-xs shadow-blue-200">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">MediCare HMS</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1E6BFF] border border-blue-200">
                হাসপাতাল লাইভ তথ্য বোর্ড
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              হাসপাতালের ওষুধ মজুদ, প্রসূতি ডেলিভারি ও ভর্তি/রিলিজ রোগীর সার্বিক তথ্য
            </p>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>লাইভ বোর্ড সক্রিয়</span>
        </div>

      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* PROMINENT MEDICINE STOCK WARNING BANNER (যদি কোনো ওষুধের স্টক কমে যায়) */}
        {lowStockMedicines.length > 0 && (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-4 sm:p-5 text-white shadow-md shadow-orange-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base">
                  ⚠️ জরুরি ওষুধ স্টক সতর্কতা! ({lowStockMedicines.length} টি ওষুধের স্টক কম)
                </h3>
                <p className="text-xs text-orange-100 mt-0.5">
                  নিচের ওষুধগুলোর মজুদ ন্যূনতম সীমার নিচে নেমে এসেছে: {' '}
                  <strong className="text-white underline">
                    {lowStockMedicines.map(m => `${m.name} (${m.quantity} পিস)`).join(', ')}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Humanized Hospital Status Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
          
          {/* Card 1: Admitted Patients */}
          <div className="bg-white rounded-3xl p-5 border border-[#E5EAF2] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase">বর্তমানে ভর্তি রোগী</span>
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#1E6BFF] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">{admittedCount} <span className="text-xs font-medium text-slate-400">জন</span></div>
            <div className="text-[11px] text-blue-600 font-semibold mt-1">হাসপাতালে চিকিৎসাধীন</div>
          </div>

          {/* Card 2: Released Patients */}
          <div className="bg-white rounded-3xl p-5 border border-[#E5EAF2] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase">রিলিজ / ছাড়পত্র প্রাপ্ত</span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserMinus className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600 mt-2">{dischargedCount} <span className="text-xs font-medium text-slate-400">জন</span></div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">সুস্থ হয়ে বাড়ি ফিরেছেন</div>
          </div>

          {/* Card 3: C-Section Deliveries */}
          <div className="bg-white rounded-3xl p-5 border border-[#E5EAF2] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase">সিজারিয়ান প্রসব</span>
              <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Baby className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-rose-600 mt-2">{cSectionCount} <span className="text-xs font-medium text-slate-400">টি</span></div>
            <div className="text-[11px] text-rose-700 font-semibold mt-1">সফল সিজারিয়ান ডেলিভারি</div>
          </div>

          {/* Card 4: Normal Deliveries */}
          <div className="bg-white rounded-3xl p-5 border border-[#E5EAF2] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase">স্বাভাবিক প্রসব</span>
              <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-teal-600 mt-2">{normalCount} <span className="text-xs font-medium text-slate-400">টি</span></div>
            <div className="text-[11px] text-teal-700 font-semibold mt-1">নিরাপদ নরমাল ডেলিভারি</div>
          </div>

        </div>

        {/* Tab Selector & Polite Search Bar */}
        <div className="bg-white rounded-3xl border border-[#E5EAF2] p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Main 3 Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('medicines')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'medicines' ? 'bg-white text-[#1E6BFF] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>ওষুধের স্টক তালিকা ({medicines.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('patients')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'patients' ? 'bg-white text-[#1E6BFF] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>রোগীর অবস্থা ও রিলিজ তালিকা ({patients.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('deliveries')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'deliveries' ? 'bg-white text-[#1E6BFF] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>সিজার ও নরমাল ডেলিভারি ({deliveries.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ওষুধ, প্রসূতি বা রোগীর নাম দিয়ে খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#1E6BFF] text-slate-800 placeholder-slate-400"
            />
          </div>

        </div>

        {/* Tab 1: Medicine Stock List with Visual Warning Status */}
        {activeTab === 'medicines' && (
          <div className="bg-white rounded-3xl border border-[#E5EAF2] shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/60">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800">
                  হাসপাতাল ফার্মেসিতে ওষুধের বর্তমান মজুদ তালিকা
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  মোট ওষুধের আইটেম: {medicines.length} টি • কম স্টকের সতর্কতা: {lowStockMedicines.length} টি
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs font-semibold">
                <span className="flex items-center text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5"></span>
                  পর্যাপ্ত মজুদ
                </span>
                <span className="flex items-center text-amber-700 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5"></span>
                  কম স্টক
                </span>
              </div>
            </div>

            {filteredMedicines.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                {medicines.length === 0 ? 'বর্তমানে কোনো ওষুধ তালিকায় নেই। স্টাফ বা এডমিন প্যানেল থেকে ওষুধ যুক্ত করা যাবে।' : 'খুঁজে পাওয়া যায়নি।'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFD] text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">ওষুধের নাম</th>
                      <th className="py-3.5 px-4">জেনেরিক ও কোম্পানি</th>
                      <th className="py-3.5 px-4">ক্যাটাগরি</th>
                      <th className="py-3.5 px-4">পাওয়ার</th>
                      <th className="py-3.5 px-4 text-right">বর্তমান মজুদ (Stock)</th>
                      <th className="py-3.5 px-4 text-center">স্টক অবস্থা (Warning)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredMedicines.map((m) => {
                      const isOutOfStock = m.quantity === 0;
                      const isLow = m.quantity <= m.minStockAlert && m.quantity > 0;

                      return (
                        <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-5 font-bold text-slate-900 text-sm">
                            {m.name}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <div className="font-mono text-[11px]">{m.genericName || '-'}</div>
                            <div className="text-[10px] text-slate-400">{m.company || ''}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px]">
                              {m.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {m.strength || '-'}
                          </td>
                          <td className="py-3.5 px-4 text-right font-black text-sm text-slate-900 font-mono">
                            {m.quantity} পিস
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {isOutOfStock ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold text-[10px] border border-rose-200">
                                ❌ স্টক শূন্য (Out of Stock)
                              </span>
                            ) : isLow ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px] border border-amber-200">
                                ⚠️ স্টক কম ({m.quantity} পিস বাকি)
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                ✅ পর্যাপ্ত মজুদ
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Patient Admission & Discharged / Released List */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-3xl border border-[#E5EAF2] shadow-2xs overflow-hidden">
            
            {/* Sub Filter: Admitted vs Discharged */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
              <div className="flex items-center space-x-2 bg-slate-200/80 p-1 rounded-2xl text-xs font-bold">
                <button
                  onClick={() => setPatientSubFilter('admitted')}
                  className={`px-4 py-1.5 rounded-xl transition-all ${
                    patientSubFilter === 'admitted' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  বর্তমানে ভর্তি আছেন ({admittedPatients.length} জন)
                </button>
                <button
                  onClick={() => setPatientSubFilter('discharged')}
                  className={`px-4 py-1.5 rounded-xl transition-all ${
                    patientSubFilter === 'discharged' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  রিলিজ / ছাড়পত্র প্রাপ্ত ({dischargedPatients.length} জন)
                </button>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                {patientSubFilter === 'admitted' ? 'চিকিৎসাধীন রোগীর তালিকা' : 'কে রিলিজ হলো তার পূর্ণাঙ্গ তথ্য'}
              </div>
            </div>

            {filteredPatients.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                {patientSubFilter === 'admitted' ? 'বর্তমানে কোনো রোগী ভর্তি নেই।' : 'এখনো কাউকে রিলিজ বা ছাড়পত্র দেওয়া হয়নি।'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFD] text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">রোগীর নাম ও আইডি</th>
                      <th className="py-3.5 px-4">বয়স ও লিঙ্গ</th>
                      <th className="py-3.5 px-4">রক্তের গ্রুপ</th>
                      <th className="py-3.5 px-4">বেড ও ওয়ার্ড</th>
                      <th className="py-3.5 px-4">দায়িত্বপ্রাপ্ত ডাক্তার</th>
                      <th className="py-3.5 px-4">ভর্তির তারিখ</th>
                      {patientSubFilter === 'discharged' ? (
                        <th className="py-3.5 px-4 text-emerald-700 font-bold">রিলিজ হওয়ার তারিখ</th>
                      ) : (
                        <th className="py-3.5 px-4">বর্তমান অবস্থা</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredPatients.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                          <div className="font-mono text-[11px] text-[#1E6BFF]">{p.patientId}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          {p.age} বছর ({p.gender === 'female' ? 'মহিলা' : 'পুরুষ'})
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                            {p.bloodGroup || 'B+'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-indigo-900">
                          {p.bedNumber} ({p.ward})
                        </td>
                        <td className="py-3.5 px-4 text-slate-800">
                          {p.doctorName}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">
                          {p.admissionDate}
                        </td>
                        {patientSubFilter === 'discharged' ? (
                          <td className="py-3.5 px-4 font-bold text-emerald-700 font-mono">
                            {p.dischargeDate || 'সম্প্রতি রিলিজ'}
                          </td>
                        ) : (
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                              ভর্তি চিকিৎসাধীন
                            </span>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: C-Section & Normal Delivery Information */}
        {activeTab === 'deliveries' && (
          <div className="bg-white rounded-3xl border border-[#E5EAF2] shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/60">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800">
                  সিজারিয়ান (C-Section) ও স্বাভাবিক প্রসবের বিবরণ
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  প্রসূতি মায়ের নাম, সার্জন ডাক্তার, নবজাতকের ওজন ও জন্ম সময়
                </p>
              </div>

              <div className="text-xs font-semibold text-slate-600">
                সিজার: <strong className="text-rose-600 font-bold">{cSectionCount} জন</strong> • নরমাল: <strong className="text-teal-600 font-bold">{normalCount} জন</strong>
              </div>
            </div>

            {filteredDeliveries.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                কোনো ডেলিভারি রেকর্ড এখনও পাওয়া যায়নি।
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FAFD] text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">প্রসূতি মায়ের নাম</th>
                      <th className="py-3.5 px-4">প্রসবের ধরণ</th>
                      <th className="py-3.5 px-4">দায়িত্বপ্রাপ্ত ডাক্তার</th>
                      <th className="py-3.5 px-4">তারিখ ও সময়</th>
                      <th className="py-3.5 px-4">নবজাতক শিশু</th>
                      <th className="py-3.5 px-4 text-center">স্বাস্থ্য মন্তব্য</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredDeliveries.map((del) => (
                      <tr key={del.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900 text-sm">{del.patientName}</div>
                          <div className="text-[11px] text-slate-400">বয়স: {del.patientAge} বছর</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                            del.type === 'c_section' ? 'bg-rose-100 text-rose-800' : 'bg-teal-100 text-teal-800'
                          }`}>
                            {del.type === 'c_section' ? 'সিজারিয়ান (C-Section)' : 'স্বাভাবিক প্রসব'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {del.leadDoctor}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">
                          {del.date} • {del.time}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-800">
                          {del.babyGender === 'female' ? '🌸 কন্যাসন্তান' : '🌟 পুত্রসন্তান'} ({del.babyWeight} কেজি)
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                            {del.notes || 'মা ও শিশু সুস্থ আছেন'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
