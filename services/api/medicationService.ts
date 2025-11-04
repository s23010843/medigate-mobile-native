/**
 * Medication Service
 * 
 * Handles all medication-related API operations
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import type { ApiResponse, Medication } from './types';

export const medicationService = {
  /**
   * Get all medications
   */
  async getAllMedications(): Promise<ApiResponse<Medication[]>> {
    return await apiClient.get<Medication[]>(API_ENDPOINTS.MEDICATIONS);
  },

  /**
   * Get medication by ID
   */
  async getMedicationById(id: number): Promise<ApiResponse<Medication>> {
    return await apiClient.get<Medication>(
      API_ENDPOINTS.MEDICATION_BY_ID,
      { id: id.toString() }
    );
  },

  /**
   * Mark medication as taken
   */
  async markAsTaken(medicationId: number, date: string, time: string): Promise<ApiResponse<Medication>> {
    return await apiClient.post<Medication>(
      API_ENDPOINTS.MEDICATION_MARK_TAKEN,
      { date, time },
      { id: medicationId.toString() }
    );
  },

  /**
   * Get active medications (not expired)
   */
  async getActiveMedications(): Promise<ApiResponse<Medication[]>> {
    const response = await this.getAllMedications();
    
    if (response.success && response.data) {
      const now = new Date();
      const active = response.data.filter((med) => {
        if (!med.endDate) return true;
        const endDate = new Date(med.endDate);
        return endDate >= now;
      });
      return { success: true, data: active };
    }
    
    return response;
  },

  /**
   * Get medications that need refill
   */
  async getMedicationsNeedingRefill(): Promise<ApiResponse<Medication[]>> {
    const response = await this.getAllMedications();
    
    if (response.success && response.data) {
      const needingRefill = response.data.filter((med) => !med.available);
      return { success: true, data: needingRefill };
    }
    
    return response;
  },
};
