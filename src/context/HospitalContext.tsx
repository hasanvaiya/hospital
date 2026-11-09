import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AuthRole, 
  Patient, 
  Medicine, 
  DeliveryRecord, 
  AuditLogItem 
} from '../types';

export const STAFF_PASSCODE = '1234';
export const DEVELOPER_PASSCODE = '9999';
export const SUPER_ADMIN_CREDENTIALS = {
  email: 'admin@medicore.com',
  password: 'admin'
};

interface HospitalContextType {
  authRole: AuthRole;
  loginAsStaff: (pass: string) => boolean;
  loginAsSuperAdmin: (email: string, pass: string) => boolean;
  loginAsDeveloper: (pass: string) => boolean;
  logout: () => void;
  
  // Data State
  patients: Patient[];
  medicines: Medicine[];
  deliveries: DeliveryRecord[];
  auditLogs: AuditLogItem[];
  
  // Medicine Stock & Name Actions (+ / - / Add / Delete)
  increaseStock: (medicineId: string, amount?: number) => void;
  decreaseStock: (medicineId: string, amount?: number) => void;
  addNewMedicine: (data: Omit<Medicine, 'id'>) => Medicine;
  updateMedicine: (medicine: Medicine) => void;
  deleteMedicine: (medicineId: string) => void;
  
  // Patient Actions (Admission, Release / Discharge, Delete)
  admitPatient: (data: Omit<Patient, 'id' | 'patientId' | 'status' | 'admissionDate'>) => Patient;
  dischargePatient: (patientId: string) => void;
  deletePatient: (patientId: string) => void;
  
  // Delivery Actions (C-Section & Normal Delivery)
  addDelivery: (data: Omit<DeliveryRecord, 'id' | 'registrationNo'>) => DeliveryRecord;
  deleteDelivery: (deliveryId: string) => void;
  
  // System Tools
  factoryResetData: () => void;
  loadSampleHospitalData: () => void;
  exportDatabaseJSON: () => void;
  importDatabaseJSON: (jsonStr: string) => boolean;
  
