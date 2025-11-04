/**
 * User Service
 * 
 * This service handles all user-related API calls.
 * It provides a clean interface for user operations that can be easily
 * switched from local JSON to MongoDB in production.
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import type {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    User
} from './types';

export const userService = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.USER_LOGIN,
      credentials
    );

    if (response.success && response.data) {
      // Store auth token
      if (response.data.token) {
        apiClient.setAuthToken(response.data.token);
      }
      return response.data;
    }

    return {
      success: false,
      message: response.error || 'Login failed',
    };
  },

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<void>> {
    apiClient.clearAuthToken();
    return await apiClient.post(API_ENDPOINTS.USER_LOGOUT, {});
  },

  /**
   * Get current user
   */
  async getUser(): Promise<ApiResponse<User>> {
    return await apiClient.get<User>(API_ENDPOINTS.USER);
  },

  /**
   * Update user information
   */
  async updateUser(updates: Partial<User>): Promise<ApiResponse<User>> {
    return await apiClient.put<User>(API_ENDPOINTS.USER_UPDATE, { updates });
  },

  /**
   * Register new user
   */
  async register(userData: Partial<User> & LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.USER_REGISTER,
      userData
    );

    if (response.success && response.data) {
      return response.data;
    }

    return {
      success: false,
      message: response.error || 'Registration failed',
    };
  },
};
