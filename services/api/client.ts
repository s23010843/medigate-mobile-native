/**
 * API Client
 * 
 * This is the main API client that handles all HTTP requests.
 * In development, it loads data from local JSON file.
 * In production, it makes HTTP requests to the backend API.
 */

import { API_CONFIG, API_ENDPOINTS } from '../../constants/config';
import type { ApiResponse } from './types';

// Load user data dynamically to handle production builds where the file may not exist
let userData: any = null;
let userDataLoaded = false;

async function loadUserData() {
  if (userDataLoaded) return userData;
  
  try {
    // Try to load the local JSON file
    userData = require('../../private/user-data.json');
    userDataLoaded = true;
  } catch (error) {
    // If file doesn't exist (production/web build), use mock data
    console.warn('[API] Local user data not found, using mock data');
    userData = {
      user: { id: 1, fullName: 'Demo User', email: 'demo@example.com' },
      doctors: [],
      appointments: [],
      medications: [],
      healthRecords: [],
      notifications: [],
      pharmacies: [],
      emergencyContacts: []
    };
    userDataLoaded = true;
  }
  
  return userData;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private authToken: string | null = null;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string) {
    this.authToken = token;
  }

  /**
   * Clear authentication token
   */
  clearAuthToken() {
    this.authToken = null;
  }

  /**
   * Build full URL for an endpoint
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    let url = endpoint;
    
    // Replace URL parameters
    if (params) {
      Object.keys(params).forEach(key => {
        url = url.replace(`:${key}`, params[key]);
      });
    }
    
    return this.baseURL === 'local' ? url : `${this.baseURL}${url}`;
  }

  /**
   * Log API requests in development mode
   */
  private log(method: string, url: string, data?: any) {
    if (API_CONFIG.ENABLE_LOGGING) {
      console.log(`[API] ${method} ${url}`, data ? data : '');
    }
  }

  /**
   * Make HTTP request
   * In development mode with local data, this simulates API responses
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    urlParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, urlParams);
    this.log(method, url, data);

    try {
      // If using local data (development mode)
      if (this.baseURL === 'local') {
        return this.handleLocalRequest<T>(method, endpoint, data, urlParams);
      }

      // Production mode - make actual HTTP request
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.authToken) {
        headers['Authorization'] = `Bearer ${this.authToken}`;
      }

      const config: RequestInit = {
        method,
        headers,
        signal: AbortSignal.timeout(this.timeout),
      };

      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: responseData.message || 'Request failed',
        };
      }

      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      console.error('[API] Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Handle local data requests (development mode)
   * This simulates API responses using the local JSON file
   */
  private async handleLocalRequest<T>(
    method: string,
    endpoint: string,
    data?: any,
    urlParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      // Load user data if not already loaded
      const localData = await loadUserData();
      
      // Route to appropriate local data
      switch (endpoint) {
        case API_ENDPOINTS.USER:
          return { success: true, data: localData.user as T };
        
        case API_ENDPOINTS.DOCTORS:
          return { success: true, data: localData.doctors as T };
        
        case API_ENDPOINTS.DOCTOR_BY_ID:
          const doctorId = urlParams?.id;
          const doctor = localData.doctors.find((d: any) => d.id === parseInt(doctorId || '0'));
          return { success: true, data: doctor as T };
        
        case API_ENDPOINTS.APPOINTMENTS:
          return { success: true, data: localData.appointments as T };
        
        case API_ENDPOINTS.MEDICATIONS:
          return { success: true, data: localData.medications as T };
        
        case API_ENDPOINTS.HEALTH_RECORDS:
          return { success: true, data: localData.healthRecords as T };
        
        case API_ENDPOINTS.NOTIFICATIONS:
          return { success: true, data: localData.notifications as T };
        
        case API_ENDPOINTS.PHARMACIES:
          return { success: true, data: localData.pharmacies as T };
        
        case API_ENDPOINTS.EMERGENCY_CONTACTS:
          return { success: true, data: localData.emergencyContacts as T };
        
        case API_ENDPOINTS.USER_LOGIN:
          // Mock login
          if (data?.email && data?.password) {
            return {
              success: true,
              data: {
                token: 'mock_token_' + Date.now(),
                user: localData.user,
              } as T,
            };
          }
          return { success: false, error: 'Invalid credentials' };
        
        case API_ENDPOINTS.FEEDBACK_SUBMIT:
          // Mock feedback submission
          console.log('[API] Feedback submitted (local mode):', data);
          return {
            success: true,
            data: {
              id: 'local_feedback_' + Date.now(),
              message: 'Feedback submitted successfully (local mode)',
            } as T,
          };
        
        case API_ENDPOINTS.FEEDBACK_LIST:
          // Mock feedback list
          return {
            success: true,
            data: [] as T,
          };
        
        default:
          // For other endpoints, return success with the provided data
          return { success: true, data: data as T };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Local data error',
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, urlParams?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, urlParams);
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: any, urlParams?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, urlParams);
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data: any, urlParams?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, urlParams);
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data: any, urlParams?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, urlParams);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, urlParams?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, urlParams);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
