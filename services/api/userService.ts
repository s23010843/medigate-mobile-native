/**
 * User Service
 * 
 * This service handles all user-related API calls.
 * ALL data is fetched from MongoDB backend - NO local storage.
 * Uses expo-secure-store for encrypted token storage only.
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import { secureStorage } from '../storage/secureStorage';
import type {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    User
} from './types';

export const userService = {
  /**
   * Login user - stores token in secure encrypted storage
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.USER_LOGIN,
      credentials
    );

    if (response.success && response.data) {
      // Store auth token in encrypted secure storage
      if (response.data.token) {
        await apiClient.setAuthToken(response.data.token);
        // Store minimal user data in secure storage (encrypted)
        if (response.data.user) {
          await secureStorage.saveUserData(response.data.user);
        }
      }
      return response.data;
    }

    return {
      success: false,
      message: response.error || 'Login failed',
    };
  },

  /**
   * Logout user - clears all encrypted data
   */
  async logout(): Promise<ApiResponse<void>> {
    // Clear all secure storage
    await secureStorage.logout();
    await apiClient.clearAuthToken();
    return await apiClient.post(API_ENDPOINTS.USER_LOGOUT, {});
  },

  /**
   * Get current user from backend (MongoDB)
   */
  async getUser(): Promise<ApiResponse<User>> {
    return await apiClient.get<User>(API_ENDPOINTS.USER);
  },

  /**
   * Update user information on backend (MongoDB)
   */
  async updateUser(updates: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiClient.put<User>(API_ENDPOINTS.USER_UPDATE, { updates });
    
    // Update secure storage if successful
    if (response.success && response.data) {
      await secureStorage.saveUserData(response.data);
    }
    
    return response;
  },

  /**
   * Register new user on backend (MongoDB)
   */
  async register(userData: Partial<User> & LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.USER_REGISTER,
      userData
    );

    if (response.success && response.data) {
      // Store auth token in encrypted secure storage
      if (response.data.token) {
        await apiClient.setAuthToken(response.data.token);
        if (response.data.user) {
          await secureStorage.saveUserData(response.data.user);
        }
      }
      return response.data;
    }

    return {
      success: false,
      message: response.error || 'Registration failed',
    };
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return await secureStorage.isAuthenticated();
  },
};
