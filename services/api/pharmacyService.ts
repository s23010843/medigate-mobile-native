/**
 * Pharmacy Service
 * 
 * Handles all pharmacy-related API operations
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import type { ApiResponse, Pharmacy } from './types';

export const pharmacyService = {
  /**
   * Get all pharmacies
   */
  async getAllPharmacies(): Promise<ApiResponse<Pharmacy[]>> {
    return await apiClient.get<Pharmacy[]>(API_ENDPOINTS.PHARMACIES);
  },

  /**
   * Get pharmacy by ID
   */
  async getPharmacyById(id: number): Promise<ApiResponse<Pharmacy>> {
    return await apiClient.get<Pharmacy>(
      API_ENDPOINTS.PHARMACY_BY_ID,
      { id: id.toString() }
    );
  },

  /**
   * Get open pharmacies
   */
  async getOpenPharmacies(): Promise<ApiResponse<Pharmacy[]>> {
    const response = await this.getAllPharmacies();
    
    if (response.success && response.data) {
      const open = response.data.filter((pharmacy) => pharmacy.open);
      return { success: true, data: open };
    }
    
    return response;
  },

  /**
   * Search pharmacies by name
   */
  async searchByName(name: string): Promise<ApiResponse<Pharmacy[]>> {
    const response = await this.getAllPharmacies();
    
    if (response.success && response.data) {
      const filtered = response.data.filter(
        (pharmacy) => pharmacy.name.toLowerCase().includes(name.toLowerCase())
      );
      return { success: true, data: filtered };
    }
    
    return response;
  },
};
