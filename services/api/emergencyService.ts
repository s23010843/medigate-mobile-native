/**
 * Emergency Contact Service
 * 
 * Handles all emergency contact-related API operations
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import type { ApiResponse, EmergencyContact } from './types';

export const emergencyService = {
  /**
   * Get all emergency contacts
   */
  async getAllContacts(): Promise<ApiResponse<EmergencyContact[]>> {
    return await apiClient.get<EmergencyContact[]>(API_ENDPOINTS.EMERGENCY_CONTACTS);
  },

  /**
   * Get contacts by type
   */
  async getContactsByType(type: string): Promise<ApiResponse<EmergencyContact[]>> {
    const response = await this.getAllContacts();
    
    if (response.success && response.data) {
      const filtered = response.data.filter(
        (contact) => contact.type.toLowerCase() === type.toLowerCase()
      );
      return { success: true, data: filtered };
    }
    
    return response;
  },
};
