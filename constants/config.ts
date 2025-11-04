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
  // In development: use local JSON file
  // In production: use your backend API URL
  BASE_URL: process.env.EXPO_PUBLIC_API_URL === 'local' || !process.env.EXPO_PUBLIC_API_URL || IS_DEV
    ? 'local' // Special flag for local JSON file
    : process.env.EXPO_PUBLIC_API_URL,
  
  // API version
  VERSION: 'v1',
  
  // Timeout for API requests (in milliseconds)
  TIMEOUT: 10000,
  
  // Enable/disable API request logging
  ENABLE_LOGGING: IS_DEV,
};

// Endpoint paths
export const API_ENDPOINTS = {
  // User endpoints
  USER: '/user',
  USER_UPDATE: '/user/update',
  USER_LOGIN: '/auth/login',
  USER_LOGOUT: '/auth/logout',
  USER_REGISTER: '/auth/register',
  
  // Doctor endpoints
  DOCTORS: '/doctors',
  DOCTOR_BY_ID: '/doctors/:id',
  
  // Appointment endpoints
  APPOINTMENTS: '/appointments',
  APPOINTMENT_BY_ID: '/appointments/:id',
  APPOINTMENT_CREATE: '/appointments/create',
  APPOINTMENT_UPDATE: '/appointments/:id',
  APPOINTMENT_DELETE: '/appointments/:id',
  
  // Medication endpoints
  MEDICATIONS: '/medications',
  MEDICATION_BY_ID: '/medications/:id',
  MEDICATION_MARK_TAKEN: '/medications/:id/taken',
  
  // Health records endpoints
  HEALTH_RECORDS: '/health-records',
  HEALTH_RECORD_BY_ID: '/health-records/:id',
  
  // Notification endpoints
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_MARK_READ: '/notifications/:id/read',
  NOTIFICATION_MARK_ALL_READ: '/notifications/read-all',
  
  // Pharmacy endpoints
  PHARMACIES: '/pharmacies',
  PHARMACY_BY_ID: '/pharmacies/:id',
  
  // Emergency contacts
  EMERGENCY_CONTACTS: '/emergency-contacts',
  
  // Feedback endpoints
  FEEDBACK_SUBMIT: '/feedback/submit',
  FEEDBACK_LIST: '/feedback',
};

// Storage keys for AsyncStorage
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@medigate:auth_token',
  USER_DATA: '@medigate:user_data',
  LAST_SYNC: '@medigate:last_sync',
};
