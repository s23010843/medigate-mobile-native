/**
 * Appointment Service
 * 
 * Handles all appointment-related API operations
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import type { ApiResponse, Appointment, CreateAppointmentRequest } from './types';

export const appointmentService = {
  /**
   * Get all appointments
   */
  async getAllAppointments(): Promise<ApiResponse<Appointment[]>> {
    return await apiClient.get<Appointment[]>(API_ENDPOINTS.APPOINTMENTS);
  },

  /**
   * Get appointment by ID
   */
  async getAppointmentById(id: number): Promise<ApiResponse<Appointment>> {
    return await apiClient.get<Appointment>(
      API_ENDPOINTS.APPOINTMENT_BY_ID,
      { id: id.toString() }
    );
  },

  /**
   * Create new appointment
   */
  async createAppointment(appointment: CreateAppointmentRequest): Promise<ApiResponse<Appointment>> {
    return await apiClient.post<Appointment>(
      API_ENDPOINTS.APPOINTMENT_CREATE,
      appointment
    );
  },

  /**
   * Update appointment
   */
  async updateAppointment(id: number, updates: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    return await apiClient.put<Appointment>(
      API_ENDPOINTS.APPOINTMENT_UPDATE,
      updates,
      { id: id.toString() }
    );
  },

  /**
   * Delete appointment
   */
  async deleteAppointment(id: number): Promise<ApiResponse<void>> {
    return await apiClient.delete<void>(
      API_ENDPOINTS.APPOINTMENT_DELETE,
      { id: id.toString() }
    );
  },

  /**
   * Get upcoming appointments
   */
  async getUpcomingAppointments(): Promise<ApiResponse<Appointment[]>> {
    const response = await this.getAllAppointments();
    
    if (response.success && response.data) {
      const now = new Date();
      const upcoming = response.data.filter((apt) => {
        const aptDate = new Date(apt.date);
        return aptDate >= now && apt.status !== 'completed';
      });
      return { success: true, data: upcoming };
    }
    
    return response;
  },

  /**
   * Get past appointments
   */
  async getPastAppointments(): Promise<ApiResponse<Appointment[]>> {
    const response = await this.getAllAppointments();
    
    if (response.success && response.data) {
      const now = new Date();
      const past = response.data.filter((apt) => {
        const aptDate = new Date(apt.date);
        return aptDate < now || apt.status === 'completed';
      });
      return { success: true, data: past };
    }
    
    return response;
  },
};
