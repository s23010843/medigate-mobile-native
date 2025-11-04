/**
 * Type definitions for API requests and responses
 */

// User types
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  avatar: string;
  memberSince: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalInfo: {
    bloodType: string;
    height: string;
    weight: string;
    allergies: string[];
    chronicConditions: string[];
    insuranceProvider: string;
    insuranceId: string;
  };
  preferences: {
    pushNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    darkMode: boolean;
    biometricAuth: boolean;
    language: string;
  };
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  avatar: string;
  lastSeen: string;
  verified: boolean;
  rating: number;
  reviews: number;
  experience: string;
  about: string;
  education: string[];
  languages: string[];
  availability: string;
  consultationFee: number;
}

export interface Appointment {
  id: number;
  doctorId: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  type: string;
  reason: string;
  location?: string;
  notes?: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string | null;
  prescribedBy: string;
  instructions: string;
  refills: number;
  color: string;
  available: boolean;
  taken: { [date: string]: string[] };
}

export interface HealthRecord {
  id: number;
  title: string;
  date: string;
  type: string;
  category: string;
  icon: string;
  doctor: string;
  description?: string;
  results?: any;
  findings?: string;
  medication?: string;
  instructions?: string;
  vitals?: any;
  status?: string;
}

export interface Notification {
  id: number;
  type: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  message: string;
  time: string;
  timestamp: string;
  read: boolean;
  actionable: boolean;
  action?: string;
}

export interface Pharmacy {
  id: number;
  name: string;
  distance: string;
  rating: number;
  reviews: number;
  open: boolean;
  address: string;
  phone: string;
  hours: { [day: string]: string };
  services: string[];
}

export interface EmergencyContact {
  id: number;
  type: string;
  name: string;
  phone: string;
  description: string;
}

// Request/Response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface UpdateUserRequest {
  updates: Partial<User>;
}

export interface CreateAppointmentRequest {
  doctorId: number;
  date: string;
  time: string;
  type: string;
  reason: string;
}

export interface MarkMedicationTakenRequest {
  medicationId: number;
  date: string;
  time: string;
}
