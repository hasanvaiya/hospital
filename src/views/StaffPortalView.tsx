import React, { useState } from 'react';
import { 
  Building2, 
  Pill, 
  Users, 
  Baby, 
  Plus, 
  Minus, 
  Trash2, 
  LogOut, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  ExternalLink,
  Printer,
  Calendar,
  Heart,
  Activity,
  ArrowRight
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { DeliveryRecord, Medicine, MedicineCategory, Gender } from '../types';

interface StaffPortalViewProps {
  onGoToPublicView: () => void;
  onOpenSuperAdmin: () => void;
}

export const StaffPortalView: React.FC<StaffPortalViewProps> = ({ 
  onGoToPublicView,
  onOpenSuperAdmin
}) => {
  const { 
    logout, 
    medicines, 
    patients, 
    deliveries, 
    increaseStock, 
    decreaseStock, 
    addNewMedicine, 
    deleteMedicine, 
    admitPatient, 
    dischargePatient, 
    deletePatient, 
    addDelivery, 
    deleteDelivery,
    totalMedicines,
    lowStockMedicines,
    admittedCount,
    dischargedCount,
    cSectionCount,
    normalCount
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'medicines' | 'patients' | 'deliveries'>('medicines');
  const [search, setSearch] = useState('');

  // Modals state
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
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
  const [medQty, setMedQty] = useState<number>(50);
  const [medMinAlert, setMedMinAlert] = useState<number>(10);
  const [medBatch, setMedBatch] = useState('BATCH-' + Math.floor(1000 + Math.random() * 9000));
  const [medExpiry, setMedExpiry] = useState('2027-12-31');

  // Patient Form State
  const [patName, setPatName] = useState('');
  const [patAge, setPatAge] = useState<number>(25);
  const [patGender, setPatGender] = useState<Gender>('female');
  const [patPhone, setPatPhone] = useState('017');
  const [patAddress, setPatAddress] = useState('ঢাকা');
  const [patGuardian, setPatGuardian] = useState('');
  const [patBed, setPatBed] = useState('বেড-১০১');
  const [patWard, setPatWard] = useState('গাইনী ও প্রসূতি ওয়ার্ড');
  const [patDoctor, setPatDoctor] = useState('ডাঃ ফারহানা ইয়াসমিন');
  const [patBlood, setPatBlood] = useState('B+');
  const [patNotes, setPatNotes] = useState('প্রসব বেদনা / নিয়মিত পর্যবেক্ষণ');

  // Delivery Form State
  const [delType, setDelType] = useState<'c_section' | 'normal_delivery'>('c_section');
  const [delPatientName, setDelPatientName] = useState('');
  const [delPatientAge, setDelPatientAge] = useState<number>(25);
  const [delDate, setDelDate] = useState(new Date().toISOString().split('T')[0]);
  const [delTime, setDelTime] = useState('11:30 AM');
  const [delDoctor, setDelDoctor] = useState('ডাঃ ফারহানা ইয়াসমিন');
  const [delOtRoom, setDelOtRoom] = useState('ওটি-১ (ম্যাটারনিটি ওটি)');
  const [delBabyGender, setDelBabyGender] = useState<'female' | 'male'>('female');
  const [delBabyWeight, setDelBabyWeight] = useState<number>(3.1);
  const [delBabyHealth, setDelBabyHealth] = useState<'healthy' | 'under_observation' | 'nicu_required'>('healthy');
  const [delNotes, setDelNotes] = useState('মা ও নবজাতক উভয়ই সম্পূর্ণ সুস্থ আছেন');

  // Custom stock amount input modal / quick adder
  const [quickAmount, setQuickAmount] = useState<number>(10);

  // Submit Medicine
  const handleAddMedicineSubmit = (e: React.FormEvent) => {
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
    setIsAddMedModalOpen(false);
  };

  // Submit Patient Admission
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
    setPatGuardian('');
    setIsAdmitModalOpen(false);
  };

  // Submit Delivery Record
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

  // Filtered Medicines
  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.genericName && m.genericName.toLowerCase().includes(search.toLowerCase())) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  // Filtered Patients
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

  // Filtered Deliveries
  const filteredDeliveries = deliveries.filter(d => 
    d.patientName.toLowerCase().includes(search.toLowerCase()) ||
    d.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
    d.leadDoctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1E6BFF] to-[#00D2B4] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">স্টাফ পোর্টাল</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-[#1E6BFF]">
                স্টাফ ১ (Staff 1)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              ওষুধের স্টক (+/-), রোগী ভর্তি ও রিলিজ, এবং সিজার ও নরমাল ডেলিভারি ম্যানেজমেন্ট
            </p>
          </div>
        </div>

        {/* Quick Actions & Navigation: 3 Distinct Links */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onGoToPublicView}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>🌐 সাধারণ ভিউ</span>
          </button>

          <button
            onClick={onOpenSuperAdmin}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>👑 সুপার এডমিন</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap bg-white p-1.5 rounded-2xl border border-slate-200 gap-1 shadow-2xs">
        <button
          onClick={() => { setActiveTab('medicines'); setSearch(''); }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'medicines' 
              ? 'bg-[#1E6BFF] text-white shadow-sm shadow-blue-500/30' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>১. ওষুধ স্টক ও মজুদ ({totalMedicines})</span>
          {lowStockMedicines.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
          )}
        </button>

        <button
          onClick={() => { setActiveTab('patients'); setSearch(''); }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'patients' 
              ? 'bg-[#1E6BFF] text-white shadow-sm shadow-blue-500/30' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>২. রোগী ভর্তি ও রিলিজ ({admittedCount} জন ভর্তি)</span>
        </button>

        <button
          onClick={() => { setActiveTab('deliveries'); setSearch(''); }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            activeTab === 'deliveries' 
              ? 'bg-[#1E6BFF] text-white shadow-sm shadow-blue-500/30' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Baby className="w-4 h-4" />
          <span>৩. সিজার ও ডেলিভারি ({deliveries.length})</span>
        </button>
      </div>

      {/* Low Stock Warning Banner if any medicine is low */}
      {lowStockMedicines.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-4 text-amber-900 flex items-start space-x-3 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-bounce" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold">সতর্কবার্তা:</span> {lowStockMedicines.length}টি ওষুধের স্টক কমে এসেছে বা শেষ হয়ে গেছে ({lowStockMedicines.map(m => `${m.name} (${m.quantity})`).slice(0, 4).join(', ')}{lowStockMedicines.length > 4 ? '...' : ''})। অবিলম্বে স্টক বাড়ানোর ব্যবস্থা নিন।
          </div>
        </div>
      )}

      {/* TAB 1: MEDICINE STOCK MANAGEMENT */}
      {activeTab === 'medicines' && (
        <div className="space-y-4">
          
          {/* Action & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ওষুধের নাম বা গ্রুপ খুঁজুন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#1E6BFF] focus:outline-hidden"
              />
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setIsAddMedModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ওষুধ যোগ করুন</span>
              </button>
            </div>
          </div>

          {/* Medicine List Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">ওষুধের নাম ও শক্তি</th>
                    <th className="py-3 px-4">ক্যাটাগরি ও কোম্পানি</th>
                    <th className="py-3 px-4">ব্যাচ ও মেয়াদ</th>
                    <th className="py-3 px-4 text-center">মজুদ স্টক ও প্লাস / মাইনাস (+ / -)</th>
                    <th className="py-3 px-4 text-center">স্টক অবস্থা</th>
                    <th className="py-3 px-4 text-right">মুছুন</th>
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
                          <span className="px-2.5 py-1 bg-blue-50 text-[#1E6BFF] rounded-lg font-bold text-[11px]">
                            {med.category}
                          </span>
                          <div className="text-[11px] text-slate-500 mt-1">{med.company || 'N/A'}</div>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                          <div>ব্যাচ: {med.batchNumber || 'N/A'}</div>
                          <div className="text-slate-400 mt-0.5">মেয়াদ: {med.expiryDate || 'N/A'}</div>
                        </td>

                        {/* Instant PLUS (+) and MINUS (-) Stock Adjusters */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            {/* Minus Button */}
                            <button
                              onClick={() => decreaseStock(med.id, 1)}
                              disabled={med.quantity <= 0}
                              title="১ ইউনিট কমান"
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-700 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-2xs font-bold"
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            {/* Current Quantity Display */}
                            <span className={`w-16 text-center font-black text-base font-mono px-2 py-1 rounded-xl border ${
                              isOut 
                                ? 'bg-rose-100 text-rose-700 border-rose-300' 
                                : isLow 
                                  ? 'bg-amber-100 text-amber-800 border-amber-300' 
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}>
                              {med.quantity}
                            </span>

                            {/* Plus Button */}
                            <button
                              onClick={() => increaseStock(med.id, 1)}
                              title="১ ইউনিট বাড়ান"
                              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-2xs font-bold"
                            >
                              <Plus className="w-4 h-4" />
                            </button>

                            {/* Quick +10 Batch Adder */}
                            <button
                              onClick={() => increaseStock(med.id, 10)}
                              title="একবারে ১০ ইউনিট যোগ করুন"
                              className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1E6BFF] text-[10px] font-bold border border-blue-200 transition-colors cursor-pointer"
                            >
                              +১০
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {isOut ? (
                            <span className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px] uppercase tracking-wider">
                              স্টক নেই (0)
                            </span>
                          ) : isLow ? (
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px] uppercase tracking-wider">
                              সীমিত স্টক (≤{med.minStockAlert})
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-[10px] uppercase tracking-wider">
                              পর্যাপ্ত মজুদ
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`আপনি কি সত্যিই "${med.name}" তালিকা থেকে মুছে ফেলতে চান?`)) {
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

                  {filteredMedicines.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        কোনো ওষুধের তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PATIENT ADMISSION & RELEASE TRACKING */}
      {activeTab === 'patients' && (
        <div className="space-y-4">
          
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-2xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E6BFF] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[11px] font-bold block">বর্তমানে চিকিৎসাধীন রোগী</span>
                <span className="text-xl font-black text-slate-900">{admittedCount} জন</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[11px] font-bold block">সুস্থ হয়ে রিলিজ প্রাপ্ত রোগী</span>
                <span className="text-xl font-black text-emerald-700">{dischargedCount} জন</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[11px] font-bold block">মোট রোগী রেজিস্টার</span>
                <span className="text-xl font-black text-slate-900">{patients.length} জন</span>
              </div>
            </div>
          </div>

          {/* Action Bar & Sub Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            {/* Filter Buttons */}
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
                সকল ({patients.length})
              </button>
            </div>

            {/* Search and Admit Button */}
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
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন রোগী ভর্তি</span>
              </button>
            </div>
          </div>

          {/* Patients Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">রোগীর আইডি ও নাম</th>
                    <th className="py-3 px-4">বয়স ও লিঙ্গ</th>
                    <th className="py-3 px-4">বেড ও ওয়ার্ড</th>
                    <th className="py-3 px-4">ভর্তির তারিখ</th>
                    <th className="py-3 px-4">দায়িত্বপ্রাপ্ত ডাক্তার</th>
                    <th className="py-3 px-4 text-center">অবস্থা ও ছাড়পত্র (Release)</th>
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

                        {/* 1-Click Release Action */}
                        <td className="py-3.5 px-4 text-center">
                          {isAdmitted ? (
                            <button
                              onClick={() => {
                                if (confirm(`রোগী "${p.name}" কে সুস্থ ঘোষণা করে ছাড়পত্র (Release) প্রদান করতে চান?`)) {
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
                              if (confirm(`আপনি কি সত্যিই "${p.name}" এর রেকর্ড মুছে ফেলতে চান?`)) {
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

                  {filteredPatients.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        কোনো রোগীর তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: C-SECTION & NORMAL DELIVERY MANAGEMENT */}
      {activeTab === 'deliveries' && (
        <div className="space-y-4">
          
          {/* Summary Delivery Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[11px] font-bold block">সিজারিয়ান ডেলিভারি (C-Section)</span>
                <span className="text-xl font-black text-rose-700">{cSectionCount} টি</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-2xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[11px] font-bold block">স্বাভাবিক প্রসব (Normal Delivery)</span>
                <span className="text-xl font-black text-teal-700">{normalCount} টি</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[11px] font-bold block">সর্বমোট নবজাতক প্রসব</span>
                <span className="text-xl font-black text-slate-900">{deliveries.length} টি</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="মাতার নাম বা রেজিস্ট্রেশন নম্বর..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden"
              />
            </div>

            <button
              onClick={() => setIsDeliveryModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন প্রসব রেকর্ড এন্ট্রি</span>
            </button>
          </div>

          {/* Delivery Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">রেজিস্ট্রেশন নং</th>
                    <th className="py-3 px-4">মাতার নাম ও বয়স</th>
                    <th className="py-3 px-4">প্রসবের ধরণ</th>
                    <th className="py-3 px-4">তারিখ ও সময়</th>
                    <th className="py-3 px-4">দায়িত্বপ্রাপ্ত চিকিৎসক</th>
                    <th className="py-3 px-4">নবজাতক তথ্য</th>
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
                        {del.otRoom && <div className="text-[10px] text-slate-400 mt-0.5">{del.otRoom}</div>}
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
                        <span className="inline-block mt-0.5 text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-semibold">
                          {del.babyHealth === 'healthy' ? 'সুস্থ' : del.babyHealth === 'under_observation' ? 'পর্যবেক্ষণে' : 'এনআইসিইউ'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`আপনি কি সত্যিই এই ডেলিভারি রেকর্ড মুছে ফেলতে চান?`)) {
                              deleteDelivery(del.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredDeliveries.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        কোনো প্রসব রেকর্ড পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD NEW MEDICINE */}
      {isAddMedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              নতুন ওষুধ স্টকে এন্ট্রি করুন
            </h2>

            <form onSubmit={handleAddMedicineSubmit} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ওষুধের বাণিজ্যিক নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: Napa Extra, Seclo 20"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">জেনেরিক নাম (Generic)</label>
                  <input
                    type="text"
                    placeholder="যেমন: Paracetamol + Caffeine"
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
                  <label className="font-bold text-slate-700 block mb-1">শক্তি / ডোজ (Strength)</label>
                  <input
                    type="text"
                    placeholder="যেমন: 500mg, 1g, 10 IU"
                    value={medStrength}
                    onChange={(e) => setMedStrength(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">কোম্পানির নাম</label>
                  <input
                    type="text"
                    placeholder="যেমন: Square, Incepta, Beximco"
                    value={medCompany}
                    onChange={(e) => setMedCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">প্রাথমিক মজুদ পরিমাণ *</label>
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
                  <label className="font-bold text-slate-700 block mb-1">কম স্টক সতর্কবার্তা থ্রেশহোল্ড</label>
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
                  onClick={() => setIsAddMedModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl font-bold cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  স্টকে সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADMIT PATIENT */}
      {isAdmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              নতুন রোগী ভর্তি ফর্ম
            </h2>

            <form onSubmit={handleAdmitSubmit} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">রোগীর পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোসাঃ খাদিজা বেগম"
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
                  <label className="font-bold text-slate-700 block mb-1">লিঙ্গ</label>
                  <select
                    value={patGender}
                    onChange={(e) => setPatGender(e.target.value as Gender)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  >
                    <option value="female">মহিলা (Female)</option>
                    <option value="male">পুরুষ (Male)</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">রক্তের গ্রুপ</label>
                  <select
                    value={patBlood}
                    onChange={(e) => setPatBlood(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">বেড নম্বর *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: বেড-১০১, কেবিন-৩"
                    value={patBed}
                    onChange={(e) => setPatBed(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">ওয়ার্ড / বিভাগ</label>
                  <input
                    type="text"
                    placeholder="যেমন: গাইনী ও প্রসূতি ওয়ার্ড"
                    value={patWard}
                    onChange={(e) => setPatWard(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">দায়িত্বপ্রাপ্ত ডাক্তার *</label>
                  <input
                    type="text"
                    required
                    value={patDoctor}
                    onChange={(e) => setPatDoctor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">মোবাইল নম্বর</label>
                  <input
                    type="text"
                    value={patPhone}
                    onChange={(e) => setPatPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">অভিভাবকের নাম ও সম্পর্ক</label>
                <input
                  type="text"
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম (স্বামী)"
                  value={patGuardian}
                  onChange={(e) => setPatGuardian(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ভর্তির কারণ / প্রাথমিক নোট</label>
                <textarea
                  rows={2}
                  value={patNotes}
                  onChange={(e) => setPatNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                />
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
                  className="px-5 py-2 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl font-bold cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  রোগী ভর্তি নিশ্চিত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD DELIVERY RECORD */}
      {isDeliveryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              নতুন প্রসব / ডেলিভারি এন্ট্রি
            </h2>

            <form onSubmit={handleDeliverySubmit} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">প্রসবের ধরণ *</label>
                  <select
                    value={delType}
                    onChange={(e) => setDelType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden font-bold"
                  >
                    <option value="c_section">সিজারিয়ান (C-Section)</option>
                    <option value="normal_delivery">স্বাভাবিক প্রসব (Normal Delivery)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">ওটি রুম / লেবার রুম</label>
                  <input
                    type="text"
                    value={delOtRoom}
                    onChange={(e) => setDelOtRoom(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মাতার নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="মাতার পূর্ণ নাম"
                    value={delPatientName}
                    onChange={(e) => setDelPatientName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">মাতার বয়স *</label>
                  <input
                    type="number"
                    required
                    min="15"
                    value={delPatientAge}
                    onChange={(e) => setDelPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={delDate}
                    onChange={(e) => setDelDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">সময় *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: 11:30 AM"
                    value={delTime}
                    onChange={(e) => setDelTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">দায়িত্বপ্রাপ্ত চিকিৎসক (Lead Doctor) *</label>
                <input
                  type="text"
                  required
                  value={delDoctor}
                  onChange={(e) => setDelDoctor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-3">
                <span className="font-black text-slate-800 block text-[11px] uppercase tracking-wide">
                  👶 নবজাতকের তথ্য
                </span>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">লিঙ্গ</label>
                    <select
                      value={delBabyGender}
                      onChange={(e) => setDelBabyGender(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden"
                    >
                      <option value="female">🌸 কন্যাসন্তান</option>
                      <option value="male">🌟 পুত্রসন্তান</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">ওজন (কেজি)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      value={delBabyWeight}
                      onChange={(e) => setDelBabyWeight(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">স্বাস্থ্য অবস্থা</label>
                    <select
                      value={delBabyHealth}
                      onChange={(e) => setDelBabyHealth(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden font-medium"
                    >
                      <option value="healthy">সুস্থ</option>
                      <option value="under_observation">পর্যবেক্ষণে</option>
                      <option value="nicu_required">এনআইসিইউ</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">মন্তব্য / অপারেশন নোট</label>
                <textarea
                  rows={2}
                  value={delNotes}
                  onChange={(e) => setDelNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden"
                />
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
                  className="px-5 py-2 bg-[#1E6BFF] hover:bg-blue-600 text-white rounded-xl font-bold cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  প্রসব রেকর্ড সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
