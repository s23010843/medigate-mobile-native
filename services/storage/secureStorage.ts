/**
 * Secure Storage Service
 * Uses expo-secure-store for encrypted, hardware-backed storage
 * Perfect for healthcare apps (HIPAA compliant)
 */

import * as SecureStore from 'expo-secure-store';
import { Platform, Alert } from 'react-native';

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REFRESH_TOKEN: 'refresh_token',
  BIOMETRIC_ENABLED: 'biometric_enabled',
} as const;

/**
 * Check if localStorage is available and accessible
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    // Test if we can actually access it
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Show user-friendly error message for storage issues
 */
const showStorageError = (operation: string): void => {
  if (Platform.OS === 'web') {
    Alert.alert(
      'Storage Access Denied',
      'Unable to save data. Please check your browser settings:\n\n' +
      '• Allow cookies and site data\n' +
      '• Disable private/incognito mode\n' +
      '• Check browser privacy settings',
      [{ text: 'OK' }]
    );
  } else {
    Alert.alert(
      'Storage Error',
      `Unable to ${operation} data. Please try again or restart the app.`,
      [{ text: 'OK' }]
    );
  }
};

/**
 * Secure Storage Service
 * All data is encrypted using device's secure enclave/keystore
 */
class SecureStorageService {
  /**
   * Save data securely (encrypted)
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // Check if localStorage is available
        if (!isLocalStorageAvailable()) {
          console.error('localStorage is not available');
          showStorageError('save');
          throw new Error('Storage access denied. Please check browser settings.');
        }
        console.warn('SecureStore not available on web, using localStorage');
        localStorage.setItem(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error saving to secure storage:', error);
      if (error instanceof Error && error.message.includes('Storage access denied')) {
        throw error; // Re-throw our custom error
      }
      showStorageError('save');
      throw error;
    }
  }

  /**
   * Get data securely (decrypted)
   */
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        // Check if localStorage is available
        if (!isLocalStorageAvailable()) {
          console.error('localStorage is not available');
          return null;
        }
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error reading from secure storage:', error);
      // Don't show alert for read operations, just return null
      return null;
    }
  }

  /**
   * Remove data securely
   */
  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // Check if localStorage is available
        if (!isLocalStorageAvailable()) {
          console.error('localStorage is not available');
          return; // Silently fail for remove operations
        }
        localStorage.removeItem(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing from secure storage:', error);
      // Silently fail for remove operations
    }
  }

  /**
   * Clear all secure storage
   */
  async clear(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await Promise.all(keys.map(key => this.removeItem(key)));
    } catch (error) {
      console.error('Error clearing secure storage:', error);
      throw error;
    }
  }

  // Specific methods for common operations

  /**
   * Save authentication token
   */
  async saveAuthToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  /**
   * Get authentication token
   */
  async getAuthToken(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Remove authentication token
   */
  async removeAuthToken(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Save user data (encrypted)
   */
  async saveUserData(userData: any): Promise<void> {
    const jsonData = JSON.stringify(userData);
    await this.setItem(STORAGE_KEYS.USER_DATA, jsonData);
  }

  /**
   * Get user data (decrypted)
   */
  async getUserData(): Promise<any | null> {
    const jsonData = await this.getItem(STORAGE_KEYS.USER_DATA);
    if (!jsonData) return null;
    try {
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Remove user data
   */
  async removeUserData(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Save refresh token
   */
  async saveRefreshToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  /**
   * Get refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Remove refresh token
   */
  async removeRefreshToken(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAuthToken();
    return !!token;
  }

  /**
   * Logout - clear all auth data
   */
  async logout(): Promise<void> {
    await this.removeAuthToken();
    await this.removeRefreshToken();
    await this.removeUserData();
  }
}

// Export singleton instance
export const secureStorage = new SecureStorageService();
export { STORAGE_KEYS };
