/**
 * Application Configuration
 * 
 * This file contains environment-specific configuration for the app.
 * In production, these values should be loaded from environment variables.
 */

// Determine if we're in development or production
export const IS_DEV = __DEV__;

// API Configuration
export const API_CONFIG = {
  // Base URL for API endpoints
  // In development: use 'local' for local JSON file or 'http://localhost:8888/api' for backend
  // In production: use your backend API URL
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'local',
  
  // API version
  VERSION: 'v1',
  
  // Timeout for API requests (in milliseconds)
  TIMEOUT: 10000,
  
  // Enable/disable API request logging
  ENABLE_LOGGING: IS_DEV,
};

// Endpoint paths
export const API_ENDPOINTS = {
  // Auth endpoints
  USER_LOGIN: '/api/auth/login',
  USER_LOGOUT: '/api/auth/logout',
  USER_REGISTER: '/api/auth/register',
  
  // User endpoints
  USER: '/api/auth/user',
  USER_UPDATE: '/api/auth/user/update',
  
  // Doctor endpoints
  DOCTORS: '/api/doctors',
  DOCTOR_BY_ID: '/api/doctors/:id',
  
  // Appointment endpoints
  APPOINTMENTS: '/api/appointments',
  APPOINTMENT_BY_ID: '/api/appointments/:id',
  APPOINTMENT_CREATE: '/api/appointments/create',
  APPOINTMENT_UPDATE: '/api/appointments/:id',
  APPOINTMENT_DELETE: '/api/appointments/:id',
  
  // Medication endpoints
  MEDICATIONS: '/api/medications',
  MEDICATION_BY_ID: '/api/medications/:id',
  MEDICATION_MARK_TAKEN: '/api/medications/:id/taken',
  
  // Health records endpoints
  HEALTH_RECORDS: '/api/health-records',
  HEALTH_RECORD_BY_ID: '/api/health-records/:id',
  
  // Notification endpoints
  NOTIFICATIONS: '/api/notifications',
  NOTIFICATION_MARK_READ: '/api/notifications/:id/read',
  NOTIFICATION_MARK_ALL_READ: '/api/notifications/read-all',
  
  // Pharmacy endpoints
  PHARMACIES: '/api/pharmacies',
  PHARMACY_BY_ID: '/api/pharmacies/:id',
  
  // Emergency contacts
  EMERGENCY_CONTACTS: '/api/emergency-contacts',
  
  // Feedback endpoints
  FEEDBACK_SUBMIT: '/api/feedback/submit',
  FEEDBACK_LIST: '/api/feedback',
};

// Storage keys for AsyncStorage
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@medigate:auth_token',
  USER_DATA: '@medigate:user_data',
  LAST_SYNC: '@medigate:last_sync',
};
