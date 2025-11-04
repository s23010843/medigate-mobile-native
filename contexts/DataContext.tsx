import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
    Appointment,
    appointmentService,
    Doctor,
    doctorService,
    EmergencyContact,
    emergencyService,
    HealthRecord,
    healthRecordService,
    Medication,
    medicationService,
    Notification,
    notificationService,
    Pharmacy,
    pharmacyService,
    User,
    userService,
} from '../services/api';

interface DataContextType {
  user: User | null;
  doctors: Doctor[];
  appointments: Appointment[];
  medications: Medication[];
  healthRecords: HealthRecord[];
  notifications: Notification[];
  pharmacies: Pharmacy[];
  emergencyContacts: EmergencyContact[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  getDoctorById: (id: number) => Doctor | undefined;
  markNotificationAsRead: (id: number) => void;
  markMedicationAsTaken: (medicationId: number, date: string, time: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: number, updates: Partial<Appointment>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load all data from API
  const loadAllData = async () => {
    try {
      const [
        doctorsRes,
        appointmentsRes,
        medicationsRes,
        healthRecordsRes,
        notificationsRes,
        pharmaciesRes,
        emergencyRes,
      ] = await Promise.all([
        doctorService.getAllDoctors(),
        appointmentService.getAllAppointments(),
        medicationService.getAllMedications(),
        healthRecordService.getAllRecords(),
        notificationService.getAllNotifications(),
        pharmacyService.getAllPharmacies(),
        emergencyService.getAllContacts(),
      ]);

      if (doctorsRes.success && doctorsRes.data) setDoctors(doctorsRes.data);
      if (appointmentsRes.success && appointmentsRes.data) setAppointments(appointmentsRes.data);
      if (medicationsRes.success && medicationsRes.data) setMedications(medicationsRes.data);
      if (healthRecordsRes.success && healthRecordsRes.data) setHealthRecords(healthRecordsRes.data);
      if (notificationsRes.success && notificationsRes.data) setNotifications(notificationsRes.data);
      if (pharmaciesRes.success && pharmaciesRes.data) setPharmacies(pharmaciesRes.data);
      if (emergencyRes.success && emergencyRes.data) setEmergencyContacts(emergencyRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Login function using API service
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await userService.login({ email, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        // Load all data after successful login
        await loadAllData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await userService.logout();
      setUser(null);
      setIsAuthenticated(false);
      // Clear all data
      setDoctors([]);
      setAppointments([]);
      setMedications([]);
      setHealthRecords([]);
      setNotifications([]);
      setPharmacies([]);
      setEmergencyContacts([]);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user information using API service
  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await userService.updateUser(updates);
      
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Update user error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get doctor by ID
  const getDoctorById = (id: number): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === id);
  };

  // Mark notification as read using API service
  const markNotificationAsRead = async (id: number) => {
    try {
      const response = await notificationService.markAsRead(id);
      
      if (response.success && response.data) {
        setNotifications(prev =>
          prev.map(notif =>
            notif.id === id ? response.data! : notif
          )
        );
      }
    } catch (error) {
      console.error('Mark notification error:', error);
    }
  };

  // Mark medication as taken using API service
  const markMedicationAsTaken = async (medicationId: number, date: string, time: string) => {
    try {
      const response = await medicationService.markAsTaken(medicationId, date, time);
      
      if (response.success && response.data) {
        setMedications(prev =>
          prev.map(med =>
            med.id === medicationId ? response.data! : med
          )
        );
      }
    } catch (error) {
      console.error('Mark medication error:', error);
    }
  };

  // Add new appointment using API service
  const addAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    setIsLoading(true);
    try {
      const response = await appointmentService.createAppointment({
        doctorId: appointment.doctorId,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        reason: appointment.reason,
      });
      
      if (response.success && response.data) {
        setAppointments(prev => [...prev, response.data!]);
      }
    } catch (error) {
      console.error('Add appointment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update appointment using API service
  const updateAppointment = async (id: number, updates: Partial<Appointment>) => {
    setIsLoading(true);
    try {
      const response = await appointmentService.updateAppointment(id, updates);
      
      if (response.success && response.data) {
        setAppointments(prev =>
          prev.map(apt =>
            apt.id === id ? response.data! : apt
          )
        );
      }
    } catch (error) {
      console.error('Update appointment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load user data on mount (simulating authentication check)
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd check for stored auth tokens here
        // For now, we'll try to load user data if authenticated
        const response = await userService.getUser();
        
        if (response.success && response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
          await loadAllData();
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const value: DataContextType = {
    user,
    doctors,
    appointments,
    medications,
    healthRecords,
    notifications,
    pharmacies,
    emergencyContacts,
    isAuthenticated,
    login,
    logout,
    updateUser,
    getDoctorById,
    markNotificationAsRead,
    markMedicationAsTaken,
    addAppointment,
    updateAppointment,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the data context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
