/**
 * Notification Service
 * 
 * Handles all notification-related API operations
 */

import { API_ENDPOINTS } from '../../constants/config';
import { apiClient } from './client';
import type { ApiResponse, Notification } from './types';

export const notificationService = {
  /**
   * Get all notifications
   */
  async getAllNotifications(): Promise<ApiResponse<Notification[]>> {
    return await apiClient.get<Notification[]>(API_ENDPOINTS.NOTIFICATIONS);
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id: number): Promise<ApiResponse<Notification>> {
    return await apiClient.patch<Notification>(
      API_ENDPOINTS.NOTIFICATION_MARK_READ,
      {},
      { id: id.toString() }
    );
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<ApiResponse<void>> {
    return await apiClient.post<void>(
      API_ENDPOINTS.NOTIFICATION_MARK_ALL_READ,
      {}
    );
  },

  /**
   * Get unread notifications
   */
  async getUnreadNotifications(): Promise<ApiResponse<Notification[]>> {
    const response = await this.getAllNotifications();
    
    if (response.success && response.data) {
      const unread = response.data.filter((notif) => !notif.read);
      return { success: true, data: unread };
    }
    
    return response;
  },

  /**
   * Get unread count
   */
  async getUnreadCount(): Promise<ApiResponse<number>> {
    const response = await this.getUnreadNotifications();
    
    if (response.success && response.data) {
      return { success: true, data: response.data.length };
    }
    
    return { success: false, error: response.error };
  },
};
