export type AuthRole = 'public' | 'staff' | 'super_admin';

export type Gender = 'male' | 'female' | 'other';
export type PatientStatus = 'admitted' | 'discharged';

export interface Patient {
  id: string;
  patientId: string; // e.g. MED-26-001
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  address?: string;
  guardianName?: string;
  bedNumber: string;
  ward: string;
  doctorName: string;
  bloodGroup?: string;
  admissionDate: string;
  dischargeDate?: string;
  status: PatientStatus;
  notes?: string;
}

export type MedicineCategory = 'Tablet' | 'Injection' | 'Saline' | 'Syrup' | 'Capsule' | 'Ointment' | 'Drops';

export interface Medicine {
  id: string;
  name: string;
  genericName?: string;
  category: MedicineCategory;
  strength?: string;
  quantity: number;
  minStockAlert: number;
  batchNumber?: string;
  expiryDate?: string;
  company?: string;
}

export type DeliveryType = 'c_section' | 'normal_delivery';

export interface DeliveryRecord {
  id: string;
  registrationNo: string; // e.g. DEL-26-001
  patientName: string;
  patientAge: number;
  type: DeliveryType;
  date: string;
  time: string;
  leadDoctor: string;
  otRoom?: string;
  babyGender: 'female' | 'male';
  babyWeight: number; // in kg
  babyHealth: 'healthy' | 'under_observation' | 'nicu_required';
  notes?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: 'super_admin' | 'staff';
  action: string;
  details: string;
}