  // Calculated statistics
  totalMedicines: number;
  lowStockMedicines: Medicine[];
  cSectionCount: number;
  normalCount: number;
  admittedCount: number;
  dischargedCount: number;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authRole, setAuthRole] = useState<AuthRole>(() => {
    return (localStorage.getItem('hms_auth_role') as AuthRole) || 'public';
  });

  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('hms_patients_db');
    return saved ? JSON.parse(saved) : [];
  });

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem('hms_medicines_db');
    return saved ? JSON.parse(saved) : [];
  });

  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>(() => {
    const saved = localStorage.getItem('hms_deliveries_db');
    return saved ? JSON.parse(saved) : [];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('hms_audit_db');
    return saved ? JSON.parse(saved) : [];
  });

  // Real-time Auto-Save to localStorage
  useEffect(() => {
    localStorage.setItem('hms_auth_role', authRole);
  }, [authRole]);

  useEffect(() => {
    localStorage.setItem('hms_patients_db', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('hms_medicines_db', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('hms_deliveries_db', JSON.stringify(deliveries));
  }, [deliveries]);

  useEffect(() => {
    localStorage.setItem('hms_audit_db', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addAuditLog = (action: string, details: string) => {
    const userName = authRole === 'super_admin' ? 'Super Admin' : 'Staff 1';
    const newLog: AuditLogItem = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toISOString().split('T')[0],
      user: userName,
      role: authRole === 'super_admin' ? 'super_admin' : 'staff',
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]); // keep last 100
  };

  // Auth Functions
  const loginAsStaff = (pass: string): boolean => {
    if (pass.trim() === STAFF_PASSCODE) {
      setAuthRole('staff');
      addAuditLog('STAFF_LOGIN', 'Staff 1 সফলভাবে পোর্টালে প্রবেশ করেছেন।');
      return true;
    }
    return false;
  };

  const loginAsSuperAdmin = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === SUPER_ADMIN_CREDENTIALS.email.toLowerCase() && pass === SUPER_ADMIN_CREDENTIALS.password) {
      setAuthRole('super_admin');
      addAuditLog('SUPER_ADMIN_LOGIN', 'Super Admin সফলভাবে মাস্টার প্যানেলে প্রবেশ করেছেন।');
      return true;
    }
    return false;
  };

  const loginAsDeveloper = (pass: string): boolean => {
    if (pass.trim() === DEVELOPER_PASSCODE || pass.trim() === 'dev1234') {
      setAuthRole('developer');
      addAuditLog('DEVELOPER_LOGIN', 'ডেভেলপার সফলভাবে সিস্টেম কন্ট্রোল প্যানেলে প্রবেশ করেছেন।');
      return true;
    }
    return false;
  };

  const logout = () => {
    const roleName = authRole === 'super_admin' ? 'Super Admin' : authRole === 'developer' ? 'Developer' : 'Staff 1';
    addAuditLog('LOGOUT', `${roleName} সাইনআউট করেছেন।`);
    setAuthRole('public');
  };

  // Medicine Actions: Quick Plus (+) and Minus (-)
  const increaseStock = (medicineId: string, amount: number = 1) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        const newQty = m.quantity + amount;
        return { ...m, quantity: newQty };
      }
      return m;
    }));
    const med = medicines.find(m => m.id === medicineId);
    addAuditLog('STOCK_INCREASE', `${med?.name || 'ওষুধ'} +${amount} ইউনিট বাড়ানো হয়েছে।`);
  };

  const decreaseStock = (medicineId: string, amount: number = 1) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        const newQty = Math.max(0, m.quantity - amount);
        return { ...m, quantity: newQty };
      }
      return m;
    }));
    const med = medicines.find(m => m.id === medicineId);
    addAuditLog('STOCK_DECREASE', `${med?.name || 'ওষুধ'} -${amount} ইউনিট কমানো হয়েছে।`);
  };

  const addNewMedicine = (data: Omit<Medicine, 'id'>): Medicine => {
    const newMed: Medicine = {
      ...data,
      id: 'med-' + Date.now()
    };
    setMedicines(prev => [newMed, ...prev]);
    addAuditLog('MEDICINE_ADDED', `নতুন ওষুধ স্টকে যোগ: ${newMed.name} (মজুদ: ${newMed.quantity})`);
    return newMed;
  };

  const updateMedicine = (updated: Medicine) => {
    setMedicines(prev => prev.map(m => m.id === updated.id ? updated : m));
    addAuditLog('MEDICINE_UPDATED', `ওষুধ আপডেট: ${updated.name}`);
  };

  const deleteMedicine = (medicineId: string) => {
    const med = medicines.find(m => m.id === medicineId);
    setMedicines(prev => prev.filter(m => m.id !== medicineId));
    addAuditLog('MEDICINE_DELETED', `ওষুধ তালিকা থেকে মুছে ফেলা হয়েছে: ${med?.name || medicineId}`);
  };

  // Patient Actions
  const admitPatient = (data: Omit<Patient, 'id' | 'patientId' | 'status' | 'admissionDate'>): Patient => {
    const count = patients.length + 1;
    const patientId = `MED-26-${String(count).padStart(3, '0')}`;
    const newPatient: Patient = {
      ...data,
      id: 'p-' + Date.now(),
      patientId,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'admitted'
    };
    setPatients(prev => [newPatient, ...prev]);
    addAuditLog('PATIENT_ADMITTED', `নতুন রোগী ভর্তি: ${newPatient.name} (${patientId}), বেড: ${newPatient.bedNumber}`);
    return newPatient;
  };

  const dischargePatient = (patientId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          status: 'discharged',
          dischargeDate: today
        };
      }
      return p;
    }));
    const p = patients.find(item => item.id === patientId);
    addAuditLog('PATIENT_RELEASED', `রোগী রিলিজ / ছাড়পত্র প্রদান: ${p?.name || patientId} (তারিখ: ${today})`);
  };

  const deletePatient = (patientId: string) => {
    const p = patients.find(item => item.id === patientId);
    setPatients(prev => prev.filter(item => item.id !== patientId));
    addAuditLog('PATIENT_DELETED', `রোগী রেকর্ড ডিলিট: ${p?.name || patientId}`);
  };

  // Delivery Actions
  const addDelivery = (data: Omit<DeliveryRecord, 'id' | 'registrationNo'>): DeliveryRecord => {
    const count = deliveries.length + 1;
    const prefix = data.type === 'c_section' ? 'CS-26-' : 'ND-26-';
    const regNo = `${prefix}${String(count).padStart(3, '0')}`;
    const newDel: DeliveryRecord = {
      ...data,
      id: 'del-' + Date.now(),
      registrationNo: regNo
    };
    setDeliveries(prev => [newDel, ...prev]);
    addAuditLog('DELIVERY_ADDED', `${newDel.type === 'c_section' ? 'সিজারিয়ান (C-Section)' : 'স্বাভাবিক প্রসব'} এন্ট্রি: ${newDel.patientName} (${regNo})`);
    return newDel;
  };

  const deleteDelivery = (deliveryId: string) => {
    const del = deliveries.find(d => d.id === deliveryId);
    setDeliveries(prev => prev.filter(d => d.id !== deliveryId));
    addAuditLog('DELIVERY_DELETED', `ডেলিভারি রেকর্ড ডিলিট: ${del?.patientName || deliveryId}`);
  };

  // System Tools
  const factoryResetData = () => {
    setPatients([]);
    setMedicines([]);
    setDeliveries([]);
    setAuditLogs([]);
    localStorage.removeItem('hms_patients_db');
    localStorage.removeItem('hms_medicines_db');
    localStorage.removeItem('hms_deliveries_db');
    localStorage.removeItem('hms_audit_db');
  };

  const loadSampleHospitalData = () => {
    const sampleMeds: Medicine[] = [
      { id: 'm-1', name: 'অক্সিটোসিন ইনজেকশন (Oxytocin 5 IU)', genericName: 'Oxytocin 5 IU/ml', category: 'Injection', strength: '5 IU / 1ml', quantity: 85, minStockAlert: 20, batchNumber: 'OXY-101', expiryDate: '2027-08-15', company: 'Incepta Pharma' },
      { id: 'm-2', name: 'সেফিক্সিম ৪০০ (Cefixime Capsule)', genericName: 'Cefixime Trihydrate', category: 'Capsule', strength: '400mg', quantity: 8, minStockAlert: 25, batchNumber: 'CFX-302', expiryDate: '2027-04-20', company: 'Square Pharma' }, // LOW STOCK WARNING
      { id: 'm-3', name: 'নাপা আইভি স্যালাইন (Paracetamol IV)', genericName: 'Paracetamol IV 100ml', category: 'Saline', strength: '1000mg/100ml', quantity: 3, minStockAlert: 15, batchNumber: 'NPA-882', expiryDate: '2027-01-10', company: 'Beximco' }, // CRITICAL LOW STOCK
      { id: 'm-4', name: 'ওমিপ্রাজল ৪০ ইনজেকশন (Omeprazole IV)', genericName: 'Omeprazole Sodium IV', category: 'Injection', strength: '40mg IV', quantity: 45, minStockAlert: 15, batchNumber: 'OMP-550', expiryDate: '2027-11-30', company: 'Eskayef' }
    ];

    const samplePatients: Patient[] = [
      { id: 'p-1', patientId: 'MED-26-001', name: 'রোকেয়া বেগম', age: 26, gender: 'female', phone: '01711-223344', bedNumber: 'বেড ১০১', ward: 'Maternity Ward', doctorName: 'ডাঃ ফারহানা ইয়াসমিন', bloodGroup: 'B+', admissionDate: '2026-11-07', status: 'admitted', notes: 'সিজারিয়ানের পর সুস্থ আছেন' },
      { id: 'p-2', patientId: 'MED-26-002', name: 'সুমি আক্তার', age: 24, gender: 'female', phone: '01912-334455', bedNumber: 'বেড ১০২', ward: 'Maternity Ward', doctorName: 'ডাঃ তানিয়া শারমিন', bloodGroup: 'O+', admissionDate: '2026-11-08', status: 'admitted', notes: 'স্বাভাবিক প্রসব সম্পন্ন' },
      { id: 'p-3', patientId: 'MED-26-003', name: 'ফারজানা আক্তার', age: 29, gender: 'female', phone: '01819-445566', bedNumber: 'কেবিন ২০১', ward: 'VIP Cabin', doctorName: 'ডাঃ ফারহানা ইয়াসমিন', bloodGroup: 'A+', admissionDate: '2026-11-05', dischargeDate: '2026-11-08', status: 'discharged', notes: 'সম্পূর্ণ সুস্থ অবস্থায় রিলিজ দেয়া হয়েছে' },
      { id: 'p-4', patientId: 'MED-26-004', name: 'হাসিনা বানু', age: 31, gender: 'female', phone: '01552-112233', bedNumber: 'বেড ১০৩', ward: 'Maternity Ward', doctorName: 'ডাঃ তানিয়া শারমিন', bloodGroup: 'AB+', admissionDate: '2026-11-04', dischargeDate: '2026-11-07', status: 'discharged', notes: 'ছাড়পত্র প্রাপ্ত' }
    ];

    const sampleDeliveries: DeliveryRecord[] = [
      {
        id: 'del-1',
        registrationNo: 'CS-26-001',
        patientName: 'রোকেয়া বেগম',
        patientAge: 26,
        type: 'c_section',
        date: '2026-11-08',
        time: '10:30 AM',
        leadDoctor: 'ডাঃ ফারহানা ইয়াসমিন (চিফ সার্জন)',
        otRoom: 'ওটি-১ (ম্যাটারনিটি ওটি)',
        babyGender: 'female',
        babyWeight: 3.25,
        babyHealth: 'healthy',
        notes: 'মা ও কন্যাসন্তান উভয়ই সম্পূর্ণ সুস্থ আছেন'
      },
      {
        id: 'del-2',
        registrationNo: 'ND-26-001',
        patientName: 'সুমি আক্তার',
        patientAge: 24,
        type: 'normal_delivery',
        date: '2026-11-08',
        time: '02:45 PM',
        leadDoctor: 'ডাঃ তানিয়া শারমিন',
        otRoom: 'লেবার রুম-২',
        babyGender: 'male',
        babyWeight: 3.1,
        babyHealth: 'healthy',
        notes: 'স্বাভাবিক নিরাপদ প্রসব'
      }
    ];

    setMedicines(sampleMeds);
    setPatients(samplePatients);
    setDeliveries(sampleDeliveries);
  };

  const exportDatabaseJSON = () => {
    const fullBackup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      patients,
      medicines,
      deliveries,
      auditLogs
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `medicare_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDatabaseJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.patients) && Array.isArray(data.medicines)) {
        setPatients(data.patients || []);
        setMedicines(data.medicines || []);
        setDeliveries(data.deliveries || []);
        setAuditLogs(data.auditLogs || []);
        addAuditLog('DATABASE_RESTORED', 'সম্পূর্ণ ডেটাবেজ ব্যাকআপ থেকে রিস্টোর করা হয়েছে।');
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const totalMedicines = medicines.length;
  const lowStockMedicines = medicines.filter(m => m.quantity <= m.minStockAlert);
  const cSectionCount = deliveries.filter(d => d.type === 'c_section').length;
  const normalCount = deliveries.filter(d => d.type === 'normal_delivery').length;
  const admittedCount = patients.filter(p => p.status === 'admitted').length;
  const dischargedCount = patients.filter(p => p.status === 'discharged').length;

  return (
    <HospitalContext.Provider value={{
      authRole,
      loginAsStaff,
      loginAsSuperAdmin,
      loginAsDeveloper,
      logout,
      patients,
      medicines,
      deliveries,
      auditLogs,
      increaseStock,
      decreaseStock,
      addNewMedicine,
      updateMedicine,
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
    }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
