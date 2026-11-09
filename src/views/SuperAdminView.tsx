import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Pill, 
  Users, 
  Baby, 
  LogOut, 
  Trash2, 
  Plus, 
  Minus, 
  Download, 
  Upload, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Search,
  Printer,
  History,
  Lock,
  ExternalLink,
  Activity,
  Heart,
  Database
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { Medicine, DeliveryRecord, MedicineCategory, Gender } from '../types';

export const SuperAdminView: React.FC = () => {
  const { 
    logout,
    patients,
    medicines,
    deliveries,
    auditLogs,
    increaseStock,
    decreaseStock,
    addNewMedicine,
    deleteMedicine,
    admitPatient,
    dischargePatient,
    deletePatient,
    addDelivery,
    deleteDelivery,
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

  const [activeTab, setActiveTab] = useState<'overview' | 'medicines' | 'patients' | 'deliveries' | 'audit' | 'backup'>('overview');
  const [search, setSearch] = useState('');

  // Modals for Admin
  const [isNewMedModalOpen, setIsNewMedModalOpen] = useState(false);
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  // Patient Sub-filter
  const [patientFilter, setPatientFilter] = useState<'admitted' | 'discharged' | 'all'>('admitted');

  // Medicine Form State
  const [medName, setMedName] = useState('');
  const [medGeneric, setMedGeneric] = useState('');
  const [medCategory, setMedCategory] = useState<MedicineCategory>('Tablet');
  const [medCompany, setMedCompany] = useState('Square Pharmaceuticals');
  const [medStrength, setMedStrength] = useState('500mg');
  const [medQty, setMedQty] = useState<number>(100);
  const [medMinAlert, setMedMinAlert] = useState<number>(15);
  const [medBatch, setMedBatch] = useState('BATCH-' + Math.floor(1000 + Math.random() * 9000));
  const [medExpiry, setMedExpiry] = useState('2028-06-30');

  // Patient Form State
  const [patName, setPatName] = useState('');
  const [patAge, setPatAge] = useState<number>(26);
  const [patGender, setPatGender] = useState<Gender>('female');
  const [patPhone, setPatPhone] = useState('018');
  const [patAddress, setPatAddress] = useState('মিরপুর, ঢাকা');
  const [patGuardian, setPatGuardian] = useState('');
  const [patBed, setPatBed] = useState('বেড-১০২');
  const [patWard, setPatWard] = useState('গাইনী ও প্রসূতি ওয়ার্ড');
  const [patDoctor, setPatDoctor] = useState('ডাঃ ফারহানা ইয়াসমিন');
  const [patBlood, setPatBlood] = useState('O+');
  const [patNotes, setPatNotes] = useState('সিজারিয়ান পর্যবেক্ষণে ভর্তি');

  // Delivery Form State
  const [delType, setDelType] = useState<'c_section' | 'normal_delivery'>('c_section');
  const [delPatientName, setDelPatientName] = useState('');
  const [delPatientAge, setDelPatientAge] = useState<number>(27);
  const [delDate, setDelDate] = useState(new Date().toISOString().split('T')[0]);
  const [delTime, setDelTime] = useState('02:00 PM');
  const [delDoctor, setDelDoctor] = useState('ডাঃ ফারহানা ইয়াসমিন');
  const [delOtRoom, setDelOtRoom] = useState('ওটি-২ (মেজর ওটি)');
  const [delBabyGender, setDelBabyGender] = useState<'female' | 'male'>('male');
  const [delBabyWeight, setDelBabyWeight] = useState<number>(3.3);
  const [delBabyHealth, setDelBabyHealth] = useState<'healthy' | 'under_observation' | 'nicu_required'>('healthy');
  const [delNotes, setDelNotes] = useState('মা ও নবজাতক সুস্থ');

  // JSON Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Submit Medicine
  const handleCreateMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim()) return;

    addNewMedicine({
      name: medName.trim(),
      genericName: medGeneric.trim() || undefined,
      category: medCategory,
      company: medCompany.trim() || undefined,
      strength: medStrength.trim() || undefined,
      quantity: Number(medQty) || 0,
      minStockAlert: Number(medMinAlert) || 10,
      batchNumber: medBatch.trim() || undefined,
      expiryDate: medExpiry
    });

    setMedName('');
    setMedGeneric('');
    setIsNewMedModalOpen(false);
  };

  // Submit Patient
  const handleAdmitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patName.trim()) return;

    admitPatient({
      name: patName.trim(),
      age: Number(patAge) || 20,
      gender: patGender,
      phone: patPhone.trim(),
      address: patAddress.trim(),
      guardianName: patGuardian.trim(),
      bedNumber: patBed.trim(),
      ward: patWard.trim(),
      doctorName: patDoctor.trim(),
      bloodGroup: patBlood.trim(),
      notes: patNotes.trim()
    });

    setPatName('');
    setIsAdmitModalOpen(false);
  };

  // Submit Delivery
  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delPatientName.trim()) return;

    addDelivery({
      patientName: delPatientName.trim(),
      patientAge: Number(delPatientAge) || 25,
      type: delType,
      date: delDate,
      time: delTime,
      leadDoctor: delDoctor.trim(),
      otRoom: delOtRoom.trim(),
      babyGender: delBabyGender,
      babyWeight: Number(delBabyWeight) || 3.0,
      babyHealth: delBabyHealth,
      notes: delNotes.trim()
    });

    setDelPatientName('');
    setIsDeliveryModalOpen(false);
  };

  // JSON Import handler
  const handleImport = () => {
    setImportStatus(null);
    if (!importJsonText.trim()) {
      setImportStatus('অনুগ্রহ করে ব্যাকআপ JSON ডাটা পেস্ট করুন।');
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

  // Filters
  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.genericName && m.genericName.toLowerCase().includes(search.toLowerCase())) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const admittedPatients = patients.filter(p => p.status === 'admitted');
  const dischargedPatients = patients.filter(p => p.status === 'discharged');
  const currentPatientList = patientFilter === 'admitted' 
    ? admittedPatients 
    : patientFilter === 'discharged' 
      ? dischargedPatients 
      : patients;

  const filteredPatients = currentPatientList.filter(p => 
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
    <div className="space-y-6">
      
      {/* Super Admin Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">সুপার এডমিন মাস্টার প্যানেল</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Full Control
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              ওষুধের স্টক, ভর্তি ও রিলিজ হওয়া রোগী, সিজার ও ডেলিভারি এবং ব্যাকআপ কন্ট্রোল
            </p>
          </div>
        </div>

        {/* Top actions */}
        <div>
          <button
            onClick={logout}
            className="flex items-center space-x-1.5 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>এডমিন সাইনআউট</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap bg-white p-1.5 rounded-2xl border border-slate-200 gap-1 shadow-2xs">
        <button
          onClick={() => { setActiveTab('overview'); setSearch(''); }}
          className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'overview' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>সার্বিক ওভারভিউ</span>
        </button>

        <button
          onClick={() => { setActiveTab('medicines'); setSearch(''); }}
          className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'medicines' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>ওষুধ মাস্টার ({totalMedicines})</span>
          {lowStockMedicines.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          )}
        </button>

        <button
          onClick={() => { setActiveTab('patients'); setSearch(''); }}
          className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'patients' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>রোগী ও রিলিজ ({admittedCount} ভর্তি)</span>
        </button>

        <button
          onClick={() => { setActiveTab('deliveries'); setSearch(''); }}
          className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'deliveries' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Baby className="w-4 h-4" />
          <span>সিজার ও প্রসব ({deliveries.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('audit'); setSearch(''); }}
          className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'audit' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <History className="w-4 h-4" />
          <span>অডিট লগ ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('backup'); setSearch(''); }}
          className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeTab === 'backup' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>ব্যাকআপ ও রিস্টোর</span>
        </button>
      </div>

      {/* Low stock alert banner */}
      {lowStockMedicines.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-4 text-amber-900 flex items-start space-x-3 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-bounce" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold">জরুরি স্টক সতর্কতা:</span> {lowStockMedicines.length}টি ওষুধের স্টক কমে এসেছে বা শূন্য হয়ে গেছে ({lowStockMedicines.map(m => `${m.name} (${m.quantity})`).slice(0, 5).join(', ')}{lowStockMedicines.length > 5 ? '...' : ''})।
          </div>
        </div>
      )}

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] font-bold block">মোট ওষুধ তালিকা</span>
              <span className="text-2xl font-black text-slate-900">{totalMedicines}</span>
              <span className="text-[10px] text-blue-600 font-bold block mt-1">সক্রিয় আইটেম</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] font-bold block">কম স্টক ওষুধ</span>
              <span className="text-2xl font-black text-amber-600">{lowStockMedicines.length}</span>
              <span className="text-[10px] text-amber-700 font-bold block mt-1">সতর্কবার্তা প্রয়োজন</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] font-bold block">বর্তমানে চিকিৎসাধীন</span>
              <span className="text-2xl font-black text-[#1E6BFF]">{admittedCount}</span>
              <span className="text-[10px] text-blue-600 font-bold block mt-1">ভর্তি রোগী</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] font-bold block">সুস্থ হয়ে রিলিজ</span>
              <span className="text-2xl font-black text-emerald-600">{dischargedCount}</span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-1">ছাড়পত্র প্রাপ্ত</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] font-bold block">সিজার ডেলিভারি</span>
              <span className="text-2xl font-black text-rose-600">{cSectionCount}</span>
              <span className="text-[10px] text-rose-700 font-bold block mt-1">C-Section</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-200 shadow-2xs">
              <span className="text-slate-500 text-[11px] font-bold block">স্বাভাবিক প্রসব</span>
              <span className="text-2xl font-black text-teal-600">{normalCount}</span>
              <span className="text-[10px] text-teal-700 font-bold block mt-1">Normal Delivery</span>
            </div>
          </div>

          {/* Quick System Tools */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center space-x-2">
              <Database className="w-4 h-4 text-slate-700" />
              <span>সুপার এডমিন কুইক টুলস ও ব্যাকআপ</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={exportDatabaseJSON}
                className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-left transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs mb-1">
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>সম্পূর্ণ ডাটাবেজ ডাউনলোড (JSON)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  সকল ওষুধ, রোগী ও প্রসব রেকর্ড ১-ক্লিকে সেভ করুন
                </p>
              </button>

              <button
                onClick={loadSampleHospitalData}
                className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-left transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs mb-1">
                  <RefreshCw className="w-4 h-4 text-emerald-600" />
                  <span>হাসপাতাল ডেমো ডাটা লোড করুন</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  পরীক্ষার সুবিধার্থে আদর্শ হাসপাতালের ডাটা সেট লোড করুন
                </p>
              </button>

              <button
                onClick={() => {
                  if (confirm('সতর্কতা: এটি সম্পূর্ণ ডাটাবেজ মুছে ফেলবে! আপনি কি নিশ্চিত?')) {
                    factoryResetData();
                  }
                }}
                className="p-4 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-2xl text-left transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs mb-1">
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>ফ্যাক্টরি রিসেট (সকল ডাটা মুছুন)</span>
                </div>
                <p className="text-[11px] text-rose-600/80">
                  সতর্কতার সাথে ব্যবহার করুন
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEDICINE MASTER CONTROL */}
      {activeTab === 'medicines' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ওষুধের নাম বা কোম্পানি খুঁজুন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
              />
            </div>

            <button
              onClick={() => setIsNewMedModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ওষুধ সংযোজন করুন</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">ওষুধের নাম ও ডোজ</th>
                    <th className="py-3 px-4">ক্যাটাগরি ও কোম্পানি</th>
                    <th className="py-3 px-4">ব্যাচ ও মেয়াদ</th>
                    <th className="py-3 px-4 text-center">স্টক ও সমন্বয় (+ / -)</th>
                    <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                    <th className="py-3 px-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMedicines.map((med) => {
                    const isLow = med.quantity <= med.minStockAlert;
                    const isOut = med.quantity === 0;

                    return (
                      <tr key={med.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">{med.name}</div>
                          {med.genericName && (
                            <div className="text-[11px] text-slate-500">{med.genericName}</div>
                          )}
                          {med.strength && (
                            <span className="inline-block px-2 py-0.5 mt-1 bg-slate-100 text-slate-600 font-mono text-[10px] rounded">
                              {med.strength}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 bg-blue-50 text-[#1E6BFF] rounded font-bold text-[11px]">
                            {med.category}
                          </span>
                          <div className="text-[11px] text-slate-500 mt-1">{med.company || 'N/A'}</div>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                          <div>ব্যাচ: {med.batchNumber || 'N/A'}</div>
                          <div className="text-slate-400 mt-0.5">মেয়াদ: {med.expiryDate || 'N/A'}</div>
                        </td>

                        {/* Direct Stock +/- for Super Admin */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => decreaseStock(med.id, 1)}
                              disabled={med.quantity <= 0}
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-700 flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer font-bold"
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            <span className={`w-16 text-center font-black text-base font-mono px-2 py-1 rounded-xl border ${
                              isOut 
                                ? 'bg-rose-100 text-rose-700 border-rose-300' 
                                : isLow 
                                  ? 'bg-amber-100 text-amber-800 border-amber-300' 
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}>
                              {med.quantity}
                            </span>

                            <button
                              onClick={() => increaseStock(med.id, 1)}
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-700 flex items-center justify-center transition-colors cursor-pointer font-bold"
                            >
                              <Plus className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => increaseStock(med.id, 50)}
                              title="একসাথে ৫০ ইউনিট যোগ করুন"
                              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer"
                            >
                              +৫০
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {isOut ? (
                            <span className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px]">
                              শূন্য স্টক (0)
                            </span>
                          ) : isLow ? (
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px]">
                              কম স্টক
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-[10px]">
                              পর্যাপ্ত
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`সুপার এডমিন: "${med.name}" স্থায়ীভাবে মুছে ফেলতে চান?`)) {
                                deleteMedicine(med.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PATIENT MASTER CONTROL */}
      {activeTab === 'patients' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold w-full sm:w-auto">
              <button
                onClick={() => setPatientFilter('admitted')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  patientFilter === 'admitted' ? 'bg-white text-[#1E6BFF] shadow-2xs' : 'text-slate-600'
                }`}
              >
                চিকিৎসাধীন ({admittedCount})
              </button>
              <button
                onClick={() => setPatientFilter('discharged')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  patientFilter === 'discharged' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                রিলিজ প্রাপ্ত ({dischargedCount})
              </button>
              <button
                onClick={() => setPatientFilter('all')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  patientFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                সকল রোগী ({patients.length})
              </button>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="রোগীর নাম বা বেড..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
                />
              </div>

              <button
                onClick={() => setIsAdmitModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>রোগী ভর্তি</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">রোগীর আইডি ও নাম</th>
                    <th className="py-3 px-4">বয়স ও লিঙ্গ</th>
                    <th className="py-3 px-4">বেড ও ওয়ার্ড</th>
                    <th className="py-3 px-4">ভর্তির তারিখ</th>
                    <th className="py-3 px-4">ডাক্তার</th>
                    <th className="py-3 px-4 text-center">অবস্থা ও রিলিজ</th>
                    <th className="py-3 px-4 text-right">মুছুন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPatients.map((p) => {
                    const isAdmitted = p.status === 'admitted';

                    return (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                            {p.patientId}
                          </span>
                          <div className="font-bold text-slate-900 text-sm mt-0.5">{p.name}</div>
                          {p.phone && <div className="text-[11px] text-slate-400">মোবাইল: {p.phone}</div>}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-700">{p.age} বছর</div>
                          <span className="text-[11px] text-slate-400 capitalize">{p.gender}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{p.bedNumber}</div>
                          <div className="text-[11px] text-slate-500">{p.ward}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-700">{p.admissionDate}</div>
                          {p.dischargeDate && (
                            <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
                              রিলিজ: {p.dischargeDate}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {p.doctorName}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {isAdmitted ? (
                            <button
                              onClick={() => {
                                if (confirm(`রোগী "${p.name}" কে ছাড়পত্র (Release) প্রদান করতে চান?`)) {
                                  dischargePatient(p.id);
                                }
                              }}
                              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1 mx-auto"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>ছাড়পত্র দিন</span>
                            </button>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[11px]">
                              <CheckCircle className="w-3 h-3" />
                              <span>রিলিজ প্রাপ্ত</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`রোগীর রেকর্ড মুছে ফেলতে চান?`)) {
                                deletePatient(p.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DELIVERY MASTER CONTROL */}
      {activeTab === 'deliveries' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="মাতার নাম বা রেজিস্ট্রেশন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
              />
            </div>

            <button
              onClick={() => setIsDeliveryModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন প্রসব রেকর্ড</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">রেজিস্ট্রেশন নং</th>
                    <th className="py-3 px-4">মাতার নাম ও বয়স</th>
                    <th className="py-3 px-4">প্রসবের ধরণ</th>
                    <th className="py-3 px-4">তারিখ ও সময়</th>
                    <th className="py-3 px-4">চিকিৎসক</th>
                    <th className="py-3 px-4">নবজাতক</th>
                    <th className="py-3 px-4 text-right">মুছুন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDeliveries.map((del) => (
                    <tr key={del.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-800">
                        {del.registrationNo}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{del.patientName}</div>
                        <div className="text-[11px] text-slate-400">{del.patientAge} বছর</div>
                      </td>

                      <td className="py-3.5 px-4">
                        {del.type === 'c_section' ? (
                          <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg font-bold text-[11px]">
                            সিজারিয়ান (C-Section)
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg font-bold text-[11px]">
                            স্বাভাবিক প্রসব (Normal)
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-700">{del.date}</div>
                        <div className="text-[11px] text-slate-400">{del.time}</div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {del.leadDoctor}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800 flex items-center space-x-1">
                          <span>{del.babyGender === 'female' ? '🌸 কন্যাসন্তান' : '🌟 পুত্রসন্তান'}</span>
                          <span className="text-slate-400">•</span>
                          <span>{del.babyWeight} কেজি</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`প্রসব রেকর্ড মুছে ফেলতে চান?`)) {
                              deleteDelivery(del.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <History className="w-4 h-4 text-slate-700" />
              <span>হাসপাতাল সিস্টেম অ্যাক্টিভিটি ও অডিট ট্রেইল</span>
            </h3>
            <span className="text-xs text-slate-500">সর্বশেষ {auditLogs.length}টি কর্মকাণ্ড সংরক্ষিত</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] border-b border-slate-200">
                  <th className="py-3 px-4">সময় ও তারিখ</th>
                  <th className="py-3 px-4">ব্যবহারকারী</th>
                  <th className="py-3 px-4">অ্যাকশন টাইপ</th>
                  <th className="py-3 px-4">বিস্তারিত তথ্য</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.role === 'super_admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-[#1E6BFF]'
                      }`}>
                        {log.user}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {log.details}
                    </td>
                  </tr>
                ))}

                {auditLogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      কোনো অডিট লগ পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Export Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">ডাটাবেজ এক্সপোর্ট (Export JSON)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                হাসপাতালের সকল তথ্য (ওষুধের স্টক, ভর্তি ও রিলিজ রোগী, প্রসব রেকর্ড ও অডিট লগ) একটি একক JSON ফাইল হিসেবে আপনার কম্পিউটারে সংরক্ষণ করুন।
              </p>
              <button
                onClick={exportDatabaseJSON}
                className="w-full py-3 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>JSON ব্যাকআপ ফাইল ডাউনলোড করুন</span>
              </button>
            </div>

            {/* Import / Restore Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">ডাটাবেজ রিস্টোর (Restore JSON)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                পূর্বে সেভ করা JSON ফাইলের কোড নিচে পেস্ট করে সরাসরি ডাটা রিস্টোর করুন।
              </p>
              
              <textarea
                rows={3}
                placeholder="JSON ব্যাকআপ কোড এখানে পেস্ট করুন..."
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] focus:bg-white focus:outline-hidden"
              />

              {importStatus && (
                <div className="p-2.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-800">
                  {importStatus}
                </div>
              )}

              <button
                onClick={handleImport}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>ব্যাকআপ ডাটা রিস্টোর করুন</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODALS */}
      {/* Modal 1: Add Medicine */}
      {isNewMedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              সুপার এডমিন: নতুন ওষুধ যোগ করুন
            </h2>

            <form onSubmit={handleCreateMedicine} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">বাণিজ্যিক নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: Ciprocin 500"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">জেনেরিক নাম</label>
                  <input
                    type="text"
                    placeholder="যেমন: Ciprofloxacin"
                    value={medGeneric}
                    onChange={(e) => setMedGeneric(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                  <select
                    value={medCategory}
                    onChange={(e) => setMedCategory(e.target.value as MedicineCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  >
                    <option value="Tablet">Tablet (ট্যাবলেট)</option>
                    <option value="Injection">Injection (ইনজেকশন)</option>
                    <option value="Saline">Saline (স্যালাইন)</option>
                    <option value="Syrup">Syrup (সিরাপ)</option>
                    <option value="Capsule">Capsule (ক্যাপসুল)</option>
                    <option value="Ointment">Ointment (মলম)</option>
                    <option value="Drops">Drops (ড্রপ)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">শক্তি / ডোজ</label>
                  <input
                    type="text"
                    value={medStrength}
                    onChange={(e) => setMedStrength(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">কোম্পানি</label>
                  <input
                    type="text"
                    value={medCompany}
                    onChange={(e) => setMedCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মজুদ পরিমাণ *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={medQty}
                    onChange={(e) => setMedQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">কম স্টক অ্যালার্ট</label>
                  <input
                    type="number"
                    min="1"
                    value={medMinAlert}
                    onChange={(e) => setMedMinAlert(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মেয়াদ শেষের তারিখ</label>
                  <input
                    type="date"
                    value={medExpiry}
                    onChange={(e) => setMedExpiry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewMedModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Admit Patient */}
      {isAdmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              রোগী ভর্তি ফর্ম
            </h2>

            <form onSubmit={handleAdmitSubmit} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">রোগীর নাম *</label>
                  <input
                    type="text"
                    required
                    value={patName}
                    onChange={(e) => setPatName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">বয়স *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={patAge}
                    onChange={(e) => setPatAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">বেড নম্বর *</label>
                  <input
                    type="text"
                    required
                    value={patBed}
                    onChange={(e) => setPatBed(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ডাক্তার *</label>
                  <input
                    type="text"
                    required
                    value={patDoctor}
                    onChange={(e) => setPatDoctor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdmitModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  ভর্তি সম্পন্ন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Delivery Record */}
      {isDeliveryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              প্রসব / সিজার এন্ট্রি ফর্ম
            </h2>

            <form onSubmit={handleDeliverySubmit} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">প্রসবের ধরণ</label>
                  <select
                    value={delType}
                    onChange={(e) => setDelType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="c_section">সিজারিয়ান (C-Section)</option>
                    <option value="normal_delivery">স্বাভাবিক প্রসব (Normal)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মাতার নাম *</label>
                  <input
                    type="text"
                    required
                    value={delPatientName}
                    onChange={(e) => setDelPatientName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">তারিখ</label>
                  <input
                    type="date"
                    required
                    value={delDate}
                    onChange={(e) => setDelDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ডাক্তার</label>
                  <input
                    type="text"
                    required
                    value={delDoctor}
                    onChange={(e) => setDelDoctor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDeliveryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
