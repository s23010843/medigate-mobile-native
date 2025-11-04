/**
 * Feedback Service (Frontend Only - No Third-Party Dependencies)
 * 
 * Handles user feedback submissions and management.
 * Stores data in memory and optionally syncs to MongoDB in production mode.
 */

import type { ApiResponse, FeedbackSubmission } from './types';

const FEEDBACK_STORAGE_KEY = 'medigate_feedback';
const MONGODB_API_URL = process.env.EXPO_PUBLIC_MONGODB_API_URL || '';

// In-memory storage as fallback
let feedbackCache: FeedbackSubmission[] = [];

class FeedbackService {
  /**
   * Get all feedback from storage
   */
  private async getLocalFeedback(): Promise<FeedbackSubmission[]> {
    try {
      // Try localStorage for web
      if (typeof window !== 'undefined' && window.localStorage) {
        const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      }
      // Return cached data for native/non-browser environments
      return feedbackCache;
    } catch (error) {
      console.error('[Feedback] Error reading storage:', error);
      return feedbackCache;
    }
  }

  /**
   * Save feedback to storage
   */
  private async saveLocalFeedback(feedback: FeedbackSubmission[]): Promise<void> {
    try {
      // Update cache
      feedbackCache = feedback;
      
      // Try localStorage for web
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));
      }
    } catch (error) {
      console.error('[Feedback] Error saving to storage:', error);
      throw error;
    }
  }

  /**
   * Sync feedback to MongoDB (if configured)
   */
  private async syncToMongoDB(feedback: FeedbackSubmission): Promise<void> {
    if (!MONGODB_API_URL) {
      console.log('[Feedback] MongoDB URL not configured. Feedback saved locally only.');
      console.log('[Feedback] To enable MongoDB sync, set EXPO_PUBLIC_MONGODB_API_URL in .env');
      return;
    }

    console.log('[Feedback] Attempting to sync to MongoDB:', MONGODB_API_URL);

    try {
      const response = await fetch(`${MONGODB_API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        console.warn('[Feedback] MongoDB sync failed:', response.statusText);
        console.warn('[Feedback] Response status:', response.status);
      } else {
        console.log('[Feedback] ✅ Successfully synced to MongoDB');
      }
    } catch (error) {
      console.warn('[Feedback] MongoDB sync error:', error);
      console.log('[Feedback] Feedback is still saved locally');
      // Don't throw - local storage is primary
    }
  }

  /**
   * Get device info without external dependencies
   */
  private getDeviceInfo() {
    // Simple device detection
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    let platform = 'web';
    
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      platform = 'ios';
    } else if (userAgent.includes('Android')) {
      platform = 'android';
    }

    return {
      platform,
      version: userAgent,
      model: typeof navigator !== 'undefined' ? navigator.platform : 'Unknown',
    };
  }

  /**
   * Submit user feedback
   */
  async submitFeedback(feedbackData: Omit<FeedbackSubmission, 'id' | 'timestamp' | 'status' | 'deviceInfo'>): Promise<ApiResponse<{ id: string }>> {
    try {
      // Create complete feedback object
      const feedback: FeedbackSubmission = {
        ...feedbackData,
        id: `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        deviceInfo: this.getDeviceInfo(),
        timestamp: new Date().toISOString(),
        status: 'pending',
      };

      console.log('[Feedback] Submitting feedback:', feedback.id);

      // Save to local storage first
      const existingFeedback = await this.getLocalFeedback();
      existingFeedback.unshift(feedback); // Add to beginning
      await this.saveLocalFeedback(existingFeedback);

      console.log('[Feedback] ✅ Saved to localStorage. Total feedback:', existingFeedback.length);

      // Try to sync to MongoDB in background (non-blocking)
      this.syncToMongoDB(feedback).catch(() => {
        // Silently fail - feedback is already saved locally
      });

      console.log('[Feedback] Successfully submitted feedback');
      
      return {
        success: true,
        data: { id: feedback.id || '' },
        message: 'Thank you for your feedback!',
      };
    } catch (error) {
      console.error('[Feedback] ❌ Error submitting feedback:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit feedback',
      };
    }
  }

  /**
   * Get user's feedback history
   */
  async getFeedbackHistory(): Promise<ApiResponse<FeedbackSubmission[]>> {
    try {
      const feedback = await this.getLocalFeedback();
      
      return {
        success: true,
        data: feedback,
      };
    } catch (error) {
      console.error('[Feedback] Error fetching feedback history:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch feedback',
      };
    }
  }

  /**
   * Get feedback by ID
   */
  async getFeedbackById(id: string): Promise<ApiResponse<FeedbackSubmission>> {
    try {
      const allFeedback = await this.getLocalFeedback();
      const feedback = allFeedback.find(f => f.id === id);
      
      if (!feedback) {
        return {
          success: false,
          error: 'Feedback not found',
        };
      }

      return {
        success: true,
        data: feedback,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve feedback',
      };
    }
  }

  /**
   * Delete feedback
   */
  async deleteFeedback(id: string): Promise<ApiResponse<void>> {
    try {
      const allFeedback = await this.getLocalFeedback();
      const filtered = allFeedback.filter(f => f.id !== id);
      await this.saveLocalFeedback(filtered);

      return {
        success: true,
        message: 'Feedback deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete feedback',
      };
    }
  }

  /**
   * Clear all feedback (for testing)
   */
  async clearAllFeedback(): Promise<ApiResponse<void>> {
    try {
      feedbackCache = [];
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(FEEDBACK_STORAGE_KEY);
      }
      return {
        success: true,
        message: 'All feedback cleared',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear feedback',
      };
    }
  }
}

export const feedbackService = new FeedbackService();
