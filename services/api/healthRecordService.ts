/**
 * Health Record Service
 * 
 * Handles all health record-related API operations
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import type { ApiResponse, HealthRecord } from './types';

export const healthRecordService = {
  /**
   * Get all health records
   */
  async getAllRecords(): Promise<ApiResponse<HealthRecord[]>> {
    return await apiClient.get<HealthRecord[]>(API_ENDPOINTS.HEALTH_RECORDS);
  },

  /**
   * Get health record by ID
   */
  async getRecordById(id: number): Promise<ApiResponse<HealthRecord>> {
    return await apiClient.get<HealthRecord>(
      API_ENDPOINTS.HEALTH_RECORD_BY_ID,
      { id: id.toString() }
    );
  },

  /**
   * Get records by category
   */
  async getRecordsByCategory(category: string): Promise<ApiResponse<HealthRecord[]>> {
    const response = await this.getAllRecords();
    
    if (response.success && response.data) {
      const filtered = response.data.filter(
        (record) => record.category.toLowerCase() === category.toLowerCase()
      );
      return { success: true, data: filtered };
    }
    
    return response;
  },

  /**
   * Get records by type
   */
  async getRecordsByType(type: string): Promise<ApiResponse<HealthRecord[]>> {
    const response = await this.getAllRecords();
    
    if (response.success && response.data) {
      const filtered = response.data.filter(
        (record) => record.type.toLowerCase().includes(type.toLowerCase())
      );
      return { success: true, data: filtered };
    }
    
    return response;
  },

  /**
   * Get recent records
   */
  async getRecentRecords(limit: number = 5): Promise<ApiResponse<HealthRecord[]>> {
    const response = await this.getAllRecords();
    
    if (response.success && response.data) {
      const sorted = [...response.data].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return { success: true, data: sorted.slice(0, limit) };
    }
    
    return response;
  },
};
