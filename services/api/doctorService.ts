/**
 * Doctor Service
 * 
 * Handles all doctor-related API operations
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import type { ApiResponse, Doctor } from './types';

export const doctorService = {
  /**
   * Get all doctors
   */
  async getAllDoctors(): Promise<ApiResponse<Doctor[]>> {
    return await apiClient.get<Doctor[]>(API_ENDPOINTS.DOCTORS);
  },

  /**
   * Get doctor by ID
   */
  async getDoctorById(id: number): Promise<ApiResponse<Doctor>> {
    return await apiClient.get<Doctor>(
      API_ENDPOINTS.DOCTOR_BY_ID,
      { id: id.toString() }
    );
  },

  /**
   * Search doctors by specialty
   */
  async searchBySpecialty(specialty: string): Promise<ApiResponse<Doctor[]>> {
    const response = await this.getAllDoctors();
    
    if (response.success && response.data) {
      const filtered = response.data.filter(
        (doctor) => doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
      return { success: true, data: filtered };
    }
    
    return response;
  },

  /**
   * Search doctors by name
   */
  async searchByName(name: string): Promise<ApiResponse<Doctor[]>> {
    const response = await this.getAllDoctors();
    
    if (response.success && response.data) {
      const filtered = response.data.filter(
        (doctor) => doctor.name.toLowerCase().includes(name.toLowerCase())
      );
      return { success: true, data: filtered };
    }
    
    return response;
  },
};
