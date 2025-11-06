/**
 * API Client
 * 
 * This is the main API client that handles all HTTP requests.
 * Uses expo-secure-store for encrypted token storage.
 * ALL data is stored in MongoDB backend - NO local storage for security.
 */

import { API_CONFIG, API_ENDPOINTS } from '../../constants/config';
import { secureStorage } from '../storage/secureStorage';
import type { ApiResponse } from './types';

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Set authentication token (stored securely in device keychain)
   */
  async setAuthToken(token: string) {
    await secureStorage.saveAuthToken(token);
  }

  /**
   * Get authentication token from secure storage
   */
  async getAuthToken(): Promise<string | null> {
    return await secureStorage.getAuthToken();
  }

  /**
   * Clear authentication token
   */
  async clearAuthToken() {
    await secureStorage.removeAuthToken();
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
   * Always connects to MongoDB backend - NO local data storage for security
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
      // Get auth token from secure storage
      const authToken = await this.getAuthToken();

      // Production mode - make actual HTTP request to MongoDB backend
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
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
        error: error instanceof Error ? error.message : 'Network error - Please check your connection',
      };
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, urlParams?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, urlParams);
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
}

// Export singleton instance
export const apiClient = new ApiClient();
